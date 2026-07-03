import React from 'react';
import { renderSchemaTags } from '@/libs/seo';

type ManualLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export default function ManualLayout({ title, children }: ManualLayoutProps) {
  return (
    <>
      {renderSchemaTags()}
      <main data-theme="mybrand">
        <div className="flex bg-base-100 max-w-screen-lg mx-auto p-4 lg:p-10">
          <article className="prose max-w-none lg:prose-l">
            <h1>{title}</h1>
            {children}
          </article>
        </div>
      </main>
    </>
  );
}
