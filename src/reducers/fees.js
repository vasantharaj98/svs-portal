import { FETCHFEES, CREATEFEES, UPDATE, DELETE, LOADING, TOAST } from "../constants/actionTypes";

const initialstate = {
        fees : [],
        showLoading: false,
        successMessage: false,
        Message: '',
    };   


export default ( state = initialstate, action) => {
    switch (action.type) {
        case FETCHFEES :
            console.log("fees", action.payload);
            return  {
                ...state, 
                fees : action.payload.data.tuitionFeesList,
                successMessage: false,
                Message: action.payload.status, 
                showLoading: false } 
        case DELETE :
            return{
                ...state,
                fees : state.fees.filter((fees) => fees._id !== action.payload ),
                successMessage: true,
                showLoading: false,
                Message: "Fees deleted successfully",
            } 
        case CREATEFEES :
            console.log("createFees", action.payload);
                return {
                    ...state,
                    fees: [...state.fees, action.payload.data],
                    successMessage: true,
                    showLoading: false,
                    Message: action.payload.status,
                }
        case UPDATE :
                return {
                    ...state,
                    busfees : state.fees.map((fees) => fees._id === action.payload._id ? action.payload : fees ),
                    successMessage: true,
                    showLoading: false,
                    Message: "Fees updated successfully",
                }
        case LOADING :
                 return{
                    ...state,
                    showLoading : action.payload,
                } 
        case TOAST :
                    return{
                        ...state,
                        successMessage: action.payload,
                   }        
        default:
            return state;
    }
};









// import { FETCH, CREATE, UPDATE, DELETE, LOADING } from "../constants/actionTypes";

// const initialstate = {
//     busfees : [],
//     showLoading : false ,
// };


// export default ( state = initialstate, action) => {
//     switch (action.type) {
//         case DELETE :
//             return{
//                 ...state,
//                 busfees : state.busfees.filter((fees) => fees._id !== action.payload ),
//             }
                
//         case FETCH :
//             return{
//                 ...state,
//                 busfees : action.payload,
//             }
//         case CREATE :
//                 return{
//                     ...state,
//                     busfees : [...state.busfees, action.payload],
//                 } 
//         case UPDATE :
//             return{
//                 ...state,
//                 busfees : state.busfees.map((fees) => fees._id === action.payload._id ? action.payload : fees ),
//             } 
//         case LOADING :
//             return{
//                 ...state,
//                 showLoading : action.payload,
//             } 
//         default:
//             return state;
//     }
// };