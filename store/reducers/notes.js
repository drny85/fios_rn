import { GET_NOTES, ERROR_NOTE, ADD_NOTE } from "../actions/notes";

const initialState = {
    notes: [],
    note: null,
    error: null
}

const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_NOTES:
            return {
                ...state,
                notes: [...action.payload]
            };

        case ERROR_NOTE:
            return {
                ...state,
                error: action.payload
            };
        case ADD_NOTE:
            return {
                ...state,
                error: null,
                notes: [action.payload, ...state.notes]
            }

        default:
            return state;
    }
}

export default notesReducer;