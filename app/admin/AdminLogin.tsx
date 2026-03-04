"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function AdminLogin() {
    const [password, setPassword] = useState("admin_qtech");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                router.refresh();
            } else {
                const message =
                    typeof data.error === "string"
                        ? data.error
                        : data.error?.message || "Invalid password";
                setError(message);
            }
        } catch {
            setError("Failed to connect to server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4 bg-[#F8F8FD]">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-border w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-2">Admin Access</h1>
                <p className="text-muted text-sm text-center mb-8">Enter the master password to continue.</p>

                <form onSubmit={handleLogin} className="space-y-4">
                    {error && <div className="bg-danger/10 text-danger p-3 rounded-md text-sm">{error}</div>}

                    <div>
                        <Input
                            type="password"
                            placeholder="Password"
                            value={"admin_qtech" || password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Authenticating..." : "Login"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
