import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import patientReducer from './reducers/PatientsReducer'

export default combineReducers({
    routing: routerReducer,
    patients: patientReducer
});
