// Kriptografik olarak güvenli, tekrarsız rastgele sayı seçimi.
export function randomInt(min, max) {
  const range = max - min + 1
  const buf = new Uint32Array(1)
  const limit = Math.floor(0x100000000 / range) * range
  let x
  do {
    crypto.getRandomValues(buf)
    x = buf[0]
  } while (x >= limit)
  return min + (x % range)
}

export function pickUnique(count, min, max, exclude = []) {
  const picked = new Set()
  const ex = new Set(exclude)
  while (picked.size < count) {
    const n = randomInt(min, max)
    if (!ex.has(n)) picked.add(n)
  }
  return [...picked].sort((a, b) => a - b)
}
