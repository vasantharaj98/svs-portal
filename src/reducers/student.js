import { FETCHSTUDENT, CREATESTUDENT, UPDATE, DELETE, LOADING, TOAST } from "../constants/actionTypes";

const initialstate = {
        data : [],
        showLoading: false,
        successMessage: false,
        Message: '',
    };   


export default ( state = initialstate, action) => {
    switch (action.type) {
        case FETCHSTUDENT :
            console.log("fetchStudent", action.payload);
            return  {
                ...state, 
                data : action.payload.data.studentResponseList,
                successMessage: false,
                Message: action.payload.status, 
                showLoading: false 
            } 
        case DELETE :
            return{
                ...state,
                data : state.data.filter((fees) => fees._id !== action.payload ),
                successMessage: true,
                showLoading: false,
                Message: "Busfees deleted successfully",
            } 
        case CREATESTUDENT :
            console.log("createstudent", action.payload);
                return {
                    ...state,
                    // data: [...state.data, action.payload.data],
                    successMessage: true,
                    showLoading: false,
                    Message: action.payload.stu,
                }
        case UPDATE :
                return {
                    ...state,
                    busfees : state.busfees.map((fees) => fees._id === action.payload._id ? action.payload : fees ),
                    successMessage: true,
                    showLoading: false,
                    Message: "Busfees updated successfully",
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