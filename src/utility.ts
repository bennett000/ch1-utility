/** assumes number is between 0 - 1 inclusive of 0 but not 1 */
export function createBetween(random: () => number) {
  return (minimum: number, maximum: number) => {
    const min = Math.ceil(minimum);
    const max = Math.floor(maximum);
    return Math.floor(random() * (max - min)) + min;
  };
}

export function noop() {}
