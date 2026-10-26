import type {Metadata} from 'next';
import {PageHero,Container,Notice,CTA} from '@/components/ui/Shared';
export const metadata:Metadata={title:'Terms of Use',robots:{index:false,follow:true}};
export default function Legal(){return <><PageHero layout="legal" eyebrow="TRANSPARENCY & INFORMATION" title='Terms of Use' subtitle='Draft website terms — requires company and legal approval.'/>
<section className="section"><Container><div className="legal-body"><span className="legal-draft">UNAPPROVED DRAFT · FOR CLIENT AND LEGAL REVIEW</span>
<section><h2>Purpose of this website</h2><p>The information is educational and describes potential advisory services. It is not a credit offer, sanction, or professional legal, tax or investment opinion.</p></section>
<section><h2>Role of ENMAC</h2><p>ENMAC is described as a financial advisory and loan consultancy business, not a direct lender. It does not promise particular outcomes. Individual lenders assess applications and set terms.</p></section>
<section><h2>Calculators and articles</h2><p>Calculator estimates depend on user-selected assumptions and simplified mathematics. Actual instalments, costs and requirements may differ.</p></section>
<section><h2>User responsibilities</h2><p>Submit accurate contact and enquiry information only where the service is operational. Do not send sensitive financial identity numbers, passwords or unauthorized documents.</p></section>
<section><h2>Website availability</h2><p>Pages, calculators and guide content may be revised. ENMAC must review and approve all terms, governing law, contact information and issue-resolution arrangements before public deployment.</p></section>
<Notice>This page is a draft pending verified company details, regulatory review, approved policy language and legal sign-off. Do not treat it as an operative ENMAC policy.</Notice></div></Container></section><CTA/></>}
