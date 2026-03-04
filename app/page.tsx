/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
    ArrowRight,
    BriefcaseBusiness,
    ChartNoAxesColumn,
    Code2,
    Megaphone,
    Monitor,
    Paintbrush,
    Users,
    Wallet,
} from "lucide-react";
import { db } from "@/lib/db";
import { ensureDbInitialized } from "@/lib/db-init";
import { SearchBar } from "@/components/ui/SearchBar";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { JobCard } from "@/components/ui/JobCard";
import { JobListItem } from "@/components/ui/JobListItem";

export const dynamic = "force-dynamic";

const HERO_PERSON_IMAGE = "https://www.figma.com/api/mcp/asset/af8eef26-4d72-49b3-9fc5-dc5481df7265";
const HERO_PATTERN_IMAGE = "https://www.figma.com/api/mcp/asset/c0bcdb5f-0fde-4b17-ac30-be592d725e21";
const HERO_UNDERLINE = "https://www.figma.com/api/mcp/asset/98a512ab-6e30-43e5-8542-089b67731ae6";
const COMPANY_VODAFONE = "https://www.figma.com/api/mcp/asset/4dce6950-731e-45ac-92c4-5a9f001a0626";
const COMPANY_INTEL = "https://www.figma.com/api/mcp/asset/4f9069e4-4dce-49dd-b302-89eda1a0be93";
const COMPANY_TESLA = "https://www.figma.com/api/mcp/asset/9e46606e-b648-4dcb-8cf9-762cee3b6bd3";
const COMPANY_AMD = "https://www.figma.com/api/mcp/asset/ef93c2a7-6122-4310-8df3-80f77f1160fd";
const COMPANY_TALKIT = "https://www.figma.com/api/mcp/asset/6654b883-7bc5-49f8-aa2d-3aeca4889f0f";
const CTA_DASHBOARD_IMAGE = "https://www.figma.com/api/mcp/asset/00bcf01c-dc26-4849-84f9-943ce380b0be";
const LATEST_PATTERN = "https://www.figma.com/api/mcp/asset/3da4ade0-81c2-4b6d-a26a-c7fc3d092381";

type HomeJob = {
    id: string;
    title: string;
    company: string;
    location: string;
    category: string;
    type: string;
    description: string;
};

async function getJobs() {
    await ensureDbInitialized();

    const featured = (await db.job.findMany({
        take: 8,
        orderBy: { createdAt: "desc" },
    })) as HomeJob[];

    const latest = (await db.job.findMany({
        take: 8,
        orderBy: { createdAt: "desc" },
    })) as HomeJob[];

    return { featured, latest };
}

function SectionLink({ className = "" }: { className?: string }) {
    return (
        <Link href="/jobs" className={`inline-flex items-center gap-2 text-base font-semibold text-primary ${className}`}>
            Show all jobs
            <ArrowRight className="h-5 w-5" />
        </Link>
    );
}

export default async function Home() {
    const { featured, latest } = await getJobs();
    const splitPoint = Math.ceil(latest.length / 2);
    const latestLeft = latest.slice(0, splitPoint);
    const latestRight = latest.slice(splitPoint);

    const categories = [
        { title: "Design", count: 235, icon: Paintbrush, href: "/jobs?category=Design" },
        { title: "Sales", count: 756, icon: ChartNoAxesColumn, href: "/jobs?category=Sales" },
        { title: "Marketing", count: 140, icon: Megaphone, href: "/jobs?category=Marketing", active: true },
        { title: "Finance", count: 325, icon: Wallet, href: "/jobs?category=Finance" },
        { title: "Technology", count: 436, icon: Monitor, href: "/jobs?category=Technology" },
        { title: "Engineering", count: 542, icon: Code2, href: "/jobs?category=Engineering" },
        { title: "Business", count: 211, icon: BriefcaseBusiness, href: "/jobs?category=Business" },
        { title: "Human Resource", count: 346, icon: Users, href: "/jobs?category=Human+Resource" },
    ];

    return (
        <div className="overflow-hidden max-w-[1620px] mx-auto bg-white">
            <section className="relative bg-[#f8f8fd] px-4 pb-14 pt-6 md:px-6 md:pb-24 lg:pt-10 xl:px-0">
                <img
                    src={HERO_PATTERN_IMAGE}
                    alt=""
                    className="pointer-events-none absolute right-[-180px] top-[-200px] hidden max-w-none lg:block"
                />

                <div className="mx-auto grid grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-2">
                    <div className="relative z-[1]">
                        <h1 className="font-clash text-[48px] font-semibold leading-[1.1] text-[#25324b] md:text-[72px]">
                            Discover
                            <br />
                            more than
                            <br />
                            <span className="text-[#26a4ff]">5000+ Jobs</span>
                        </h1>
                        <img src={HERO_UNDERLINE} alt="" className="mt-2 w-full max-w-[455px]" />

                        <p className="mt-5 max-w-[540px] text-[18px] leading-[1.6] text-[#515b6f] md:text-xl">
                            Great platform for the job seeker that searching for new career heights and passionate about
                            startups.
                        </p>

                        <div className="mt-6 max-w-[852px]">
                            <SearchBar />
                        </div>

                        <p className="mt-4 text-base leading-[1.6] text-[#515b6f]">
                            Popular : <span className="font-medium text-[#202430]">UI Designer, UX Researcher, Android, Admin</span>
                        </p>
                    </div>

                    <div className="relative hidden justify-end lg:flex">
                        <div className="relative h-[520px] w-full max-w-[520px] md:h-[640px] md:max-w-[560px]">
                            <img
                                src={HERO_PERSON_IMAGE}
                                alt="Professional candidate"
                                className="absolute bottom-0 right-0 h-full w-full object-contain"
                            />
                            <div
                                className="absolute bottom-0 right-0 h-[130px] w-[220px] bg-white"
                                style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white px-4 py-10 md:px-6 md:py-12 xl:px-0">
                <div className="mx-auto max-w-[1192px]">
                    <p className="text-lg leading-[1.6] text-[#202430]/50">Companies we helped grow</p>
                    <div className="mt-8 grid grid-cols-2 items-center gap-x-8 gap-y-10 opacity-35 grayscale sm:grid-cols-3 md:grid-cols-5">
                        <img src={COMPANY_VODAFONE} alt="Vodafone" className="h-10 w-auto" />
                        <img src={COMPANY_INTEL} alt="Intel" className="h-8 w-auto" />
                        <img src={COMPANY_TALKIT} alt="Talkit" className="h-8 w-auto" />
                        <img src={COMPANY_AMD} alt="AMD" className="h-7 w-auto" />
                        <img src={COMPANY_TESLA} alt="Tesla" className="h-6 w-auto" />
                    </div>
                </div>
            </section>

            <section className="bg-white px-4 pb-20 pt-10 md:px-6 md:pt-16 xl:px-0">
                <div className="mx-auto max-w-[1192px]">
                    <div className="mb-8 flex items-end justify-between md:mb-12">
                        <h2 className="font-clash text-[32px] font-semibold leading-[1.2] text-[#25324b] md:text-5xl md:leading-[1.1]">
                            Explore by <span className="text-[#26a4ff]">category</span>
                        </h2>
                        <SectionLink className="hidden sm:inline-flex" />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8 xl:grid-cols-4">
                        {categories.map((category) => (
                            <CategoryCard key={category.title} {...category} />
                        ))}
                    </div>

                    <div className="mt-8 sm:hidden">
                        <SectionLink />
                    </div>
                </div>
            </section>

            <section className="bg-white pb-20 md:px-6 xl:px-0">
                <div className="mx-auto max-w-[1192px] overflow-hidden bg-primary">
                    <div className="relative">
                        <div
                            className="absolute left-0 top-0 h-[96px] w-[180px] bg-white"
                            style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                        />
                        <div
                            className="absolute bottom-0 right-0 h-[96px] w-[180px] bg-white"
                            style={{ clipPath: "polygon(100% 100%, 0 100%, 100% 0)" }}
                        />

                        <div className="relative grid grid-cols-1 items-center lg:grid-cols-2">
                            <div className="px-4 pt-14 text-center text-white sm:px-8 md:px-14 lg:py-16 lg:text-left">
                                <h2 className="font-clash text-[48px] font-semibold leading-[1.1]">Start posting jobs today</h2>
                                <p className="mt-4 text-[18px] leading-[1.6] text-white/90 md:mt-6 md:text-xl">
                                    Start posting jobs for only $10.
                                </p>
                                <Link
                                    href="/admin"
                                    className="mt-6 inline-flex h-14 w-full items-center justify-center bg-white px-8 text-2xl font-bold text-primary md:mt-8 md:w-auto"
                                >
                                    Sign Up For Free
                                </Link>
                            </div>

                            <div className="relative mt-6 h-[246px] overflow-hidden lg:mt-0 lg:min-h-[414px]">
                                <img
                                    src={CTA_DASHBOARD_IMAGE}
                                    alt="Dashboard preview"
                                    className="absolute left-0 top-0 h-full min-w-[404px] object-cover lg:-bottom-16 lg:left-auto lg:right-0 lg:h-[430px] lg:w-[640px]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white px-4 pb-20 md:px-6 xl:px-0">
                <div className="mx-auto max-w-[1192px]">
                    <div className="mb-8 flex items-end justify-between md:mb-12">
                        <h2 className="font-clash text-[32px] font-semibold leading-[1.2] text-[#25324b] md:text-5xl md:leading-[1.1]">
                            Featured <span className="text-[#26a4ff]">jobs</span>
                        </h2>
                        <SectionLink className="hidden sm:inline-flex" />
                    </div>

                    <div className="-mx-4 no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-8 sm:overflow-visible sm:px-0 xl:grid-cols-4">
                        {featured.map((job) => (
                            <div key={job.id} className="min-w-[286px] shrink-0 snap-start sm:min-w-0">
                                <JobCard job={job} />
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 sm:hidden">
                        <SectionLink />
                    </div>
                </div>
            </section>

            <section className="relative bg-[#f8f8fd] px-4 pb-20 pt-16 md:px-6 md:pb-24 xl:px-0">
                <img src={LATEST_PATTERN} alt="" className="pointer-events-none absolute right-[-220px] top-[-120px] hidden max-w-none xl:block" />

                <div className="relative z-[1] mx-auto max-w-[1192px]">
                    <div className="mb-8 flex items-end justify-between md:mb-12">
                        <h2 className="font-clash text-[32px] font-semibold leading-[1.2] text-[#25324b] md:text-5xl md:leading-[1.1]">
                            Latest <span className="text-[#26a4ff]">jobs open</span>
                        </h2>
                        <SectionLink className="hidden sm:inline-flex" />
                    </div>

                    <div className="space-y-4 xl:hidden">
                        {latest.map((job) => (
                            <JobListItem key={job.id} job={job} />
                        ))}
                    </div>

                    <div className="hidden grid-cols-2 gap-8 xl:grid">
                        <div className="space-y-4">
                            {latestLeft.map((job) => (
                                <JobListItem key={job.id} job={job} />
                            ))}
                        </div>
                        <div className="space-y-4">
                            {latestRight.map((job) => (
                                <JobListItem key={job.id} job={job} />
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 sm:hidden">
                        <SectionLink />
                    </div>
                </div>
            </section>
        </div>
    );
}
