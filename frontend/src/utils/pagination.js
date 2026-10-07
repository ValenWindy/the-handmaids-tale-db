// getPageItems(5, 10) → [1, '…', 4, 5, 6, '…', 10]
export function getPageItems(page, totalPages, siblings = 1) {
  const pages = new Set([1, totalPages])
  for (let p = page - siblings; p <= page + siblings; p++) {
    if (p >= 1 && p <= totalPages) pages.add(p)
  }

  const sorted = [...pages].sort((a, b) => a - b)
  const items = []
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) items.push('…')
    items.push(p)
  })
  return items
}
