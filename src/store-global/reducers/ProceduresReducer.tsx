import ProcedureInterface from '../../interfaces/ProcedureInterface'


type actionsTypes =
    | 'GET_PROCEDURES'
    | 'ADD_PROCEDURE'
    | 'DELETE_PROCEDURE'
    | 'UPDATE_PROCEDURE'

interface actionInterface {
    type: actionsTypes
    procedures: ProcedureInterface[]
}
const initialState: ProcedureInterface[] = []

export const proceduresActions: { [key: string]: actionsTypes } = {
    GET_PROCEDURES: 'GET_PROCEDURES',
    ADD_PROCEDURE: 'ADD_PROCEDURE',
    UPDATE_PROCEDURE: 'UPDATE_PROCEDURE',
    DELETE_PROCEDURE: 'DELETE_PROCEDURE',
}

const procedureReducer = (state = initialState, action: actionInterface) => {

    switch (action.type) {
        case 'GET_PROCEDURES':
            return [...action.procedures]
        case 'ADD_PROCEDURE':
            return [...state, action.procedures[0]]
        case 'UPDATE_PROCEDURE':
            const editedProcedureId: number = [...state].findIndex(
                (procedure) => procedure.Id === action.procedures[0].Id,
            )
            const editedStateCopy = [...state]
            editedStateCopy.splice(
                editedProcedureId,
                1,
                action.procedures[0],
            )
            return editedStateCopy
        case 'DELETE_PROCEDURE':
            return [
                ...state.filter(
                    (procedure) => procedure.Id !== action.procedures[0].Id,
                ),
            ]
        default:
            return state
    }
}

export default procedureReducer
