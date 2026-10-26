'use client';
import {useId, useRef, useState, type KeyboardEvent} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {personalServices, businessServices} from '@/data/services';
import {financingScene} from '@/components/ui/CardBackdrop';
import Icon, {type IconName} from '@/components/ui/Icons';

export default function FinanceTabs() {
  const [audience, setAudience] = useState<'personal' | 'business'>('personal');
  const [slug, setSlug] = useState(personalServices[0].slug);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const options = audience === 'personal' ? personalServices : businessServices;
  const selected = options.find(service => service.slug === slug) || options[0];
  function choose(next: 'personal' | 'business') {
    setAudience(next); setSlug((next === 'personal' ? personalServices : businessServices)[0].slug);
  }
  function tabKey(event: KeyboardEvent, index: number) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? 1 : 1 - index;
    choose(next === 0 ? 'personal' : 'business'); tabs.current[next]?.focus();
  }
  return <div className="solution-discovery">
    <div className="discovery-toolbar">
      <div className="segmented-tabs" role="tablist" aria-label="Financing audience">
        {(['personal', 'business'] as const).map((value, index) => <button key={value} ref={node => {tabs.current[index] = node;}} id={`${id}-tab-${value}`} role="tab" aria-selected={audience === value} aria-controls={`${id}-panel`} tabIndex={audience === value ? 0 : -1} className={audience === value ? 'active' : ''} onKeyDown={event => tabKey(event, index)} onClick={() => choose(value)}><Icon name={value === 'personal' ? 'user-round' : 'briefcase-business'} size={18}/>{value === 'personal' ? 'Personal financing' : 'Business & corporate'}</button>)}
      </div>
      <span className="discovery-count">{options.length} financing paths to explore</span>
    </div>
    <div className="discovery-layout" id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${audience}`} key={audience}>
      <div className="discovery-feature" id={`${id}-feature`} aria-live="polite" aria-atomic="true">
        <div className="discovery-image"><Image src={`/images/enmac-${financingScene(selected.slug)}.webp`} alt="" fill sizes="(max-width: 767px) 100vw, 50vw"/></div>
        <div className="discovery-feature-copy switch-content" key={selected.slug}>
          <span className="micro-label">{audience === 'personal' ? 'FOR LIFE’S IMPORTANT PLANS' : 'FOR YOUR NEXT BUSINESS CHAPTER'}</span>
          <h3>{selected.title}</h3><p>{selected.short}</p>
          <ul>{selected.purpose.slice(0, 2).map(purpose => <li key={purpose}><Icon name="check" size={16}/>{purpose}</li>)}</ul>
          <Link className="btn btn-primary" href={`/loans/${selected.slug}`}>Explore {selected.title.toLowerCase()} <Icon name="arrow-up-right" size={17}/></Link>
        </div>
      </div>
      <div className="discovery-options" role="group" aria-label="Select a financing path">
        {options.map((service, index) => <div key={service.slug} className={`discovery-option ${selected.slug === service.slug ? 'selected' : ''}`}>
          <button onClick={() => setSlug(service.slug)} aria-pressed={selected.slug === service.slug} aria-controls={`${id}-feature ${id}-mobile-${service.slug}`}><span className="discovery-option-icon"><Icon name={service.icon as IconName} size={22}/></span><span><small>0{index + 1}</small><strong>{service.title}</strong><span>{service.short}</span></span><Icon name="chevron-right" size={18}/></button>
          <Link className="discovery-direct" href={`/loans/${service.slug}`} aria-label={`Read about ${service.title}`}><Icon name="arrow-up-right" size={17}/></Link>
          <div hidden={selected.slug !== service.slug} className="mobile-discovery-detail switch-content" id={`${id}-mobile-${service.slug}`} role="region" aria-label={`${service.title} overview`}><span className="micro-label">WHAT IT MAY SUPPORT</span><ul>{service.purpose.slice(0, 2).map(purpose => <li key={purpose}><Icon name="check" size={15}/>{purpose}</li>)}</ul><Link className="text-link" href={`/loans/${service.slug}`}>Explore this financing path <Icon name="arrow-up-right" size={16}/></Link></div>
        </div>)}
        <Link className="discovery-help" href="#loan-finder"><Icon name="help-circle" size={18}/> Not sure? Try the loan explorer <Icon name="arrow-right" size={16}/></Link>
      </div>
    </div>
    <p className="discovery-note"><Icon name="info" size={15}/> Explore categories and preparation. Approval and terms are determined by the lender.</p>
  </div>;
}
