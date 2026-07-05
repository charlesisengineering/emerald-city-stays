import ManualLayout from '@/components/ManualLayout';
import { getManualContent } from '@/libs/mdx';
import { getManualComponents } from '@/components/mdx/manual-components';
import { getSEOTags } from '@/libs/seo';
import { PROPERTIES } from '@/libs/properties';

// Guest-only manual with access info (WiFi/entry codes) — not indexed.
export const metadata = getSEOTags({
  title: `${PROPERTIES['launchpad'].name} House Manual | Emerald City Stays`,
  canonicalUrlRelative: '/manuals/launchpad',
  robots: { index: false, follow: true },
});

export default async function LaunchpadManual() {
  const components = getManualComponents('launchpad');
  const { frontmatter, content } = await getManualContent('launchpad', components);

  return (
    <ManualLayout title={frontmatter.title}>
      {content}
    </ManualLayout>
  );
}
