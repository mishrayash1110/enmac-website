import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import Module,{createRequire} from 'node:module';
import ts from 'typescript';
const require=createRequire(import.meta.url);
function load(file,mocks={}){
  const filename=path.resolve(file);const mod=new Module(filename);
  mod.filename=filename;mod.paths=Module._nodeModulePaths(path.dirname(filename));
  mod.require=name=>Object.hasOwn(mocks,name)?mocks[name]:require(name);
  mod._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,esModuleInterop:true}}).outputText,filename);
  return mod.exports;
}
const data={kind:'enquiry',applicantType:'individual',fullName:'Test Customer',phone:'9876543210',email:'customer@example.com',service:'home',amount:1000000,city:'Mumbai',contactConsent:true,sourcePage:'/apply'};
const config={GMAIL_USER:'enmacrfs@gmail.com',GMAIL_APP_PASSWORD:'abcd efgh ijkl mnop',ENMAC_LEADS_EMAIL:'enmacrfs@gmail.com'};
test('Gmail delivery configuration, formatting and SMTP acceptance',async()=>{
  let message,options,closed=0,reject=false;
  const mail=load('src/lib/email/leads.ts',{nodemailer:{createTransport:o=>{options=o;return {sendMail:async m=>{message=m;return {accepted:reject?[]:['enmacrfs@gmail.com']}},close:()=>closed++}}}});
  assert.equal(mail.emailConfiguration({}),null);
  assert.equal(mail.emailConfiguration({...config,GMAIL_USER:'bad\r\nBcc: a@example.com'}),null);
  assert.equal(mail.emailConfiguration(config).pass,'abcdefghijklmnop');
  const old={...process.env};Object.assign(process.env,config);
  try{
    await mail.emailLead({...data,website:'not forwarded'},'ref-123');
    assert.equal(options.host,'smtp.gmail.com');assert.equal(options.port,465);assert.equal(options.secure,true);
    assert.equal(message.to,'enmacrfs@gmail.com');assert.equal(message.from.address,'enmacrfs@gmail.com');assert.equal(message.replyTo.address,data.email);
    assert.match(message.text,/Mobile number: 9876543210/);assert.match(message.text,/Reference: ref-123/);assert.doesNotMatch(message.text,/not forwarded|abcdefghijklmnop/);
    const app=mail.leadMessage({...data,kind:'application',companyName:'Example Company',purpose:'Equipment',tenureMonths:60,accuracyDeclaration:true},'app-ref',mail.emailConfiguration(config));
    assert.match(app.text,/Company name: Example Company/);assert.match(app.text,/Tenure \(months\): 60/);
    reject=true;await assert.rejects(mail.emailLead(data,'ref-rejected'));assert.equal(closed,2);
  }finally{for(const key of Object.keys(config)){if(old[key]===undefined)delete process.env[key];else process.env[key]=old[key]}}
});
test('lead API awaits email, works without database, and never falsely acknowledges failures',async()=>{
  const {NextRequest}=require('next/server');
  const validation=load('src/lib/validations/lead.ts');
  let configured=true,failed=false,sent=0,stored=0;
  const api=load('src/lib/api/leads.ts',{'@/lib/validations/lead':validation,'@/lib/email/leads':{emailConfiguration:()=>configured?{}:null,emailLead:async()=>{sent++;if(failed)throw Error('Private SMTP details')}},pg:{Pool:class{async query(){stored++}}}});
  const old=process.env.DATABASE_URL;delete process.env.DATABASE_URL;
  const request=d=>new NextRequest('http://localhost:3000/api/'+(d.kind==='enquiry'?'enquiries':'applications'),{method:'POST',headers:{'content-type':'application/json',origin:'http://localhost:3000'},body:JSON.stringify(d)});
  try{
    let response=await api.receiveLead(request(data),'enquiry');assert.equal(response.status,201);assert.ok((await response.json()).reference);assert.equal(sent,1);assert.equal(stored,0);
    configured=false;response=await api.receiveLead(request(data),'enquiry');assert.equal(response.status,503);assert.equal(sent,1);
    configured=true;failed=true;response=await api.receiveLead(request(data),'enquiry');assert.equal(response.status,503);assert.doesNotMatch(JSON.stringify(await response.json()),/Private SMTP/);
    failed=false;process.env.DATABASE_URL='mock';const app={...data,kind:'application',purpose:'Equipment',tenureMonths:60,accuracyDeclaration:true};
    response=await api.receiveLead(request(app),'application');assert.equal(response.status,201);assert.equal(stored,1);
    response=await api.receiveLead(request({...data,email:'invalid'}),'enquiry');assert.equal(response.status,400);
  }finally{if(old===undefined)delete process.env.DATABASE_URL;else process.env.DATABASE_URL=old}
});
