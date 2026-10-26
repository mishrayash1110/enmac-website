'use client';
import BrandLogo from '@/components/ui/BrandLogo';
import {useId, useState} from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/Icons';
const paths=[{name:'Personal',slug:'personal',detail:'Borrowing for personal plans with a clearer understanding of repayment and cost.'},{name:'Home',slug:'home',detail:'Property-purchase and construction finance concepts, from documentation to repayment.'},{name:'Property',slug:'property',detail:'Explore secured borrowing with appropriate attention to collateral risks.'},{name:'MSME',slug:'business',detail:'Financing discussions designed around enterprise size and requirements.'},{name:'Business',slug:'business-term-loan',detail:'Financing concepts for growth, new facilities and important investments.'},{name:'Working capital',slug:'working-capital',detail:'Cash-flow, inventory and receivables funding considerations.'},{name:'Corporate credit',slug:'corporate',detail:'Complex borrowing and structured financial requirements for companies.'},{name:'Trade finance',slug:'trade-finance',detail:'Finance categories supporting trade cycles, procurement and supply chains.'}];
const endpoints=[[270,54],[468,132],[504,272],[468,424],[270,501],[65,427],[38,270],[66,124]];
export default function FinancialNetwork(){
  const [active,setActive]=useState(0); const id=useId(); const selected=paths[active];
  return <div className="network-layout">
    <div className="network-viz" role="group" aria-label="Financing network categories">
      <svg className="network-connectors" viewBox="0 0 540 540" aria-hidden="true">{endpoints.map(([x,y],i)=><line key={i} x1="270" y1="270" x2={x} y2={y} className={active===i?'selected':''}/>)}</svg>
      <div className="network-ring ring-one"/><div className="network-center"><BrandLogo/><small>FINANCIAL<br/>GUIDANCE</small></div>
      {paths.map((path,i)=><button onClick={()=>setActive(i)} onFocus={()=>setActive(i)} onMouseEnter={()=>setActive(i)} className={`network-node node-${i} ${active===i?'current':''}`} key={path.name} aria-controls={id} aria-label={`Show ${path.name} details`} aria-pressed={active===i}><span className="node-dot"/>{path.name}</button>)}
    </div>
    <div className="network-side"><span className="micro-label">THE ENMAC NETWORK</span><h3>One conversation.<br/><em>Many possibilities.</em></h3><p>Every financing need has a different story. Discover the category, then understand the considerations before moving forward.</p>
      <div className="network-mobile-options" role="group" aria-label="Choose financing category">{paths.map((path,i)=><button key={path.name} aria-controls={id} aria-pressed={active===i} className={active===i?'current':''} onClick={()=>setActive(i)}>{path.name}<Icon name="arrow-up-right" size={14}/></button>)}</div>
      <div className="network-detail" id={id} aria-live="polite" aria-atomic="true"><div key={selected.name} className="switch-content"><span className="number">0{active+1} / 08</span><h4>{selected.name}</h4><p>{selected.detail}</p><Link href={`/loans/${selected.slug}`}>Discover {selected.name.toLowerCase()} <Icon name="arrow-up-right" size={16}/></Link></div></div>
    </div>
  </div>;
}
