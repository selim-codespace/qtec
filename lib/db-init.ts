import { db } from '@/lib/db';

let initPromise: Promise<void> | null = null;

export function ensureDbInitialized() {
    if (initPromise) {
        return initPromise;
    }

    initPromise = db.$connect().catch((error: unknown) => {
        initPromise = null;
        throw error;
    });

    return initPromise;
}
