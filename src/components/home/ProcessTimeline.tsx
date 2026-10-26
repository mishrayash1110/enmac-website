'use client';
import {useId, useState} from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/Icons';
const steps=[{name:'Share your needs',text:'Tell us your purpose, estimated requirement and the context behind your borrowing goal.',href:'/apply',action:'Share your requirement'},{name:'Discuss requirements',text:'We understand your situation and the questions that matter for your applicant type.',href:'/apply',action:'Start a conversation'},{name:'Explore options',text:'Review financing categories, cost considerations and relevant lender assessment factors.',href:'/loans',action:'Explore financing paths'},{name:'Prepare documents',text:'Organize the financial and supporting records that may be requested.',href:'/calculators',action:'Open the planning tools'},{name:'Lender assessment',text:'When suitable, proceed to an actual lender review. Only the lender determines approval and terms.',href:'/apply',action:'Discuss your next step'}];
export default function ProcessTimeline(){
 const [active,setActive]=useState(0);const id=useId();
 return <div className="process-box">
   <div className="process-story-head"><span className="micro-label">A GUIDED JOURNEY</span><span>{String(active+1).padStart(2,'0')} <small>/ 05</small></span></div>
   <div className="process-story-progress" aria-hidden="true"><span style={{width:`${(active+1)*20}%`}}/></div>
   <div className="process-story-layout">
    <div className="process-line" role="group" aria-label="Choose a stage in the financing journey">{steps.map((step,i)=><button className={`process-step ${active===i?'active':''} ${i<active?'visited':''}`} key={step.name} onClick={()=>setActive(i)} aria-controls={id} aria-pressed={active===i}><span className="process-number">{String(i+1).padStart(2,'0')}</span><strong>{step.name}</strong><Icon name="chevron-right" size={15}/></button>)}</div>
    <div className="process-detail" id={id}><div aria-live="polite" aria-atomic="true"><div className="switch-content" key={active}><span>STEP {active+1} OF 5</span><h3>{steps[active].name}</h3><p>{steps[active].text}</p><Link className="text-link" href={steps[active].href}>{steps[active].action}<Icon name="arrow-up-right" size={16}/></Link></div></div></div>
   </div>
   <div className="process-story-footer"><p>Lenders make the final credit decisions and set the terms.</p><div><button type="button" className="process-previous" disabled={active===0} onClick={()=>setActive(n=>Math.max(0,n-1))} aria-label="Show previous step"><Icon name="arrow-left" size={19}/></button><button type="button" className="process-next" onClick={()=>setActive(n=>(n+1)%5)} aria-label={active===4?'Return to first step':'Show next step'}><Icon name={active===4?'rotate-ccw':'arrow-right'} size={19}/></button></div></div>
 </div>;
}
