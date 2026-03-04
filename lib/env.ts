import 'server-only';
import { z } from 'zod';

const ServerEnvSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    ADMIN_PASSWORD: z.string().min(1, 'ADMIN_PASSWORD must be configured'),
    ADMIN_COOKIE_NAME: z.string().min(1).default('admin_token'),
    ADMIN_COOKIE_MAX_AGE: z.coerce.number().int().positive().default(60 * 60 * 24),
});

export type ServerEnv = z.infer<typeof ServerEnvSchema>;

let cachedEnv: ServerEnv | null = null;

export function getServerEnv(): ServerEnv {
    if (cachedEnv) {
        return cachedEnv;
    }

    const parsed = ServerEnvSchema.safeParse(process.env);
    if (!parsed.success) {
        const issues = parsed.error.issues.map((issue) => issue.message).join('; ');
        throw new Error(`Invalid server environment configuration: ${issues}`);
    }

    cachedEnv = parsed.data;
    return cachedEnv;
}
