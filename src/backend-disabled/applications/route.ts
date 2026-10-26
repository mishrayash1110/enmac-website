import {NextRequest} from 'next/server';
import {receiveLead} from '@/lib/api/leads';
export const runtime='nodejs';
export async function POST(req:NextRequest){return receiveLead(req,'application')}
