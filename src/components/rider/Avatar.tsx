import { cn } from '../../lib/cn'

type Props = {
  name?: string
  src?: string | null
  sizeClass?: string // for example "size-10"
  textClass?: string
}

export function Avatar({ name = 'Rider', src, sizeClass = 'size-10', textClass = 'text-sm' }: Props) {
  // "Chukwuemeka Johnson" -> ["Chukwuemeka", "Johnson"] -> "CJ"
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  if (src) {
    // alt="" because the rider's name is always written next to the picture
    return <img src={src} alt="" className={cn(sizeClass, 'shrink-0 rounded-full object-cover')} />
  }
  return (
    <span
      aria-hidden="true"
      className={cn(
        sizeClass,
        textClass,
        'flex shrink-0 items-center justify-center rounded-full bg-orange-600 font-semibold text-white',
      )}
    >
      {initials}
    </span>
  )
}