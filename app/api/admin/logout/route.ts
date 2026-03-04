import { apiSuccess } from '@/lib/api-response';
import { getServerEnv } from '@/lib/env';

export async function POST() {
    const env = getServerEnv();
    const response = apiSuccess({ authenticated: false });
    response.cookies.delete(env.ADMIN_COOKIE_NAME);
    return response;
}
