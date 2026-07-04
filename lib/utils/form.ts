import { zodResolver } from "@hookform/resolvers/zod"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createResolver(schema: any): any {
  return zodResolver(schema)
}
