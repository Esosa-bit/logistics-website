import { Link } from 'react-router-dom'
import { PageContainer } from '../components/layout/PageContainer'
import { ROUTES } from '../lib/routes'

export default function NotFound() {
  return (
    <PageContainer>
      <h1 className="text-3xl font-semibold sm:text-4xl">Page not found</h1>
      <p className="mt-3 max-w-prose">
        The address you typed does not match a page. Check the link, or{' '}
        <Link to={ROUTES.home} className="font-medium text-navy-700 underline">
          go to the home page
        </Link>
        .
      </p>
    </PageContainer>
  )
}