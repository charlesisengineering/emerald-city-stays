import ManualLayout from '@/components/ManualLayout';
import { getManualContent } from '@/libs/mdx';
import { getManualComponents } from '@/components/mdx/manual-components';

export default async function SoundBreezeManual() {
  const components = getManualComponents('sound-breeze');
  const { frontmatter, content } = await getManualContent('sound-breeze', components);

  return (
    <ManualLayout title={frontmatter.title}>
      {content}
    </ManualLayout>
  );
}
