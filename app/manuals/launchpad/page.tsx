import ManualLayout from '@/components/ManualLayout';
import { getManualContent } from '@/libs/mdx';
import { getManualComponents } from '@/components/mdx/manual-components';

export default async function LaunchpadManual() {
  const components = getManualComponents('launchpad');
  const { frontmatter, content } = await getManualContent('launchpad', components);

  return (
    <ManualLayout title={frontmatter.title}>
      {content}
    </ManualLayout>
  );
}
