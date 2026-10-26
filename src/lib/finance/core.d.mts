export function emi(principal:number, annualRate:number, months:number):number;
export function loanSummary(principal:number,annualRate:number,months:number,fees?:number):{payment:number;interest:number;repayment:number;fees:number;modeledCost:number};
export type AmortRow={month:number;interest:number;principal:number;extra:number;balance:number;payment:number};
export function amortization(principal:number,annualRate:number,months:number,extra?:number,extraMonth?:number):{rows:AmortRow[];months:number;interest:number;remaining:number;repayment:number};
