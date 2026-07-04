export function toNumber(val: unknown): number | null {
  if (val == null) return null
  if (typeof val === "number") return val
  if (typeof (val as { toNumber?: () => number }).toNumber === "function")
    return (val as { toNumber: () => number }).toNumber()
  return Number(val)
}
