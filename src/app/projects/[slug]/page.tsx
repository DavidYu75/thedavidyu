import ProjectDetail from '@/components/ProjectDetail';
import { projects } from '@/data/projects';
import { Metadata } from 'next';

type Props = {
  params: { slug: string }
};

export async function generateMetadata(
  { params }: Props): Promise<Metadata> {
  const slug = params.slug;
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

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({ params }: Props) {
  return <ProjectDetail slug={params.slug} />;
}
