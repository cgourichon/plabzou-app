import dayjs from "dayjs";
import "dayjs/locale/fr.js";
import relativeTimePlugin from 'dayjs/plugin/relativeTime'
import updateLocalePlugin from 'dayjs/plugin/updateLocale'

dayjs.extend(relativeTimePlugin)
dayjs.extend(updateLocalePlugin)

dayjs.locale('fr')

export const getFrenchDateTimeWithoutTimeZone = (datetime) => {
    return dayjs(datetime).format('ddd DD MMM YYYY à HH:mm:ss')
}

export const getDateWithoutTimeZone = (datetime) => {
    return dayjs(datetime).format('YYYY-MM-DD')
}

export const getDateTimeWithoutTimeZone = (datetime) => {
    return dayjs(datetime).format('YYYY-MM-DD HH:mm:ss')
}

export const getDatetimeShortFormat = datetime => {
    return dayjs(datetime).format('DD/MM/YY à HH:mm');
}

export const getDatetimeShortFormatWithoutTime = datetime => {
    return dayjs(datetime).format('DD/MM/YY');
}

export const getTimeFromNow = datetime => {
    return dayjs(datetime).from(dayjs())
}
export const getFrenchDate = (date) => {
    return dayjs(date).format('ddd DD MMM YYYY')
}