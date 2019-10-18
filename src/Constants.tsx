import MenuItemInterface from './interfaces/MenuItemInterface'

export const MENU: { [key: string]: MenuItemInterface } = {
    HOME: {
        LINK: '/',
        LABEL: 'Home',
    },
    DOCTORS: {
        LINK: '/doctors',
        LABEL: 'Doctors',
    },
    PATIENTS: {
        LINK: '/patients',
        LABEL: 'Patients',
    },
    PROCEDURES: {
        LINK: '/procedures',
        LABEL: 'Procedures',
    },
    ROOMS: {
        LINK: '/rooms',
        LABEL: 'Rooms',
    },
}

export const WORK_TIME = {
    MIN: "9:00",
    MAX: "20:00"
}

