import ExperienceDetail from '@/components/ExperienceDetail';
import { experiences } from '@/data/experience';
import { Metadata } from 'next';

// Define params type
type Params = {
  slug: string;
};

// Define props type for the page component
type Props = {
  params: Params;
};

// Generate metadata using the params
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
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
export function generateStaticParams(): Params[] {
  return experiences.map((experience) => ({
    slug: experience.slug,
  }));
}

// Page component with proper typing for Next.js 15
export default function Page({ params }: Props) {
  return <ExperienceDetail slug={params.slug} />;
}
