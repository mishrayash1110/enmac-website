import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import Module,{createRequire} from 'node:module';
import ts from 'typescript';
const require=createRequire(import.meta.url);
function load(file){
 const filename=path.resolve(file),mod=new Module(filename);
 mod.filename=filename;mod.paths=Module._nodeModulePaths(path.dirname(filename));
 mod.require=name=>name.startsWith('.')?load(path.resolve(path.dirname(filename),name+'.ts')):require(name);
 mod._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,esModuleInterop:true}}).outputText,filename);
 return mod.exports;
}
const {submitEnquiry,ERROR_MESSAGE}=load('src/lib/formsubmit.ts');
const lead={kind:'enquiry',applicantType:'individual',fullName:'Test Customer',phone:'9876543210',email:'customer@example.com',service:'home',amount:1000000,city:'Mumbai',contactConsent:true,sourcePage:'/apply'};
test('FormSubmit validates, allowlists fields, and checks HTTP and provider acknowledgement',async()=>{
 const original=globalThis.fetch,originalWindow=globalThis.window;let calls=0,payload;
 globalThis.window={location:{origin:"http://localhost:3000",pathname:"/apply/",search:"?private=value",hash:"#private"}};
 try{
  globalThis.fetch=async(url,options)=>{calls++;assert.equal(url,'https://formsubmit.co/ajax/b1b627427bf82c27b178b99237680236');assert.equal(options.headers.Accept,'application/json');payload=JSON.parse(options.body);return {ok:true,json:async()=>({success:'true'})}};
  await submitEnquiry({...lead,bankAccount:'DO NOT SEND'},'Contact quick enquiry');
  assert.equal(payload._url,'http://localhost:3000/apply/');assert.equal(payload._subject,'New ENMAC Website Enquiry');assert.equal(payload._replyto,lead.email);assert.equal(payload['Enquiry source'],'Contact quick enquiry');assert.equal(payload.bankAccount,undefined);
  const before=calls;
  for(const invalid of [{...lead,email:'invalid'},{...lead,phone:'123'},{...lead,fullName:'   '},{...lead,amount:0},{...lead,service:'invalid'}])await assert.rejects(submitEnquiry(invalid,'test'));
  await assert.rejects(submitEnquiry(lead,'test','bot'));assert.equal(calls,before);
  await submitEnquiry({...lead,kind:'application',accuracyDeclaration:true,purpose:'Home purchase',tenureMonths:60,incomeRange:'private income',currentObligations:'private records',employmentType:'Salaried'},'Guided loan application');
  assert.equal(payload.message,'Home purchase');assert.equal(payload['Employment category'],'Salaried');assert.ok(!JSON.stringify(payload).includes('private'));
  for(const [ok,body] of [[false,{success:true}],[true,{success:false}],[true,{}],[true,null],[true,{success:'false'}]]){
   globalThis.fetch=async()=>({ok,json:async()=>body});await assert.rejects(submitEnquiry(lead,'test'),{message:ERROR_MESSAGE});
  }
  globalThis.fetch=async()=>({ok:true,json:async()=>{throw new Error('invalid json')}});await assert.rejects(submitEnquiry(lead,'test'),{message:ERROR_MESSAGE});
  globalThis.fetch=async()=>{throw new Error('network details')};await assert.rejects(submitEnquiry(lead,'test'),{message:ERROR_MESSAGE});
  globalThis.fetch=async()=>({ok:true,json:async()=>({success:true})});await submitEnquiry(lead,'test');
 }finally{globalThis.fetch=original;if(originalWindow===undefined)delete globalThis.window;else globalThis.window=originalWindow}
});
