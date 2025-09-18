import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="h-screen overflow-hidden bg-white flex flex-col justify-center items-center p-2">
      <main className="text-center">
        <h1 className="text-black font-times mb-2" style={{ fontSize: '12pt' }}>
          404 - Page Not Found
        </h1>
        <p className="text-black font-times mb-2" style={{ fontSize: '12pt' }}>
          The page you are looking for does not exist.
        </p>
        <Link 
          href="/" 
          className="text-black font-times underline"
          style={{ fontSize: '12pt' }}
          aria-label="Return to home page"
        >
          Back to Home
        </Link>
      </main>
    </div>
  )
}
