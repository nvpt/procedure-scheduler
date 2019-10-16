import tracksReducer from './reducers/TracksReducer';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    routing: routerReducer,
    tracks: tracksReducer
});
