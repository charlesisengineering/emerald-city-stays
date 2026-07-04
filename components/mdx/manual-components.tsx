import ManualImage from './ManualImage';
import WiFiInfo from './WiFiInfo';
import SharedRule from './SharedRule';
import { MDXComponents } from 'mdx/types';

// Creates MDX component overrides with the property slug baked in.
// This way the MDX content can just write <ManualImage name="parking" />
// without needing to pass the property name every time.
export function getManualComponents(property: string): MDXComponents {
  return {
    ManualImage: (props: { name: string; className?: string }) => (
      <ManualImage {...props} property={property} />
    ),
    WiFiInfo: () => <WiFiInfo property={property} />,
    SharedRule: (props: { name: string }) => (
      <SharedRule {...props} property={property} />
    ),
  };
}
