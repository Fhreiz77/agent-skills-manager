import Link from "next/link";

export default function NotFound() {
  return (
    <section className="p-4 my-4 max-w-md mx-auto text-center border border-primary rounded-md">
      <h1>404 - Page Not Found </h1>
      <Link className="btn btn-outline mt-4" href={"/"}> Back to Home</Link>
    </section>
  );
}
 