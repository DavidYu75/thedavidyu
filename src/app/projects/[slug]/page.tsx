import ProjectDetail from '@/components/ProjectDetail';
import { projects } from '@/data/projects';
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
  const project = projects.find(proj => proj.slug === slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | David Yu`,
    description: project.description,
  };
}

// Generate static paths
export function generateStaticParams(): Params[] {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Page component with proper typing for Next.js 15
export default function Page({ params }: Props) {
  return <ProjectDetail slug={params.slug} />;
}
