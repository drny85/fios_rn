import { GET_REFEREES, ERROR_REFEREE } from "../actions/referee";



const initialState = {
    referees: [],
    error: null,
    referee: null
}

const refereeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REFEREES:
            return {
                ...state,
                referees: [...action.payload]
            };
        case ERROR_REFEREE:
            return {
                ...state,
                error: action.payload
            }



        default:
            return state;
    }
}


export default refereeReducer;