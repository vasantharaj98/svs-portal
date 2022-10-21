import * as api from '../api/api.js';
import { FETCHCLASS, CREATECLASS, UPDATE, DELETE, LOADING, TOAST } from '../constants/actionTypes.js';


export const getClass = () => async (dispatch) => {
    try {
        const {data} =await api.fetchClass();

        dispatch({ type : FETCHCLASS, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const postClass = (val) => async (dispatch) => {
    try {
        const {data } =await api.createClass(val);
        dispatch({ type : CREATECLASS, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const updateBusfees = (id, updatefees) => async (dispatch) => {
    try {

        // const { data } =await api.updateFees(id, updatefees);


        // dispatch({ type : UPDATE, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const deleteBusfees = ( id ) => async (dispatch) => {
    try {
        // await api.deleteFees(id);

        // dispatch({ type : DELETE , payload: id});
    } catch (error) {
        console.log(error);
    }
}

export const loading = (status) => async (dispatch) => {

    dispatch ({ type: LOADING, payload: status})
}

export const toast = (status) => async (dispatch) => {

    dispatch ({ type: TOAST, payload: status})
}