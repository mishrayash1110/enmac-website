import {NextRequest,NextResponse} from 'next/server';
import {randomUUID,createHash} from 'node:crypto';
import {Pool} from 'pg';
import {emailConfiguration,emailLead} from '@/lib/email/leads';
import {leadSchema} from '@/lib/validations/lead';
const memory=new Map<string,{count:number,reset:number}>();
const MAX_SIZE=16000;
const WINDOW=15*60*1000;
// Single-process development throttle; use a shared production rate limiter and WAF.
function rateLimited(key:string){const now=Date.now();if(memory.size>5000)memory.clear();let entry=memory.get(key);if(!entry||entry.reset<now){entry={count:0,reset:now+WINDOW};memory.set(key,entry)}return ++entry.count>8}
let pool:Pool|undefined;
function getPool(){if(!process.env.DATABASE_URL)return null;pool??=new Pool({connectionString:process.env.DATABASE_URL,max:5,idleTimeoutMillis:10000,connectionTimeoutMillis:5000});return pool}
export async function receiveLead(req:NextRequest,kind:'enquiry'|'application'){
  try{
    const origin=req.headers.get('origin');
    if(origin){let parsed:URL;try{parsed=new URL(origin)}catch{return NextResponse.json({error:'Invalid request origin.'},{status:403})}if(parsed.host!==req.nextUrl.host)return NextResponse.json({error:'Cross-origin submissions are not permitted.'},{status:403})}
    if(req.headers.get('content-type')?.split(';')[0]!=='application/json')return NextResponse.json({error:'JSON submissions only.'},{status:415});
    const size=Number(req.headers.get('content-length')||0);if(size>MAX_SIZE)return NextResponse.json({error:'Request too large.'},{status:413});
    const raw=await req.text();if(raw.length>MAX_SIZE)return NextResponse.json({error:'Request too large.'},{status:413});
    let json:unknown;try{json=JSON.parse(raw)}catch{return NextResponse.json({error:'Invalid JSON request.'},{status:400})}
    const parsed=leadSchema.safeParse(json);
    if(!parsed.success||parsed.data.kind!==kind)return NextResponse.json({error:'Please check all required fields and try again.',details:parsed.success?undefined:parsed.error.issues.map(e=>({field:e.path.join('.'),message:e.message}))},{status:400});
    const limiterKey=createHash('sha256').update(parsed.data.phone).digest('hex');
    if(rateLimited(limiterKey))return NextResponse.json({error:'Too many attempts for this contact. Try again later.'},{status:429});
    if(!emailConfiguration())return NextResponse.json({error:'Online submissions are temporarily unavailable. Please try again later.'},{status:503});
    const db=getPool();
    const data=parsed.data;
    // Deliberately do not log applicant records. Parameterized SQL only.
    const id=randomUUID();
    if(db)await db.query('INSERT INTO leads (id, kind, applicant_type, contact_name, contact_phone, contact_email, service_category, amount_inr, source_page, consent_to_contact, applicant_data, status, created_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,NOW())',[id,kind,data.applicantType,data.fullName,data.phone,data.email,data.service,data.amount,data.sourcePage,data.contactConsent,JSON.stringify(data),'New']);
    await emailLead(data,id);
    return NextResponse.json({ok:true,reference:id},{status:201,headers:{'Cache-Control':'no-store'}});
  }catch{
    return NextResponse.json({error:'The submission service is temporarily unavailable. Please try again later.'},{status:503,headers:{'Cache-Control':'no-store'}});
  }
}
