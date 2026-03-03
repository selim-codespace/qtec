import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function Footer() {
    return (
        <footer className="bg-foreground text-background py-16">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4 font-sans text-white">
                            QuickHire
                        </h3>
                        <p className="text-sm text-gray-400 max-w-xs mb-8">
                            Great platform for the job seeker that
                            passionate about startups. Find your dream job easier.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">About</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="/" className="hover:text-white transition-colors">Companies</Link></li>
                            <li><Link href="/" className="hover:text-white transition-colors">Pricing</Link></li>
                            <li><Link href="/" className="hover:text-white transition-colors">Terms</Link></li>
                            <li><Link href="/" className="hover:text-white transition-colors">Advice</Link></li>
                            <li><Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Resources</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="/" className="hover:text-white transition-colors">Help Docs</Link></li>
                            <li><Link href="/" className="hover:text-white transition-colors">Guide</Link></li>
                            <li><Link href="/" className="hover:text-white transition-colors">Updates</Link></li>
                            <li><Link href="/" className="hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Get job notifications</h4>
                        <p className="text-sm text-gray-400 mb-4">
                            The latest job news, articles, sent to your inbox weekly.
                        </p>
                        <div className="flex gap-2 font-sans">
                            <Input
                                type="email"
                                placeholder="Email Address"
                                className="bg-white text-foreground"
                            />
                            <Button className="bg-primary hover:bg-primary-hover border-0">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500">
                        © 2026 QuickHire. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        {/* Social Icons Placeholders */}
                        <div className="w-8 h-8 rounded-full bg-gray-800 hover:bg-primary cursor-pointer transition-colors" />
                        <div className="w-8 h-8 rounded-full bg-gray-800 hover:bg-primary cursor-pointer transition-colors" />
                        <div className="w-8 h-8 rounded-full bg-gray-800 hover:bg-primary cursor-pointer transition-colors" />
                        <div className="w-8 h-8 rounded-full bg-gray-800 hover:bg-primary cursor-pointer transition-colors" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
