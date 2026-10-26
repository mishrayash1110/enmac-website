import type {Metadata} from 'next';
import {PageHero,Container,Notice,CTA} from '@/components/ui/Shared';
export const metadata:Metadata={title:'Fee Disclosure',robots:{index:false,follow:true}};
export default function Legal(){return <><PageHero layout="legal" eyebrow="TRANSPARENCY & INFORMATION" title='Fee Disclosure' subtitle='Draft disclosure — actual ENMAC fee practices require confirmation.'/>
<section className="section"><Container><div className="legal-body"><span className="legal-draft">UNAPPROVED DRAFT · FOR CLIENT AND LEGAL REVIEW</span>
<section><h2>Understanding potential charges</h2><p>Lenders may charge processing fees, valuations, documentation fees, taxes and other product-specific charges. Request written details of the complete cost and relevant lender key facts statement.</p></section>
<section><h2>ENMAC service fees</h2><p>ENMAC has not provided a verified public adviser/broker fee schedule. This website does not quote or collect advance registration charges, processing fees or any other payment.</p></section>
<section><h2>No website payments</h2><p>There is no checkout, payment link or subscription process on this website. An earlier advance-fee concept is not active.</p></section>
<section><h2>Before you proceed</h2><p>Request written clarification of any advisory remuneration, commission arrangements, payment recipient and refund rules if applicable; none are asserted here. Confirm the approved disclosure with ENMAC before launch.</p></section>
<Notice>This page is a draft pending verified company details, regulatory review, approved policy language and legal sign-off. Do not treat it as an operative ENMAC policy.</Notice></div></Container></section><CTA/></>}
