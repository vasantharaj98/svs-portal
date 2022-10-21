import * as api from '../api/api.js';
import { FETCH, CREATE, ERROR, UPDATE, DELETE, LOADING, TOAST } from '../constants/yearTypes.js';


export const getYear = () => async (dispatch) => {
    try {
        const {data} =await api.fetchYear();

        dispatch({ type : FETCH, payload: data});
    } catch (err) {
        console.log(err);
    }
}

export const postYear = (year) => async (dispatch) => {
    try {
        const { data } =await api.newYear(year);

        dispatch({ type : "CREATE_YEAR", payload: data});

    } catch (err) {
        console.log(err);
        dispatch({ type : ERROR, payload: err});
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