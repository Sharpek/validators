export const peselHelper = {
  validatePesel: (pesel: string): boolean => {
    if (isAnonymized(pesel)) {
      return true
    }
    const reg = /^[0-9]{11}$/
    if (!reg.test(pesel)) {
      return false
    }
    const parts = pesel.toString().split('').map((item) => parseInt(item, 10))
    const controlArr = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3]
    let control = controlArr.reduce((result, value, index) => result + value * parts[index], 0) % 10
    control = 10 - (control === 0 ? 10 : control)
    return parts[10] === control
  },
  getDateOfBirthFromPesel: (pesel: string): Date => {
    const peselArr = pesel.split('').map((x) => parseInt(x, 10))

    let year = 1900 + peselArr[0] * 10 + peselArr[1]
    if (peselArr[2] >= 2 && peselArr[2] < 8) {
      year += Math.floor(peselArr[2] / 2) * 100
    }
    if (peselArr[2] >= 8) {
      year -= 100
    }

    const month = (peselArr[2] % 2) * 10 + peselArr[3]
    const day = peselArr[4] * 10 + peselArr[5]

    return new Date(`${year}-${getFormatted(month)}-${getFormatted(day)}`)
  },
  peselNotUnder18: (pesel: string): boolean => {
    if (!pesel) {
      return false
    }

    if (isAnonymized(pesel)) {
      return true
    }
    const dateOfBirth = peselHelper.getDateOfBirthFromPesel(pesel)
    const age = dateOfBirth.getFullYear() - new Date().getFullYear()
    return age <= -18
  },
}

function isAnonymized(pesel: string): boolean {
  return /^[*]{11}$/.test(pesel)
}

function getFormatted(value: number): string {
  return value <= 9 ? `0${value}` : value.toString()
}
