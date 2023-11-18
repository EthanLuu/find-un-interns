export function throttle(fn: (...args: any[]) => void, delay = 100) {
  let previous = 0
  let timer: NodeJS.Timer | null = null

  return function (this: unknown) {
    const now = Date.now()
    const remaining = delay - (now - previous)
    const args = arguments
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      previous = now
      fn.apply(this, args as any)
    } else if (!timer) {
      timer = setTimeout(() => {
        timer = null
        previous = Date.now()
        fn.apply(this, args as any)
      }, remaining)
    }
  }
}
