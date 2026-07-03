import { getRuleContent } from '@/libs/mdx';

// Renders a shared house-rule partial (content/rules/<property>/<name>.mdx)
// inside a manual. Same source file the property page's <HouseRules> renders,
// so rule prose has a single source of truth. Async server component — works
// with next-mdx-remote/rsc.
type SharedRuleProps = {
  name: string;
  property: string;
};

export default async function SharedRule({ name, property }: SharedRuleProps) {
  const content = await getRuleContent(property, name);
  return content;
}
