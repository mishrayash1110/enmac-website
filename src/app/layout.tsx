import type {Metadata,Viewport} from 'next';
import './globals.css';
import './corporate.css';
import './experience.css';
import Experience from '@/components/ui/Experience';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
export const metadata:Metadata={title:{default:'ENMAC | Financial Advisory & Loan Consultancy',template:'%s | ENMAC'},description:'Explore personal, business, MSME and corporate financing with clearer guidance on options, documentation and repayment planning.',openGraph:{title:'ENMAC Financial Advisory',description:'Financial clarity. Better borrowing decisions.',type:'website'},robots:{index:true,follow:true}};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#0878C1'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className="corporate-site"><a className="skip-link" href="#main-content">Skip to content</a><Experience/><Header/><main id="main-content">{children}</main><Footer/></body></html>}
