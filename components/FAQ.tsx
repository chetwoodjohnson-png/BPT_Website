interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
}

export default function FAQ({ items, title = "Frequently Asked Questions" }: FAQProps) {
  return (
    <>
      {/* FAQ HTML */}
      <section style={{ margin: "2em 0" }}>
        <h2>{title}</h2>
        <div>
          {items.map((item, index) => (
            <details key={index} style={{ marginBottom: "1em", border: "1px solid #ddd", padding: "1em", borderRadius: "4px" }}>
              <summary style={{ cursor: "pointer", fontWeight: "bold", color: "#0066cc" }}>
                {item.question}
              </summary>
              <p style={{ marginTop: "1em", color: "#333" }}>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />
    </>
  );
}
