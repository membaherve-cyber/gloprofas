import { notFound } from "next/navigation";

export default function StyleguidePage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <main className="section container"><h1>Styleguide</h1><p>Available in development only.</p></main>;
}
