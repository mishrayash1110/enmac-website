import nodemailer from 'nodemailer';
import type {Enquiry,Application} from '../validations/lead';

type Lead=Enquiry|Application;
const labels:Record<string,string>={kind:'Submission type',applicantType:'Applicant type',fullName:'Full name',phone:'Mobile number',email:'Email',service:'Financing category',amount:'Requested amount (INR)',city:'City',purpose:'Purpose',tenureMonths:'Tenure (months)',currentObligations:'Current obligations',timeline:'Timeline',employmentType:'Employment type',occupation:'Occupation',incomeRange:'Income range',workExperience:'Work experience',companyName:'Company name',industry:'Industry',constitution:'Business constitution',vintage:'Business vintage',turnover:'Turnover',accuracyDeclaration:'Accuracy declaration',contactConsent:'Contact consent',sourcePage:'Source page'};

export function emailConfiguration(env:NodeJS.ProcessEnv=process.env){
  const user=env.GMAIL_USER?.trim();
  const pass=env.GMAIL_APP_PASSWORD?.replace(/\s/g,'');
  const to=env.ENMAC_LEADS_EMAIL?.trim()||'enmacrfs@gmail.com';
  if(!user||!pass||!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(user)||!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(to))return null;
  return {user,pass,to};
}

export function leadMessage(data:Lead,reference:string,config:{user:string,to:string}){
  const fields=Object.entries(labels).flatMap(([key,label])=>{
    const value=(data as unknown as Record<string,unknown>)[key];
    if(value===undefined||value==='')return [];
    return [`${label}: ${typeof value==='boolean'?(value?'Yes':'No'):String(value)}`];
  });
  return {
    from:{name:'ENMAC Website',address:config.user},
    to:config.to,
    replyTo:{name:data.fullName,address:data.email},
    subject:`ENMAC website: new ${data.kind} [${reference}]`,
    text:[`New ENMAC website ${data.kind}`,`Reference: ${reference}`,`Received: ${new Date().toISOString()}`,'',...fields,'','This is a website submission, not a lending decision.'].join('\n'),
    disableFileAccess:true,
    disableUrlAccess:true,
  };
}

export async function emailLead(data:Lead,reference:string){
  const config=emailConfiguration();
  if(!config)throw new Error('Email is not configured');
  const transport=nodemailer.createTransport({host:'smtp.gmail.com',port:465,secure:true,auth:{user:config.user,pass:config.pass},connectionTimeout:10000,greetingTimeout:10000,socketTimeout:15000,logger:false,debug:false});
  try{
    const result=await transport.sendMail(leadMessage(data,reference,config));
    if(!result.accepted.some(address=>String(address).toLowerCase()===config.to.toLowerCase()))throw new Error('Email was not accepted');
  }finally{transport.close()}
}
