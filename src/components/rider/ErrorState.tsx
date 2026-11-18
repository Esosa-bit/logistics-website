import { AlertMessage } from '../ui/AlertMessage'
import { Button } from '../ui/button'

type Props = { message?: string; onRetry?: () => void }

export function ErrorState({ message = 'Something went wrong while loading this data.', onRetry }: Props) {
  return (
    <AlertMessage variant="error" title="We hit a problem">
      <p>{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry} className="mt-3">
          Try again
        </Button>
      )}
    </AlertMessage>
  )
}