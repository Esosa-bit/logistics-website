import { PageContainer } from '../components/layout/PageContainer'

// Temporary stand-in. The teammate who owns the page replaces the route element in App.tsx.
export default function TeammatePlaceholder({ pageName }: { pageName: string }) {
  return (
    <PageContainer>
      <h1 className="text-3xl font-semibold sm:text-4xl">{pageName}</h1>
      <p className="mt-3 max-w-prose">This page is being built by another team member.</p>
    </PageContainer>
  )
}