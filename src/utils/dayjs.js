import dayjs from "dayjs";
import "dayjs/locale/fr.js";

dayjs.locale('fr')

export const getFrenchDateTimeWithoutTimeZone = (datetime) => {
    return dayjs(datetime).format('ddd DD MMM YYYY à HH:mm:ss')
}

export const getDateTimeWithoutTimeZone = (datetime) => {
    return dayjs(datetime).format('YYYY-MM-DD HH:mm:ss')
}
