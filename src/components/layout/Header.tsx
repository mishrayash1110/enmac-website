'use client';
import BrandLogo from '@/components/ui/BrandLogo';
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import Icon from '@/components/ui/Icons';
const nav=[{name:'Home',href:'/'},{name:'About',href:'/about'},{name:'Loan Solutions',href:'/loans'},{name:'Business Finance',href:'/loans/business'},{name:'Knowledge Hub',href:'/guides'},{name:'Calculators',href:'/calculators'},{name:'Contact',href:'/apply'}];
const loanLinks=[{name:'Personal Loans',href:'/loans/personal'},{name:'Home Loans',href:'/loans/home'},{name:'Property-backed Finance',href:'/loans/property'},{name:'Loan Against Securities',href:'/loans/securities'},{name:'Business & MSME',href:'/loans/business'},{name:'Working Capital',href:'/loans/working-capital'},{name:'Corporate Credit',href:'/loans/corporate'},{name:'Trade Finance',href:'/loans/trade-finance'}];
export default function Header(){
 const [open,setOpen]=useState(false),[drop,setDrop]=useState(false);const pathname=usePathname();
 const header=useRef<HTMLElement>(null),dropdown=useRef<HTMLDivElement>(null),loanTrigger=useRef<HTMLButtonElement>(null),mobileTrigger=useRef<HTMLButtonElement>(null);
 const close=()=>{setOpen(false);setDrop(false)};
 useEffect(()=>{
  if(!open&&!drop)return;
  const outside=(event:PointerEvent)=>{if(!header.current?.contains(event.target as Node)){setOpen(false);setDrop(false)}};
  document.addEventListener('pointerdown',outside);return()=>document.removeEventListener('pointerdown',outside);
 },[open,drop]);
 return <><div className="topbar"><div className="container topbar-content"><span><Icon name="shield-check" size={14}/> Guidance for people, enterprises and growing businesses</span><span>Independent financial advisory · India</span></div></div>
 <header className="site-header" ref={header} onKeyDown={event=>{if(event.key==='Escape'){if(drop){setDrop(false);loanTrigger.current?.focus()}if(open){setOpen(false);mobileTrigger.current?.focus()}}}}>
  <div className="container header-inner"><Link href="/" className="brand" aria-label="ENMAC home" onClick={close}><BrandLogo priority/></Link>
   <nav aria-label="Primary navigation" className="desktop-nav">{nav.map(item=>item.name==='Loan Solutions'?<div className="nav-dropdown" ref={dropdown} key={item.href} onMouseEnter={()=>setDrop(true)} onMouseLeave={()=>{if(!dropdown.current?.contains(document.activeElement))setDrop(false)}} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node))setDrop(false)}}>
    <button ref={loanTrigger} onClick={()=>setDrop(value=>!value)} onKeyDown={event=>{if(event.key==='ArrowDown'){event.preventDefault();setDrop(true);requestAnimationFrame(()=>dropdown.current?.querySelector<HTMLAnchorElement>('.mega-menu a')?.focus())}}} aria-expanded={drop} aria-controls="loans-menu" className={`nav-link ${pathname.startsWith('/loans')&&pathname!=='/loans/business'?'active':''}`}>Loan Solutions <Icon name="chevron-down" size={15}/></button>
    {drop&&<div id="loans-menu" className="mega-menu"><div><span className="mega-kicker">EXPLORE FUNDING</span><strong>Finance for every next step.</strong><p>Learn about financing pathways and what lenders may consider.</p><Link href="/loans" onClick={close}>View all solutions <Icon name="arrow-right" size={15}/></Link></div><div className="mega-links">{[{title:'Personal & property',items:loanLinks.slice(0,4)},{title:'Business & corporate',items:loanLinks.slice(4)}].map(group=><div className="mega-link-group" key={group.title}><span className="micro-label">{group.title}</span>{group.items.map(link=><Link key={link.href} href={link.href} aria-current={pathname===link.href?'page':undefined} onClick={close}>{link.name}<Icon name="arrow-up-right" size={14}/></Link>)}</div>)}</div></div>}
   </div>:<Link key={item.href} className={`nav-link ${pathname===item.href?'active':''}`} href={item.href} aria-current={pathname===item.href?'page':undefined} onClick={close}>{item.name}</Link>)}</nav>
   <div className="header-end"><Link href="/apply" className="btn btn-primary header-cta" onClick={close}>Get Loan Guidance <Icon name="arrow-up-right" size={16}/></Link><button className="mobile-toggle" ref={mobileTrigger} onClick={()=>setOpen(value=>!value)} aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} aria-controls="mobile-menu">{open?<Icon name="x"/>:<Icon name="menu"/>}</button></div>
  </div>
  {open&&<nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation"><div className="container">{nav.map(item=><Link href={item.href} key={item.href} aria-current={pathname===item.href?'page':undefined} onClick={close}>{item.name}<Icon name="arrow-up-right" size={16}/></Link>)}<div className="mobile-subnav">{loanLinks.map(item=><Link href={item.href} key={item.href} onClick={close}>{item.name}</Link>)}</div><Link className="btn btn-primary" href="/apply" onClick={close}>Get Loan Guidance</Link></div></nav>}
 </header></>;
}
