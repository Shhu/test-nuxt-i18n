export default defineEventHandler((event) => {
  const { query } = getQuery(event)

  return `->whereHas('category', fn($q) => $q->whereIn('id', [${query || ''}])))`
})
