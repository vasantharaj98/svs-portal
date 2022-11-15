import { AUTH, LOGOUT } from "../constants/actionTypes";

export default(state = {authData: null}, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem("login", JSON.stringify({...action?.payload}));
            return{...state, authData: action?.payload };
        case "LOGGEDIN":
                return{...state, authData: JSON.parse(localStorage.getItem("login")) };
        case LOGOUT:
            localStorage.clear();
            return{...state, authData: null };
        case "UNAUTHORIZED":
            localStorage.clear();
            return{...state, authData: null };
        default:
            return state;
    }
}