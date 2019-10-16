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
    ADD_PATIENT: 'ADD_PATIENT',
    DELETE_PATIENT: 'DELETE_PATIENT',
    UPDATE_PATIENT: 'UPDATE_PATIENT',
    GET_PATIENTS: 'GET_PATIENTS',
}

const patientReducer = (state = initialState, action: actionInterface) => {
    switch (action.type) {
        case 'GET_PATIENTS':
            return [...action.patients]
        case 'ADD_PATIENT':
            return [...state, action.patients[0]]
        case 'DELETE_PATIENT':
            return [
                ...state.filter(
                    (patient) => patient.Id !== action.patients[0].Id,
                ),
            ]
        case 'UPDATE_PATIENT':
            const editedPatient: PatientInterface = [...state].find(
                (patient) => patient.Id === action.patients[0].Id,
            ) as PatientInterface
            return [...state.splice(editedPatient.Id, 1, action.patients[0])]
        default:
            return state
    }
}

export default patientReducer
