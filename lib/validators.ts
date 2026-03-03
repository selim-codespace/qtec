import { z } from 'zod';

export const JobSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    company: z.string().min(1, 'Company is required'),
    location: z.string().min(1, 'Location is required'),
    category: z.string().min(1, 'Category is required'),
    type: z.string().min(1, 'Type is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    salary: z.string().optional(),
    companyLogo: z.string().optional(),
});

export const ApplicationSchema = z.object({
    jobId: z.string().min(1, 'Job ID is required'),
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    resumeLink: z.string().url('Invalid resume URL'),
    coverNote: z.string().min(10, 'Cover note must be at least 10 characters'),
});
