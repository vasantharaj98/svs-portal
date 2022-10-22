/* eslint-disable import/no-anonymous-default-export */
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
            const year1 = action.payload.year;
            let studentBatchResponseMap = { ...state.data.studentBatchResponseMap };
            studentBatchResponseMap[year1].feesPaymentTableHistory.push(
              action.payload.data.objectList
            );
            studentBatchResponseMap[year1].paymentInputOptions = {...action.payload.data.paymentInputOptions};
            return {
                ...state
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

