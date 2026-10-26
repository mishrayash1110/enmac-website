export const money = (amount:number) => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(Number.isFinite(amount)?amount:0);
export const compactMoney=(amount:number)=>amount>=1e7?`₹${(amount/1e7).toFixed(2)} Cr`:amount>=1e5?`₹${(amount/1e5).toFixed(1)} L` :money(amount);
