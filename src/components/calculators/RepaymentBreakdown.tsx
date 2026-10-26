'use client';
import {useState} from 'react';
import {money} from '@/lib/finance/format';

export default function RepaymentBreakdown({principal, interest}: {principal: number; interest: number}) {
  const [selected, setSelected] = useState<'principal' | 'interest'>('principal');
  const total = principal + interest;
  const share = total > 0 ? principal / total * 100 : 0;
  return <div className="repayment-breakdown">
    <div className="repayment-ring" style={{background: `conic-gradient(var(--blue) 0% ${share}%, #d5dde3 ${share}% 100%)`}} role="img" aria-label={`Principal ${share.toFixed(1)} percent, interest ${(100-share).toFixed(1)} percent of total repayment`}>
      <div><span>{selected === 'principal' ? 'Principal' : 'Interest'}</span><strong>{money(selected === 'principal' ? principal : interest)}</strong></div>
    </div>
    <div className="breakdown-controls" role="group" aria-label="Inspect repayment breakdown">
      <span className="micro-label">REPAYMENT COMPOSITION</span>
      <button type="button" aria-pressed={selected === 'principal'} onClick={() => setSelected('principal')}><i className="legend-primary"/><span>Principal</span><strong>{share.toFixed(1)}%</strong></button>
      <button type="button" aria-pressed={selected === 'interest'} onClick={() => setSelected('interest')}><i className="legend-secondary"/><span>Interest</span><strong>{(100-share).toFixed(1)}%</strong></button>
      <small>Select a component to inspect its amount.</small>
    </div>
  </div>;
}
