import ExperienceDetail from '@/components/ExperienceDetail';
import { experiences } from '@/data/experience';
import { Metadata } from 'next';

// Define params type
type Params = {
  slug: string;
};

// Generate metadata using the params
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<Params> 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const experience = experiences.find(exp => exp.slug === slug);
  
  if (!experience) {
    return {
      title: 'Experience Not Found',
    };
  }

  return {
    title: `${experience.title} at ${experience.company} | David Yu`,
    description: experience.description,
  };
}

// Generate static paths
export function generateStaticParams(): Array<Params> {
  return experiences.map((experience) => ({
    slug: experience.slug,
  }));
}

// Page component with proper typing for Next.js 15
export default async function Page({ 
  params 
}: { 
  params: Promise<Params> 
}) {
  const resolvedParams = await params;
  return <ExperienceDetail slug={resolvedParams.slug} />;
}
