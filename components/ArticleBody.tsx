import { Fragment } from "react";
function inline(text: string) {
  return text
    .split(/(\[[^\]]+\]\((?:https:\/\/|\/)[^\s)]+\)|https:\/\/[^\s<>]+)/g)
    .map((part, i) => {
      const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      const href = match?.[2] || (part.startsWith("https://") ? part : null);
      return href ? (
        <a
          key={i}
          href={href}
          rel={href.startsWith("https://") ? "noopener noreferrer" : undefined}
        >
          {match?.[1] || part}
        </a>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      );
    });
}
// React escapes text; raw HTML and non-HTTPS external links are never executed.
export default function ArticleBody({ text }: { text: string }) {
  return (
    <div className="articleBody">
      {text.split(/\n\s*\n/).map((block, i) =>
        block.startsWith("## ") ? (
          <h2 key={i}>{inline(block.slice(3))}</h2>
        ) : block.startsWith("### ") ? (
          <h3 key={i}>{inline(block.slice(4))}</h3>
        ) : block.split("\n").every((line) => line.startsWith("- ")) ? (
          <ul key={i}>
            {block.split("\n").map((line, j) => (
              <li key={j}>{inline(line.slice(2))}</li>
            ))}
          </ul>
        ) : (
          <p key={i} style={{ whiteSpace: "pre-wrap" }}>
            {inline(block)}
          </p>
        ),
      )}
    </div>
  );
}
