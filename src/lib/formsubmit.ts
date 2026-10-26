import {leadSchema} from './validations/lead';
import {services} from '../data/services';

export const SUCCESS_MESSAGE='Thank you for contacting ENMAC! Your enquiry has been submitted successfully. Our team will get in touch with you shortly.';
export const ERROR_MESSAGE="We couldn't submit your enquiry right now. Please try again.";

export async function submitEnquiry(input:unknown,source:string,honey=''){
  const parsed=leadSchema.safeParse(input);
  if(!parsed.success)throw new Error('Please check your contact details and required fields in the form.');
  if(honey)throw new Error(ERROR_MESSAGE);
  const lead=parsed.data;
  const service=services.find(item=>item.slug===lead.service&&item.audience===(lead.applicantType==='individual'?'personal':'business'));
  if(!service)throw new Error('Please select a valid financing category.');
  // Explicit allowlist: financial profile fields and arbitrary input are never forwarded.
  const payload:Record<string,string>={
    name:lead.fullName,email:lead.email,_replyto:lead.email,
    'Mobile number':lead.phone,'Applicant type':lead.applicantType,
    'Financial service':service.title,'Required loan amount (INR)':String(lead.amount),
    City:lead.city,'Enquiry source':source,'Source page':lead.sourcePage,
    'Contact consent':String(lead.contactConsent),
    _subject:'New ENMAC Website Enquiry',_template:'table',_honey:honey,
  };
  // Cross-origin Referer headers often contain only the origin. Pass the
  // documented form URL explicitly, excluding query strings and fragments.
  if(typeof window!=='undefined')payload._url=window.location.origin+window.location.pathname;
  if(lead.kind==='application'){
    payload.message=lead.purpose;
    if(lead.employmentType&&lead.applicantType==='individual')payload['Employment category']=lead.employmentType;
    if(lead.constitution&&lead.applicantType==='business')payload['Business category']=lead.constitution;
  }
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),20000);
  try{
    const response=await fetch('https://formsubmit.co/ajax/b1b627427bf82c27b178b99237680236',{
      method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},
      body:JSON.stringify(payload),signal:controller.signal,
    });
    const body:unknown=await response.json();
    if(!response.ok||!body||typeof body!=='object'||!('success' in body)||(body.success!==true&&body.success!=='true')){
      if(process.env.NODE_ENV==='development'){
        // Log only a classified failure, never request data or raw provider text.
        const activation=body&&typeof body==='object'&&'message' in body&&typeof body.message==='string'&&/needs activation/i.test(body.message);
        console.warn('[ENMAC enquiry]',activation?'FormSubmit activation is pending for this endpoint/form URL. Check the latest activation email.':'FormSubmit rejected the request or returned an unexpected response.',{status:response.status});
      }
      throw new Error(ERROR_MESSAGE);
    }
  }catch(error){
    if(process.env.NODE_ENV==='development'&&(!(error instanceof Error)||error.message!==ERROR_MESSAGE))console.warn('[ENMAC enquiry] Request failed before a valid provider response. Check the browser Network panel for connectivity, CORS or timeout failures.');
    throw new Error(ERROR_MESSAGE);
  }finally{clearTimeout(timeout)}
}
