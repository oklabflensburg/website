export function paginate<T>(items: T[], requestedPage: unknown, size = 6) {
  if (!Number.isInteger(size) || size < 1)
    throw new RangeError('Page size must be a positive integer')
  const parsed =
    typeof requestedPage === 'string' && /^\d+$/.test(requestedPage)
      ? Number(requestedPage)
      : 1
  const totalPages = Math.max(1, Math.ceil(items.length / size))
  const page = Math.min(
    totalPages,
    Math.max(1, Number.isSafeInteger(parsed) ? parsed : 1),
  )
  return {
    items: items.slice((page - 1) * size, page * size),
    page,
    totalPages,
  }
}
