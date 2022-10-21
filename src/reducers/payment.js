import { VIEWSTUDENT, PAYMENT,  LOADING, TOAST } from "../constants/actionTypes";

const initialstate = {
        data : [],
        showLoading: true,
        successMessage: false,
        Message: '',
    };   


export default ( state = initialstate, action) => {
    switch (action.type) {
        case VIEWSTUDENT :
            return  {
                ...state, 
                data : action.payload.data,
                successMessage: false,
                Message: action.payload.status, 
                showLoading: false 
            } 
        case PAYMENT :
            console.log("apyemtpyr", action.payload);
            return {
                ...state,
                // data: state.data.studentBatchResponseList.map((vasa)=>
                // vasa.batch == "2022"
                // ? [
                //     ...vasa,
                //     vasa.feesPaymentTableHistory.push(action.payload.data.objectList), 
                //     action.payload.data.paymentInputOption
                // ]
                // : vasa
                // ),
            }
        case LOADING :
            console.log("status", action.payload);
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

