import { GET_NOTES } from "../actions/notes";

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
            }



        default:
            return state;
    }
}

export default notesReducer;