import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import { MDXComponents } from 'mdx/types';

const contentDir = path.join(process.cwd(), 'content', 'manuals');
const rulesDir = path.join(process.cwd(), 'content', 'rules');

export type ManualFrontmatter = {
  title: string;
  property: string;
};

// Compile a single shared house-rule partial from content/rules/<property>/<rule>.mdx.
// These partials are the single source of truth for rule prose: the same file is
// rendered both in the house manual and in the property page's House Rules section.
// Returns null if the partial doesn't exist so callers can skip missing rules.
export async function getRuleContent(
  property: string,
  rule: string,
  components: MDXComponents = {}
) {
  const filePath = path.join(rulesDir, property, `${rule}.mdx`);
  if (!fs.existsSync(filePath)) {
    console.warn(`getRuleContent: no partial at rules/${property}/${rule}.mdx`);
    return null;
  }
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { content } = matter(raw);
  const { content: mdxContent } = await compileMDX({
    source: content,
    components,
    options: { parseFrontmatter: false },
  });
  return mdxContent;
}

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
