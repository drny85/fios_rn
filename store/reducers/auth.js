import { LOGIN, ERROR, AUTO_LOGIN, LOGOUT} from '../actions/auth'


const initialState = {
    user: null,
    token: null,
    isAuth: false,
    error: null
}



const authReducer = (state= initialState, action) => {
    switch (action.type) {
        case LOGIN:
        case AUTO_LOGIN:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuth: true,
                error: null
            }
           
        case ERROR:
            return {
                user: null,
                token: null,
                isAuth: false,
                error: action.payload
            };
        case LOGOUT:
            return initialState;

        default:
            state;
    }
    return state
}

export default authReducer;