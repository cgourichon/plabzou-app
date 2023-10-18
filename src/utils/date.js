import dayjs from 'dayjs'

import 'dayjs/locale/fr.js'

import weekOfYearPlugin from 'dayjs/plugin/weekOfYear'
import relativeTimePlugin from 'dayjs/plugin/relativeTime'
import updateLocalePlugin from 'dayjs/plugin/updateLocale'

dayjs.extend(weekOfYearPlugin)
dayjs.extend(relativeTimePlugin)
dayjs.extend(updateLocalePlugin)



dayjs.locale('fr')
dayjs.updateLocale('fr', {
    relativeTime: {
        future: "dans %s",
        past: "Il y a %s",
        s: 'quelques secondes',
        m: "une minute",
        mm: "%d minutes",
        h: "une heure",
        hh: "%d heures",
        d: "un jour",
        dd: "%d jours",
        M: "un mois",
        MM: "%d mois",
        y: "un an",
        yy: "%d ans"
    }
})

export const getFrenchDateWithoutYear = (date) => {
    return dayjs(date).format('ddd DD MMM')
}

export const getFrenchDate = (date) => {
    return dayjs(date).format('ddd DD MMM YYYY')
}

export const getFrenchDateTime = (datetime) => {
    return dayjs(datetime).format('ddd DD MMM YYYY à HH:mm:ss')
}

export const getFrenchDateTimeWithoutDay = (datetime) => {
    return dayjs(datetime).format('DD MMM YYYY à HH:mm:ss')
}

export const getCurrentDateTime = () => {
    return dayjs().format('YYYY-MM-DD HH:mm')
}

export const setDateTime = (datetime) => {
    return dayjs(datetime).format('YYYY-MM-DD HH:mm')
}

export const getDayJsDate = (date) => {
    return dayjs(date)
}

export const getCurrentWeekOfYear = () => {
    const now = dayjs()
    const year = now.year()
    let week = now.week()

    if (week < 10) {
        week = `0${week}`
    }

    return `${year}-W${week}`
}

export const getYearFromWeekOfYear = (weekOfYear) => {
    return weekOfYear.substring(0, 4)
}

export const getWeekFromWeekOfYear = (weekOfYear) => {
    return weekOfYear.substring(weekOfYear.indexOf('W') + 1)
}

export const getDateFromWeekOfYear = (weekOfYear) => {
    const year = getYearFromWeekOfYear(weekOfYear)
    const week = getWeekFromWeekOfYear(weekOfYear)

    return dayjs().week(week).year(year).startOf('week').format('YYYY-MM-DD')
}

export const getTimeFromNow = (datetime) => {
    return dayjs(datetime).from(dayjs())
}
