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

export const getDateTimeWithoutTimeZone = (datetime) => {
    return dayjs(datetime).format('YYYY-MM-DD HH:mm:ss')
}

export const getTimeFromNow = datetime => {
    return dayjs(datetime).from(dayjs())
}