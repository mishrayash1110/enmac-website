import {NextResponse} from 'next/server';
import {services} from '@/data/services';
export const dynamic='force-static';
export async function GET(){return NextResponse.json({categories:services.map(({slug,title,audience,short})=>({slug,title,audience,description:short}))},{headers:{'Cache-Control':'public, max-age=3600'}})}
