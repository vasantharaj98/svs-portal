import * as api from '../api/api.js';
import { FETCH, CREATE, UPDATE, DELETE } from '../constants/actionTypes.js';


export const getBusfees = () => async (dispatch) => {
    try {
        const {data} =await api.fetchBusfees();

        dispatch({ type : FETCH, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const postBusfees = (newfees) => async (dispatch) => {
    try {
        const {data } =await api.createBusfees(newfees);
        dispatch({ type : CREATE, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const updateBusfees = (id, updatefees) => async (dispatch) => {
    try {
        console.log ("updatefees",updatefees);

        const { data } =await api.updateFees(id, updatefees);

        console.log ( data );

        dispatch({ type : UPDATE, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const deleteBusfees = ( id ) => async (dispatch) => {
    try {
        await api.deleteFees(id);

        dispatch({ type : DELETE , payload: id});
    } catch (error) {
        console.log(error);
    }
}