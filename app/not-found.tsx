import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="text-center">
        <h1 className="text-3xl font-bold mb-4">
          404 - Page Not Found
        </h1>
        <p className="mb-6">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          aria-label="Return to home page"
          className="underline text-black hover:text-black"
        >
          Back to Home
        </Link>
      </main>
    </div>
  )
}
