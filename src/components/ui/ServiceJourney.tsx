import Link from 'next/link';
import Icon from './Icons';

export default function ServiceJourney({business=false}:{business?:boolean}){
  const steps=business?[
    {label:'Clarify the funding purpose',href:'#service-purpose'},
    {label:'Review the considerations',href:'#service-considerations'},
    {label:'Prepare business records',href:'#service-documents'},
    {label:'Request a consultation',href:'/apply'},
  ]:[
    {label:'Understand this category',href:'#service-purpose'},
    {label:'Plan your repayments',href:'/calculators'},
    {label:'Prepare your information',href:'#service-documents'},
    {label:'Speak with an advisor',href:'/apply'},
  ];
  return <nav className="service-journey" aria-label="Your next steps"><span className="micro-label">A CLEARER WAY FORWARD</span><ol>{steps.map((step,index)=><li key={step.href}><Link href={step.href}><span>{String(index+1).padStart(2,'0')}</span><strong>{step.label}</strong><Icon name="arrow-up-right" size={16}/></Link></li>)}</ol></nav>;
}
