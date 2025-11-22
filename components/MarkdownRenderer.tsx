
import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="prose prose-sm prose-slate max-w-none dark:prose-invert">
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => <h1 className="text-xl font-bold text-ref-blue dark:text-blue-400 mb-2 mt-4" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mt-4 mb-2" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-md font-semibold text-slate-700 dark:text-slate-200 mt-3 mb-1" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc pl-5 my-2 space-y-1 text-slate-700 dark:text-slate-300" {...props} />,
          li: ({ node, ...props }) => <li className="text-slate-700 dark:text-slate-300 leading-relaxed" {...props} />,
          strong: ({ node, ...props }) => <strong className="font-semibold text-slate-900 dark:text-white" {...props} />,
          p: ({ node, ...props }) => <p className="mb-2 text-slate-700 dark:text-slate-300 leading-relaxed" {...props} />,
          code: ({ node, className, children, ...props }: any) => {
            return (
              <code className="bg-slate-100 dark:bg-slate-800 text-pink-600 dark:text-pink-400 rounded px-1 py-0.5 text-sm font-mono" {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
