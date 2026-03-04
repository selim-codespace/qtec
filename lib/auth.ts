import { cookies } from 'next/headers';
import { getServerEnv } from '@/lib/env';

export async function isAdminAuthenticated() {
    const env = getServerEnv();
    const cookieStore = await cookies();
    return cookieStore.get(env.ADMIN_COOKIE_NAME)?.value === 'authenticated';
}
