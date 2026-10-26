'use client';

import {useId,useRef,useState,type KeyboardEvent} from 'react';
import {DetailedApplication,QuickEnquiry} from './LeadForms';
import Icon from '@/components/ui/Icons';

export default function ApplicationWorkspace(){
  const [flow,setFlow]=useState<'quick'|'guided'>('quick');
  const id=useId();const tabs=useRef<(HTMLButtonElement|null)[]>([]);
  function tabKey(event:KeyboardEvent,index:number){
    if(event.altKey||event.ctrlKey||event.metaKey||!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
    event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?1:1-index;
    setFlow(next===0?'quick':'guided');tabs.current[next]?.focus();
  }
  return <div className="application-workspace">
    <div className="form-flow-selector" role="tablist" aria-label="Choose how to contact ENMAC">
      {(['quick','guided'] as const).map((value,index)=><button key={value} ref={node=>{tabs.current[index]=node}} role="tab" id={`${id}-${value}-tab`} aria-controls={`${id}-${value}`} aria-selected={flow===value} tabIndex={flow===value?0:-1} onKeyDown={event=>tabKey(event,index)} onClick={()=>setFlow(value)}>
        <Icon name={value==='quick'?'send':'clipboard-check'} size={23}/><span><strong>{value==='quick'?'Quick enquiry':'Guided application'}</strong><small>{value==='quick'?'Contact details and a financing need':'A four-step profile and review'}</small></span><Icon name="chevron-right" size={18}/>
      </button>)}
    </div>
    <div className="application-workspace-grid">
      <div className="form-work-area">
        <section className="workspace-panel" hidden={flow!=='quick'} role="tabpanel" id={`${id}-quick`} aria-labelledby={`${id}-quick-tab`}>
          <div className="workspace-panel-heading"><span className="eyebrow">QUICK ENQUIRY</span><h2>Start with your financing requirement.</h2><p>Share your contact details, the category you are considering, and a broad amount.</p></div>
          <QuickEnquiry/>
        </section>
        <section className="workspace-panel" hidden={flow!=='guided'} role="tabpanel" id={`${id}-guided`} aria-labelledby={`${id}-guided-tab`}>
          <div className="workspace-panel-heading"><span className="eyebrow">GUIDED APPLICATION</span><h2>Let&apos;s understand your requirements in a little more detail.</h2><p>Complete four simple steps. You can review and revise your details before sending.</p></div>
          <DetailedApplication/>
          <div className="switch-form-prompt"><strong>Prefer something shorter?</strong><p>Send a quick enquiry instead.</p><button type="button" className="text-link" onClick={()=>{setFlow('quick');tabs.current[0]?.focus()}}>Open quick enquiry <Icon name="arrow-right" size={16}/></button></div>
        </section>
      </div>
      <aside className="form-context">
        <div className="form-context-block"><span className="micro-label">WHAT TO HAVE READY</span><h3>{flow==='quick'?'A starting point is enough.':'Share the context behind the need.'}</h3><ul>{(flow==='quick'?['Your contact details','A financing category','Approximate amount and city']:['Individual or business profile','Purpose and preferred tenure','Details to review before sending']).map(text=><li key={text}><Icon name="check" size={17}/>{text}</li>)}</ul></div>
        <div className="form-context-block"><Icon name="shield-check" size={23}/><h3>Your information matters.</h3><p>We never ask for PAN, Aadhaar, banking passwords or financial document uploads in this website form.</p></div>
        <div className="form-context-block"><span className="micro-label">AFTER YOU SEND</span><p>Look for the success message after submitting your enquiry or application. Acknowledgement is not a lending decision.</p><p>All lender decisions remain independent.</p></div>
      </aside>
    </div>
  </div>;
}
