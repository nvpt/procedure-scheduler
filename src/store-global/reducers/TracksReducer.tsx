const initialState: any[] = [

];

export const playlistActions = {
    ADD_TRACK: 'ADD_TRACK',
    DELETE_TRACK: 'DELETE_TRACK'
};

function tracksReducer(state = initialState, action: any) {
    switch (action.type) {
        case playlistActions.ADD_TRACK:
            return [...state, action.track];
        case playlistActions.DELETE_TRACK:
            return [...state.filter(value => value.id !== action.track.id)];
        default:
            return state;
    }

    

}

export default tracksReducer;
