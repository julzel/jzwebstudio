type DebouncedFunction<F extends (...args: any[]) => any> = (
  ...args: Parameters<F>
) => void;

function debounce<F extends (...args: any[]) => any>(
  func: F,
  wait: number,
  immediate?: boolean
): DebouncedFunction<F> {
  let timeout: ReturnType<typeof setTimeout> | null;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const context = this;

    const later = () => {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };

    const callNow = immediate && !timeout;
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);

    if (callNow) {
      func.apply(context, args);
    }
  } as DebouncedFunction<F>;
}

export { debounce };
