import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Clear existing
    await prisma.application.deleteMany()
    await prisma.job.deleteMany()

    const jobs = [
        {
            title: 'Email Marketing',
            company: 'Revolut',
            location: 'Madrid, Spain',
            category: 'Marketing',
            type: 'Full Time',
            description: 'Revolut is looking for Email Marketing to help team design ... \n\nWe are looking for an experienced email marketing manager to guide our automation processes and ensure high engagement.',
            salary: '$50k - $70k',
        },
        {
            title: 'Brand Designer',
            company: 'Dropbox',
            location: 'San Francisco, US',
            category: 'Design',
            type: 'Full Time',
            description: 'Dropbox is looking for Brand Designer to help the team... \n\nJoin our design team to craft beautiful and intuitive experiences for millions of users.',
            salary: '$90k - $120k',
        },
        {
            title: 'Visual Designer',
            company: 'Blinklist',
            location: 'Granada, Spain',
            category: 'Design',
            type: 'Full Time',
            description: 'Blinklist is looking for Visual Designer to help team design ... \n\nWork on engaging visual concepts and brand identity systems.',
            salary: '$60k - $85k',
        },
        {
            title: 'Product Designer',
            company: 'ClassPass',
            location: 'Manchester, UK',
            category: 'Design',
            type: 'Full Time',
            description: 'ClassPass is looking for Product Designer to help us build... \n\nWe need a talented designer to create user flows, prototypes, and high-fidelity mockups.',
            salary: '£55k - £75k',
        },
        {
            title: 'Interactive Developer',
            company: 'Terraform',
            location: 'Hamburg, Germany',
            category: 'Engineering',
            type: 'Full Time',
            description: 'Terraform is looking for Interactive Developer to help team... \n\nDevelop cutting-edge web experiences using Next.js, WebGL, and modern tools.',
            salary: '€65k - €90k',
        },
        {
            title: 'HR Manager',
            company: 'Packer',
            location: 'Lucern, Switzerland',
            category: 'Human Resource',
            type: 'Full Time',
            description: 'Packer is looking for HR Manager to help team manage ... \n\nDrive recruitment, employee relations, and HR strategy in a fast-paced environment.',
            salary: 'CHF 80k - CHF 110k',
        },
        {
            title: 'Social Media Assistant',
            company: 'Nomad',
            location: 'Paris, France',
            category: 'Marketing',
            type: 'Part Time',
            description: 'Nomad is looking for Social Media Assistant ... \n\nManage community engagement and content posting across Instagram and TikTok.',
            salary: '€20/hr',
        },
        {
            title: 'Data Analyst',
            company: 'Twitter',
            location: 'San Diego, US',
            category: 'Technology',
            type: 'Full Time',
            description: 'Twitter is looking for Data Analyst to help team ... \n\nAnalyze massive datasets to uncover trends and drive business decisions.',
            salary: '$110k - $140k',
        }
    ]

    console.log(`Start seeding ...`)
    for (const j of jobs) {
        const job = await prisma.job.create({
            data: j,
        })
        console.log(`Created job with id: ${job.id}`)
    }
    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
