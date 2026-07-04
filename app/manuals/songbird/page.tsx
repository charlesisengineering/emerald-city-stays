import ManualLayout from '@/components/ManualLayout';
import { getManualContent } from '@/libs/mdx';
import { getManualComponents } from '@/components/mdx/manual-components';

export default async function SongbirdManual() {
  const components = getManualComponents('songbird');
  const { frontmatter, content } = await getManualContent('songbird', components);

  return (
    <ManualLayout title={frontmatter.title}>
      {content}
    </ManualLayout>
  );
}
