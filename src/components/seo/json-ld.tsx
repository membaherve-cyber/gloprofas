/**
 * Server-rendered JSON-LD.
 * Data is our own (never user input); `<` is escaped so a stray
 * "</script>" inside content cannot break out of the tag.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
