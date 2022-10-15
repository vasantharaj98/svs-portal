import axios from 'axios';

export const url = 'http://3.6.205.152';

const API = axios.create({baseURL : url});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('login')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('login')).data.jwt}`;
    }

    return req;
});

export const signin = (data) => API.post('/login', data);
export const signout = () => API.put('/logoutUser');

// Busfees

// export const fetchBusfees = () => axios.get(url);
export const createBusfees = (newfees) => API.post('/busFees/addBusFees', newfees);
// export const updateFees = (id, updatefees) => axios.patch(`${url}/${id}`, updatefees);
// export const deleteFees = (id) => axios.delete(`${url}/${id}`);