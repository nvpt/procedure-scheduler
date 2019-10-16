import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

import patientReducer from './reducers/PatientsReducer'
import procedureReducer from './reducers/ProceduresReducer'

export default combineReducers({
    routing: routerReducer,
    patients: patientReducer,
    procedures: procedureReducer,
})
