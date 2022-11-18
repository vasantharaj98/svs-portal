import * as api from '../api/api.js';
import {VIEWSTUDENT, PAYMENT, LOADING, TOAST, PREVPAYMENT } from '../constants/actionTypes.js';

export const viewStudent = (sId) => async (dispatch) => {
    try {
        const {data } =await api.viewStudent(sId);
        dispatch({ type : VIEWSTUDENT, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const paymentStudent = (value) => async (dispatch) => {
    try {
        const {data } =await api.payStudent(value);
        data.stu = "vasa";
        dispatch({ type : PREVPAYMENT, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const prevPaymentStudent = (value) => async (dispatch) => {
    try {
        const {data } =await api.prevPayStudent(value);
        data.stu = "vasa";
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