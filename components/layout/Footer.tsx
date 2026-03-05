import Link from "next/link";
import { Dribbble, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

function LogoMark() {
    return (
        <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <span className="h-4 w-4 rounded-full border-2 border-white" />
            <span className="absolute right-[7px] top-[7px] h-1.5 w-1.5 rounded-full bg-white" />
        </span>
    );
}

export default function Footer() {
    return (
        <footer className="w-full bg-[#202430] py-10 text-white md:py-16">
            <div className="max-w-[1620px] mx-auto px-4 md:px-6 xl:px-0">
                <div className="space-y-10 md:space-y-12 flex flex-wrap gap-10 items-start justify-between">
                    <div>
                        <Link href="/" className="mb-6 inline-flex items-center gap-2">
                            <LogoMark />
                            <span className="font-brand text-[24px] font-bold leading-none md:text-[34px]">QuickHire</span>
                        </Link>
                        <p className="max-w-[343px] text-base leading-[1.6] text-[#d6ddeb]">
                            Great platform for the job seeker that passionate about startups. Find your dream job easier.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-10 md:max-w-[420px] md:gap-14">
                        <div>
                            <h3 className="mb-4 text-[18px] font-semibold leading-[1.6]">About</h3>
                            <ul className="space-y-3 text-base text-[#d6ddeb] md:space-y-4">
                                <li><Link href="/jobs">Companies</Link></li>
                                <li><Link href="/jobs">Pricing</Link></li>
                                <li><Link href="/jobs">Terms</Link></li>
                                <li><Link href="/jobs">Advice</Link></li>
                                <li><Link href="/jobs">Privacy Policy</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-4 text-[18px] font-semibold leading-[1.6]">Resources</h3>
                            <ul className="space-y-3 text-base text-[#d6ddeb] md:space-y-4">
                                <li><Link href="/jobs">Help Docs</Link></li>
                                <li><Link href="/jobs">Guide</Link></li>
                                <li><Link href="/jobs">Updates</Link></li>
                                <li><Link href="/jobs">Contact Us</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-2 text-[18px] font-semibold leading-[1.6]">Get job notifications</h3>
                        <p className="mb-4 max-w-[306px] text-base leading-[1.6] text-[#d6ddeb] md:mb-6">
                            The latest job news, articles, sent to your inbox weekly.
                        </p>
                        <form className="flex max-w-[460px] flex-col gap-0 md:flex-row md:items-center">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="h-14 w-full border border-[#d6ddeb] bg-white px-4 text-base text-[#202430] outline-none placeholder:text-[#a8adb7]"
                            />
                            <button
                                type="button"
                                className="inline-flex h-14 w-fit items-center justify-center bg-primary px-9 text-base font-bold text-white transition-colors hover:bg-primary-hover"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-8 border-t border-white/15 pt-8 md:mt-12 md:pt-10">
                    <div className="flex flex-col items-center gap-5 text-center md:flex-row md:justify-between md:text-left">
                        <p className="text-base font-medium text-white/50">2021 @ QuickHire. All rights reserved.</p>
                        <div className="flex items-center gap-3">
                            {[Facebook, Instagram, Dribbble, Linkedin, Twitter].map((Icon, index) => (
                                <span
                                    key={index}
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80"
                                >
                                    <Icon className="h-4 w-4" />
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
