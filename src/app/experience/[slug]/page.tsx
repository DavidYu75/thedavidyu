import ExperienceDetail from '@/components/ExperienceDetail';
import { experiences } from '@/data/experience';
import { Metadata } from 'next';

type Props = {
  params: { slug: string }
};

export async function generateMetadata(
  { params }: Props): Promise<Metadata> {
  const slug = params.slug;
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

export function generateStaticParams() {
  return experiences.map((experience) => ({
    slug: experience.slug,
  }));
}

export default function ExperiencePage({ params }: Props) {
  return <ExperienceDetail slug={params.slug} />;
}
