"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <body>
      <h2 className="text-cyan-700 hover:text-cyan-400">
        Something went wrong!
      </h2>
      <button
        className="btn-active btn-primary"
        onClick={() => reset()}
      ></button>
    </body>
  );
}
