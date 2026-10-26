import type {Metadata} from 'next';
import {PageHero,Container,CTA} from '@/components/ui/Shared';
import GuideLibrary from '@/components/home/GuideLibrary';
export const metadata:Metadata={title:'Financial Knowledge Hub',description:'Learn about credit scores, EMIs, business finance, repayment, collateral and borrowing documentation.'};
export default function Guides(){return <><PageHero layout="publication" eyebrow="KNOWLEDGE HUB" title="Financial knowledge for decisions that matter." subtitle="Useful, approachable articles on borrowing, documentation and responsible financial planning. No jargon overload."/><section className="section publication-workspace" id="knowledge-library"><Container><GuideLibrary/></Container></section><CTA title="A question is a good place to start." description="Explore the guides, use the calculators and connect with ENMAC to discuss financing requirements."/></>}
