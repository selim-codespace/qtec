"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ApiError, submitApplication } from "@/lib/api/jobs";

interface ApplyButtonProps {
    jobId: string;
    jobTitle: string;
    company: string;
}

export function ApplyButton({ jobId, jobTitle, company }: ApplyButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", resumeLink: "", coverNote: "" });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const closeModal = () => {
        setIsOpen(false);
        setErrors({});

        if (success) {
            setSuccess(false);
            setForm({ name: "", email: "", resumeLink: "", coverNote: "" });
        }
    };

    const handleApply = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        try {
            await submitApplication({ ...form, jobId });
            setSuccess(true);
        } catch (error) {
            if (error instanceof ApiError && error.fieldErrors) {
                const nextErrors: Record<string, string> = {};
                Object.entries(error.fieldErrors).forEach(([field, messages]) => {
                    if (messages.length > 0) {
                        nextErrors[field] = messages[0];
                    }
                });
                setErrors(nextErrors);
            } else {
                const message =
                    error instanceof Error ? error.message : "Failed to submit application. Please try again.";
                setErrors({ general: message });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button size="lg" className="w-full md:w-auto px-10 text-lg font-bold" onClick={() => setIsOpen(true)}>
                Apply Now
            </Button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all text-left">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-border flex justify-between items-center">
                            <div>
                                <h3 className="text-2xl font-bold text-foreground">Apply for {jobTitle}</h3>
                                <p className="text-muted text-sm mt-1">{company}</p>
                            </div>
                            <button
                                onClick={closeModal}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                                aria-label="Close application form"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="p-6">
                            {success ? (
                                <div className="text-center py-10">
                                    <div className="w-16 h-16 bg-success/20 text-success rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Check className="h-8 w-8" />
                                    </div>
                                    <h4 className="text-xl font-bold mb-2">Application Submitted!</h4>
                                    <p className="text-muted mb-8">Thank you for applying. We&apos;ll be in touch soon.</p>
                                    <Button className="w-full" onClick={closeModal}>
                                        Done
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleApply} className="space-y-4">
                                    {errors.general && (
                                        <div className="bg-danger/10 text-danger p-3 rounded-md text-sm">{errors.general}</div>
                                    )}

                                    <div>
                                        <label className="block text-sm font-semibold mb-1.5">Full Name</label>
                                        <Input
                                            placeholder="Jane Doe"
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            error={errors.name}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold mb-1.5">Email Address</label>
                                        <Input
                                            type="email"
                                            placeholder="jane@example.com"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            error={errors.email}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold mb-1.5">
                                            Resume URL (Portfolio/Drive Link)
                                        </label>
                                        <Input
                                            type="url"
                                            placeholder="https://..."
                                            value={form.resumeLink}
                                            onChange={(e) => setForm({ ...form, resumeLink: e.target.value })}
                                            error={errors.resumeLink}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold mb-1.5">Cover Note</label>
                                        <textarea
                                            className={`flex min-h-[120px] w-full rounded-md border text-sm px-3 py-2 bg-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                                                errors.coverNote ? "border-danger focus-visible:ring-danger" : "border-border"
                                            }`}
                                            placeholder="Why are you a great fit?"
                                            value={form.coverNote}
                                            onChange={(e) => setForm({ ...form, coverNote: e.target.value })}
                                            required
                                        />
                                        {errors.coverNote && (
                                            <span className="text-xs text-danger mt-1 block">{errors.coverNote}</span>
                                        )}
                                    </div>

                                    <div className="pt-4 flex gap-3">
                                        <Button type="button" variant="outline" className="flex-1" onClick={closeModal}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" className="flex-1" disabled={loading}>
                                            {loading ? "Submitting..." : "Submit Application"}
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
