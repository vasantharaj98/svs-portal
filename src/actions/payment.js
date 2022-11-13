import * as api from '../api/api.js';
import {VIEWSTUDENT, PAYMENT, LOADING, TOAST } from '../constants/actionTypes.js';

export const viewStudent = (sId, setView) => async (dispatch) => {
    try {
        const {data } =await api.viewStudent(sId);
        dispatch({ type : VIEWSTUDENT, payload: data});
        setView(true);
    } catch (error) {
        console.log(error);
    }
}

export const paymentStudent = (value) => async (dispatch) => {
    try {
        const {data } =await api.payStudent(value);
        data.year = value.year;
        dispatch({ type : PAYMENT, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const loading = (status) => async (dispatch) => {
    try {
        dispatch ({ type: LOADING, payload: status})
        
    } catch (error) {
        console.log(error);
    }
}

export const toast = (status) => async (dispatch) => {

    dispatch ({ type: TOAST, payload: status})
}