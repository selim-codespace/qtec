import { AdminLoginSchema } from '@/lib/validators';
import { apiError, apiSuccess, apiValidationError } from '@/lib/api-response';
import { getServerEnv } from '@/lib/env';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsedData = AdminLoginSchema.safeParse(body);
        if (!parsedData.success) {
            return apiValidationError(parsedData.error);
        }

        const env = getServerEnv();
        if (parsedData.data.password === env.ADMIN_PASSWORD) {
            const response = apiSuccess({ authenticated: true });
            response.cookies.set(env.ADMIN_COOKIE_NAME, 'authenticated', {
                httpOnly: true,
                secure: env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: env.ADMIN_COOKIE_MAX_AGE,
            });
            return response;
        }

        return apiError('Invalid password', 401);
    } catch (error) {
        console.error('Admin login failed:', error);
        return apiError('Internal Server Error', 500);
    }
}
