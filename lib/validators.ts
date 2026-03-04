import { z } from 'zod';
import { JOB_CATEGORIES, JOB_TYPES } from '@/lib/constants';

const optionalText = z
    .string()
    .trim()
    .optional()
    .or(z.literal(''))
    .transform((value) => value || undefined);

const optionalUrl = z
    .string()
    .trim()
    .url('Company logo must be a valid URL')
    .optional()
    .or(z.literal(''))
    .transform((value) => value || undefined);

export const JobSchema = z.object({
    title: z.string().trim().min(1, 'Title is required'),
    company: z.string().trim().min(1, 'Company is required'),
    location: z.string().trim().min(1, 'Location is required'),
    category: z.enum(JOB_CATEGORIES),
    type: z.enum(JOB_TYPES),
    description: z.string().trim().min(10, 'Description must be at least 10 characters'),
    salary: optionalText,
    companyLogo: optionalUrl,
});

export const ApplicationSchema = z.object({
    jobId: z.string().trim().min(1, 'Job ID is required'),
    name: z.string().trim().min(1, 'Name is required'),
    email: z.string().trim().email('Invalid email address'),
    resumeLink: z.string().trim().url('Invalid resume URL'),
    coverNote: z.string().trim().min(10, 'Cover note must be at least 10 characters'),
});
