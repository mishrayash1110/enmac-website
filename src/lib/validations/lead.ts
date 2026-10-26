import {z} from 'zod';
const cleanText=z.string().trim().min(2).max(120).regex(/^[^<>]*$/,'Unsupported characters');
const optionalText=z.string().trim().max(200).regex(/^[^<>]*$/,'Unsupported characters').optional();
export const enquirySchema=z.object({
  kind:z.literal('enquiry'),
  applicantType:z.enum(['individual','business']),
  fullName:cleanText,
  phone:z.string().regex(/^[6-9]\d{9}$/,'Enter a valid 10-digit Indian mobile number'),
  email:z.email().max(200),
  service:z.string().trim().min(2).max(90),
  amount:z.number().min(1000).max(1e12),
  city:cleanText,
  contactConsent:z.literal(true),
  website:z.string().max(0).optional(),
  sourcePage:z.string().max(90).default('/apply')
});
export const applicationSchema=z.object({
  kind:z.literal('application'),
  applicantType:z.enum(['individual','business']),
  fullName:cleanText,
  phone:z.string().regex(/^[6-9]\d{9}$/),
  email:z.email().max(200),
  city:cleanText,
  service:z.string().min(2).max(90),
  amount:z.number().min(1000).max(1e12),
  purpose:cleanText,
  tenureMonths:z.number().int().min(1).max(480),
  currentObligations:z.string().max(100).optional(),
  timeline:z.string().max(80).optional(),
  employmentType:optionalText,
  occupation:optionalText,
  incomeRange:optionalText,
  workExperience:optionalText,
  companyName:optionalText,
  industry:optionalText,
  constitution:optionalText,
  vintage:optionalText,
  turnover:optionalText,
  accuracyDeclaration:z.literal(true),
  contactConsent:z.boolean(),
  website:z.string().max(0).optional(),
  sourcePage:z.string().max(90).default('/apply')
});
export const leadSchema=z.discriminatedUnion('kind',[enquirySchema,applicationSchema]);
export type Enquiry=z.infer<typeof enquirySchema>;
export type Application=z.infer<typeof applicationSchema>;
