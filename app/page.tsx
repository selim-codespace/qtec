import Image from "next/image";
import Link from "next/link";
import { SearchBar } from "@/components/ui/SearchBar";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { JobCard } from "@/components/ui/JobCard";
import { JobListItem } from "@/components/ui/JobListItem";
import { Button } from "@/components/ui/Button";
import { db } from "@/lib/db";
import { Paintbrush, TrendingUp, Megaphone, LineChart, Code, Cog, Briefcase, Users } from "lucide-react";

async function getJobs() {
  try {
    const featured = await db.job.findMany({ take: 6, orderBy: { createdAt: 'desc' } });
    const latest = await db.job.findMany({ take: 8, orderBy: { title: 'asc' } });
    return { featured, latest };
  } catch (error) {
    console.warn("Prisma error during static collection:", error);
    return { featured: [], latest: [] };
  }
}

export default async function Home() {
  const { featured, latest } = await getJobs();

  const categories = [
    { title: "Design", count: 235, icon: Paintbrush, href: "/jobs?category=Design" },
    { title: "Sales", count: 756, icon: TrendingUp, href: "/jobs?category=Sales" },
    { title: "Marketing", count: 140, icon: Megaphone, href: "/jobs?category=Marketing" },
    { title: "Finance", count: 325, icon: LineChart, href: "/jobs?category=Finance" },
    { title: "Technology", count: 436, icon: Code, href: "/jobs?category=Technology" },
    { title: "Engineering", count: 542, icon: Cog, href: "/jobs?category=Engineering" },
    { title: "Business", count: 211, icon: Briefcase, href: "/jobs?category=Business" },
    { title: "Human Resource", count: 346, icon: Users, href: "/jobs?category=Human+Resource" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#F8F8FD] py-20 px-4 md:px-6">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-black text-foreground mb-6 leading-tight">
              Discover <br />
              more than <br />
              <span className="text-[#32D0EB]">5000+ Jobs</span>
            </h1>
            <img src="https://raw.githubusercontent.com/mrraf/dummy-assets/main/blue-underline-sketch.png" alt="Underline" className="h-4 -mt-6 mb-6 w-64 object-cover opacity-80 mix-blend-multiply invisible" />
            <p className="text-lg text-muted mb-8 max-w-lg">
              Great platform for the job seeker that searching for new career
              heights and passionate about startups.
            </p>
            <SearchBar />
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted">Popular :</span>
              <span className="text-sm font-medium text-foreground">UI Designer, UX Researcher, Android, Admin</span>
            </div>
          </div>
          <div className="hidden lg:block relative h-[600px]">
            {/* Placeholder for the hero image and floating elements. For now replaced by a stylized block */}
            <div className="absolute inset-0 bg-primary/5 rounded-[40px] border border-primary/20 overflow-hidden flex items-center justify-center">
              <span className="text-primary/20 font-bold text-4xl transform -rotate-12">Hero Graphic</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Company logos */}
      <section className="py-10 border-b border-border bg-white px-4 md:px-6">
        <div className="container mx-auto">
          <p className="text-muted text-sm mb-6 text-opacity-80">Companies we helped grow</p>
          <div className="flex flex-wrap items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all">
            <div className="text-xl font-bold">Vodafone</div>
            <div className="text-xl font-bold">Intel</div>
            <div className="text-xl font-bold">Tesla</div>
            <div className="text-xl font-bold">AMD</div>
            <div className="text-xl font-bold">Talkdesk</div>
          </div>
        </div>
      </section>

      {/* 3. Explore by category */}
      <section className="py-20 px-4 md:px-6 bg-white">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-foreground">
              Explore by <span className="text-[#32D0EB]">category</span>
            </h2>
            <Link href="/jobs" className="hidden sm:inline-flex text-primary font-bold hover:underline items-center">
              Show all jobs <span className="ml-2">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <CategoryCard key={i} {...cat} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA Banner */}
      <section className="py-12 px-4 md:px-6 bg-white">
        <div className="container mx-auto">
          <div className="bg-primary rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between text-white overflow-hidden relative">
            <div className="z-10 max-w-xl">
              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                Start posting <br /> jobs today
              </h2>
              <p className="text-primary-100 mb-8 max-w-md opacity-90">
                Start posting jobs for only $10.
              </p>
              <Link href="/admin">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold">
                  Post a Job
                </Button>
              </Link>
            </div>

            <div className="hidden lg:block relative w-96 h-64 mt-8 md:mt-0 z-10">
              <div className="absolute inset-0 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm shadow-xl p-4">
                <div className="space-y-3">
                  <div className="h-10 bg-white/20 rounded w-full"></div>
                  <div className="h-6 bg-white/20 rounded w-3/4"></div>
                  <div className="h-6 bg-white/20 rounded w-1/2"></div>
                </div>
              </div>
            </div>

            {/* Background decorations */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white opacity-5 mix-blend-overlay pointer-events-none"></div>
            <div className="absolute bottom-0 left-1/2 w-64 h-64 rounded-full bg-black opacity-10 mix-blend-overlay pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* 5. Featured Jobs */}
      <section className="py-20 px-4 md:px-6 bg-white">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-foreground">
              Featured <span className="text-[#32D0EB]">jobs</span>
            </h2>
            <Link href="/jobs" className="hidden sm:inline-flex text-primary font-bold hover:underline items-center">
              Show all jobs <span className="ml-2">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((job: any) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Latest jobs open */}
      <section className="py-20 px-4 md:px-6 bg-[#F8F8FD]">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-foreground">
              Latest <span className="text-[#32D0EB]">jobs open</span>
            </h2>
            <Link href="/jobs" className="hidden sm:inline-flex text-primary font-bold hover:underline items-center">
              Show all jobs <span className="ml-2">→</span>
            </Link>
          </div>

          <div className="bg-white border text-foreground border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
            {latest.map((job: any) => (
              <JobListItem key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
