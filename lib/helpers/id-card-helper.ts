import moment from 'moment'

const plus100years = () => moment().add(100, 'years')
const minus100years = () => moment().subtract(100, 'years')

export const idCardHelper = {
  validateExpiryDate: (date: string): boolean => (
    moment().isSameOrBefore(date, 'day')
    && moment(date).isBefore(plus100years(), 'day')
  ),
  validateReleaseDate: (date: string, idCardExpiryDate: string): boolean => (
    moment(date).isSameOrBefore(moment(), 'day')
    && moment(date).isAfter(minus100years(), 'day')
    && (idCardExpiryDate ? moment(date).isBefore(idCardExpiryDate, 'day') : true)
  ),
}
