import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import { MDXComponents } from 'mdx/types';

const contentDir = path.join(process.cwd(), 'content', 'manuals');

export type ManualFrontmatter = {
  title: string;
  property: string;
};

export async function getManualContent(
  slug: string,
  components: MDXComponents
) {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { content, data } = matter(raw);

  const { content: mdxContent } = await compileMDX<ManualFrontmatter>({
    source: content,
    components,
    options: { parseFrontmatter: false },
  });

  return {
    frontmatter: data as ManualFrontmatter,
    content: mdxContent,
  };
}
