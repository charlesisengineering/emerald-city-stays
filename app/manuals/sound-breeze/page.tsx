import ManualLayout from '@/components/ManualLayout';
import { getManualContent } from '@/libs/mdx';
import { getManualComponents } from '@/components/mdx/manual-components';
import { getSEOTags } from '@/libs/seo';
import { PROPERTIES } from '@/libs/properties';

// Guest-only manual with access info (WiFi/entry codes) — not indexed.
export const metadata = getSEOTags({
  title: `${PROPERTIES['sound-breeze'].name} House Manual | Emerald City Stays`,
  canonicalUrlRelative: '/manuals/sound-breeze',
  robots: { index: false, follow: true },
});

export default async function SoundBreezeManual() {
  const components = getManualComponents('sound-breeze');
  const { frontmatter, content } = await getManualContent('sound-breeze', components);

  return (
    <ManualLayout title={frontmatter.title}>
      {content}
    </ManualLayout>
  );
}
