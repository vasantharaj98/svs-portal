import * as api from '../api/api.js';


export const getBusfees = () => async (dispatch) => {
    try {
        const {data} =await api.fetchBusfees();

        dispatch({ type : 'FETCH_ALL', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const postBusfees = (newfees) => async (dispatch) => {
    try {
        const {data} =await api.createBusfees(newfees);

        dispatch({ type : 'CREATE', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const updateBusfees = (id, updatefees) => async (dispatch) => {
    try {
        const {data} =await api.updateFees(id, updatefees);

        dispatch({ type : 'UPDATE', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}