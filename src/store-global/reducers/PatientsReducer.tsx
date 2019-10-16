import PatientInterface from '../../interfaces/PatientInterface'

type actionsTypes =
    | 'GET_PATIENTS'
    | 'ADD_PATIENT'
    | 'DELETE_PATIENT'
    | 'UPDATE_PATIENT'

interface actionInterface {
    type: actionsTypes
    patients: PatientInterface[]
}
const initialState: PatientInterface[] = []

export const patientsActions: { [key: string]: actionsTypes } = {
    GET_PATIENTS: 'GET_PATIENTS',
    ADD_PATIENT: 'ADD_PATIENT',
    UPDATE_PATIENT: 'UPDATE_PATIENT',
    DELETE_PATIENT: 'DELETE_PATIENT',
}

const patientReducer = (state = initialState, action: actionInterface) => {

    switch (action.type) {
        case 'GET_PATIENTS':
            return [...action.patients]
        case 'ADD_PATIENT':
            return [...state, action.patients[0]]
        case 'UPDATE_PATIENT':
            const editedPatientId: number = [...state].findIndex(
                (patient) => patient.Id === action.patients[0].Id,
            )
            const editedStateCopy = [...state]
            editedStateCopy.splice(
                editedPatientId,
                1,
                action.patients[0],
            )
            return editedStateCopy
        case 'DELETE_PATIENT':
            return [
                ...state.filter(
                    (patient) => patient.Id !== action.patients[0].Id,
                ),
            ]
        default:
            return state
    }
}

export default patientReducer
