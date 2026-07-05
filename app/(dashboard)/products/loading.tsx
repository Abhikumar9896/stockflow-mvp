export default function ProductsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <div className="h-7 w-28 rounded-md bg-muted" />
          <div className="h-4 w-40 rounded-md bg-muted" />
        </div>
        <div className="h-9 w-32 rounded-lg bg-muted" />
      </div>
      <div className="h-10 w-full max-w-sm rounded-lg bg-muted" />
      <div className="rounded-lg border">
        <div className="p-4 border-b bg-muted/50">
          <div className="flex gap-4">
            <div className="h-4 w-24 rounded bg-muted-foreground/20" />
            <div className="h-4 w-16 rounded bg-muted-foreground/20" />
            <div className="h-4 w-20 rounded bg-muted-foreground/20 ml-auto" />
            <div className="h-4 w-24 rounded bg-muted-foreground/20" />
            <div className="h-4 w-20 rounded bg-muted-foreground/20" />
            <div className="h-4 w-12 rounded bg-muted-foreground/20" />
          </div>
        </div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-4 p-4 border-b last:border-b-0">
            <div className="h-4 w-32 rounded bg-muted" />
            <div className="h-4 w-20 rounded bg-muted" />
            <div className="h-4 w-12 rounded bg-muted ml-auto" />
            <div className="h-4 w-16 rounded bg-muted" />
            <div className="h-5 w-20 rounded-full bg-muted" />
            <div className="flex gap-1">
              <div className="size-7 rounded bg-muted" />
              <div className="size-7 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
