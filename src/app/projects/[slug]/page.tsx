import ProjectDetail from '@/components/ProjectDetail';
import { projects } from '@/data/projects';
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
export function generateStaticParams(): Array<Params> {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Page component with proper typing for Next.js 15
export default async function Page({ 
  params 
}: {
  params: Promise<Params>
}) {
  const resolvedParams = await params;
  return <ProjectDetail slug={resolvedParams.slug} />;
}
