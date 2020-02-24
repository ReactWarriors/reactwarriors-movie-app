const fromYear = 1950
const toYear = 2025
const getYears = (from, to) => {
  const yearsRange = []
  for (let i = from; i <= to; i++) {
    yearsRange.push(i)
  }
  return yearsRange
}

const years = getYears(fromYear, toYear)

export default years
