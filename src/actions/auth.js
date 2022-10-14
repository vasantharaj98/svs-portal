import * as api from '../api/api.js';
import { AUTH, LOGOUT } from '../constants/actionTypes.js';

export const signIn = (value) => async(dispatch) => {
    try {

        const { data } = await api.signin(value);

        dispatch({ type : AUTH, payload: data});

    } catch (error) {
        console.log(error)
    }
}

export const signOut = () => async(dispatch) => {

    try {
        await api.signout();
        console.log("vasanth")

        dispatch({ type : LOGOUT});

    } catch (error) {
        console.log(error);
        console.log("vasantherror")
    }
}