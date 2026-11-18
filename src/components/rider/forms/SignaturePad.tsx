import { useRef, type PointerEvent as ReactPointerEvent } from 'react'
import { Eraser } from 'lucide-react'
import { Button } from '../../ui/button'

// Called with the drawing (a PNG data URL) when the rider lifts their finger,
// and with null when they clear the pad.
type Props = { onChange: (dataUrl: string | null) => void }

export function SignaturePad({ onChange }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null) // the <canvas> element
  const drawing = useRef(false) // is the pointer currently down?

  // Converts the pointer position on the screen into a position on the canvas.
  // The canvas is 600x200 inside, but CSS can stretch it, so we scale.
  const getPoint = (e: ReactPointerEvent<HTMLCanvasElement>, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect()
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    }
  }

  const start = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    drawing.current = true
    const { x, y } = getPoint(e, canvas)
    ctx.beginPath()
    ctx.moveTo(x, y)
    canvas.setPointerCapture(e.pointerId) // keep receiving moves if the pointer leaves
  }

  const move = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const { x, y } = getPoint(e, canvas)
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#0b2545' // your navy-900. Canvas can't read Tailwind classes, so we use the hex.
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const end = () => {
    if (!drawing.current || !canvasRef.current) return
    drawing.current = false
    onChange(canvasRef.current.toDataURL('image/png'))
  }

  const clear = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height)
    onChange(null)
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={600}
        height={200}
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={end}
        onPointerLeave={end}
        aria-label="Signature drawing area. Draw the recipient's signature with a finger or mouse."
        className="h-40 w-full touch-none rounded-xl border-2 border-dashed border-ink-200 bg-white"
      />
      <Button variant="secondary" onClick={clear} className="mt-2 px-3 py-1.5 text-sm">
        <Eraser aria-hidden="true" className="size-4" /> Clear signature
      </Button>
    </div>
  )
}