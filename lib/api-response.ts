import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export type ApiFieldErrors = Record<string, string[] | undefined>;

type ApiErrorPayload = {
    message: string;
    code?: string;
    fieldErrors?: ApiFieldErrors;
};

type ApiSuccessOptions = {
    status?: number;
    meta?: Record<string, unknown>;
};

export function apiSuccess<T>(data: T, options: ApiSuccessOptions = {}) {
    const body: { success: true; data: T; meta?: Record<string, unknown> } = {
        success: true,
        data,
    };

    if (options.meta) {
        body.meta = options.meta;
    }

    return NextResponse.json(body, { status: options.status ?? 200 });
}

export function apiError(
    message: string,
    status = 400,
    options: { code?: string; fieldErrors?: ApiFieldErrors } = {}
) {
    const error: ApiErrorPayload = { message };

    if (options.code) {
        error.code = options.code;
    }

    if (options.fieldErrors) {
        error.fieldErrors = options.fieldErrors;
    }

    return NextResponse.json({ success: false, error }, { status });
}

export function apiValidationError(error: ZodError, message = 'Validation failed') {
    return apiError(message, 400, { fieldErrors: error.flatten().fieldErrors });
}
