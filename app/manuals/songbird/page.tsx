import ManualLayout from '@/components/ManualLayout';
import { getManualContent } from '@/libs/mdx';
import { getManualComponents } from '@/components/mdx/manual-components';
import { getSEOTags } from '@/libs/seo';
import { PROPERTIES } from '@/libs/properties';

// Guest-only manual with access info (WiFi/entry codes) — not indexed.
export const metadata = getSEOTags({
  title: `${PROPERTIES['songbird'].name} House Manual | Emerald City Stays`,
  canonicalUrlRelative: '/manuals/songbird',
  robots: { index: false, follow: true },
});

export default async function SongbirdManual() {
  const components = getManualComponents('songbird');
  const { frontmatter, content } = await getManualContent('songbird', components);

  return (
    <ManualLayout title={frontmatter.title}>
      {content}
    </ManualLayout>
  );
}
