export function emi(principal, annualRate, months) {
  if (![principal,annualRate,months].every(Number.isFinite) || principal < 0 || annualRate < 0 || !Number.isInteger(months) || months <= 0) throw new RangeError('Enter a valid amount, nonnegative annual rate and positive integer month count.');
  if (principal === 0) return 0;
  const r = annualRate / 1200;
  if (r === 0) return principal / months;
  const factor = Math.pow(1+r, months);
  return principal * r * factor / (factor - 1);
}
export function loanSummary(principal, annualRate, months, fees = 0) {
  if (!Number.isFinite(fees) || fees < 0) throw new RangeError('Fees cannot be negative.');
  const payment = emi(principal,annualRate,months);
  const repayment = payment*months;
  return {payment, interest:Math.max(0,repayment-principal), repayment, fees, modeledCost:repayment+fees};
}
export function amortization(principal, annualRate, months, extra = 0, extraMonth=1) {
  emi(principal,annualRate,months);
  if (!Number.isFinite(extra) || extra < 0 || !Number.isInteger(extraMonth) || extraMonth < 1) throw new RangeError('Invalid prepayment.');
  const base=emi(principal,annualRate,months); const monthlyRate=annualRate/1200;
  let balance=principal, interest=0; const rows=[];
  for(let month=1;month<=months && balance>0.00001;month++) {
    const interestPart=balance*monthlyRate;
    const normalPrincipal=Math.min(balance,Math.max(0,base-interestPart));
    const prepayment=month===extraMonth?Math.min(extra,balance-normalPrincipal):0;
    const paidPrincipal=normalPrincipal+prepayment;
    balance=Math.max(0,balance-paidPrincipal); interest+=interestPart;
    rows.push({month,interest:interestPart,principal:paidPrincipal,extra:prepayment,balance,payment:interestPart+paidPrincipal});
  }
  return {rows,months:rows.length,interest,remaining:balance,repayment:rows.reduce((s,r)=>s+r.payment,0)};
}
