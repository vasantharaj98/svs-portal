import { FETCH, CREATE, UPDATE, DELETE } from "../constants/actionTypes";


export default ( busfees = [], action) => {
    switch (action.type) {
        case DELETE :
            return busfees.filter((fees) => fees._id !== action.payload );
        case FETCH :
            return action.payload;
        case CREATE :
                return [...busfees, action.payload];
        case UPDATE :
                return busfees.map((fees) => fees._id === action.payload._id ? action.payload : fees );
        default:
            return busfees;
    }
};