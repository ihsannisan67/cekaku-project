import { cn } from "@/lib/utils/cn"

function Progress({
  className,
  value,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { value?: number }) {
  return (
    <div
      className={cn("relative h-2 w-full overflow-hidden rounded-full bg-secondary", className)}
      {...props}
    >
      <div
        className="h-full bg-primary transition-all duration-300 ease-in-out"
        style={{ width: `${Math.min(Math.max(value || 0, 0), 100)}%` }}
      />
    </div>
  )
}

export { Progress }