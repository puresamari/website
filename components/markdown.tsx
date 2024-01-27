import MD from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import theme from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';
import classNames from 'classnames';

export const Markdown = ({ children }: { children: string }) => {
  return (
    <MD
      remarkPlugins={[remarkGfm]}
      className="type-body-3 p-2 border-dashed"
      components={{
        h1: props => <h1 {...props} className=" type-body-1" />,
        h2: props => <h1 {...props} className=" type-body-2" />,
        h3: props => <h1 {...props} className=" type-body-3" />,
        ul: props => <ul {...props} className="pl-4 list-disc" />,
        ol: props => <ol {...props} className="pl-4 list-decimal" />,
        p: props => <div {...props} />,
        code(props) {
          const { children, className, node, ref, ...rest } = props;
          return (
            <SyntaxHighlighter
              {...rest}
              PreTag="pre"
              children={String(children)}
              // children={String(children).replace(/\n$/, '')}
              language={/language-(\w+)/.exec(className || '')?.[1]}
              style={theme}
            />
          );
        },
      }}
    >
      {children}
    </MD>
  );
};
