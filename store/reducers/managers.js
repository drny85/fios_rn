import { GET_MANAGERS, ERROR_MANAGERS } from "../actions/managers";


const initialState = {
    managers: [],
    manager: null,
    error: null
}

const managersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MANAGERS:
            return {
                ...state,
                managers: [...action.payload]
            };
        case ERROR_MANAGERS:
            return {
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}

export default managersReducer;