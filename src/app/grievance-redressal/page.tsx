import type {Metadata} from 'next';
import {PageHero,Container,Notice,CTA} from '@/components/ui/Shared';
export const metadata:Metadata={title:'Grievance Redressal',robots:{index:false,follow:true}};
export default function Legal(){return <><PageHero layout="legal" eyebrow="TRANSPARENCY & INFORMATION" title='Grievance Redressal' subtitle='Draft support and complaint process — requires ENMAC approval.'/>
<section className="section"><Container><div className="legal-body"><span className="legal-draft">UNAPPROVED DRAFT · FOR CLIENT AND LEGAL REVIEW</span>
<section><h2>How to raise a concern</h2><p>ENMAC should publish its verified support email, phone, service hours and designated grievance contact before production. These have not been supplied and are intentionally not invented.</p></section>
<section><h2>Information to include</h2><p>Describe the relevant interaction, date and broad concern. Avoid sharing PAN, Aadhaar, passwords or confidential financial information through an unverified channel.</p></section>
<section><h2>What happens next</h2><p>ENMAC needs to define actual acknowledgement and resolution timelines, escalation points and any applicable regulatory route. This draft does not promise unapproved time limits.</p></section>
<section><h2>Lender-specific concerns</h2><p>If an issue relates to a lender’s decision, charges or servicing, use the lender’s verified complaint process. Escalation rights depend on the regulated entity and applicable law.</p></section>
<Notice>This page is a draft pending verified company details, regulatory review, approved policy language and legal sign-off. Do not treat it as an operative ENMAC policy.</Notice></div></Container></section><CTA/></>}
