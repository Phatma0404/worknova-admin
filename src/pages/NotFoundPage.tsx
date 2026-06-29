import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <p className="text-gray-500">Page not found</p>
      <Link to="/" className="text-sm underline underline-offset-4 hover:text-gray-900">
        Back to home
      </Link>
    </div>
  )
}
