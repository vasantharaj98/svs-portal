import axios from 'axios';

// const url = 'http://localhost:5000/busfees';

const API = axios.create({baseURL : "http://3.110.146.2"});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('login')){
        console.log()
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('login')).data.jwt}`;
    }

    return req;
});

export const signin = (data) => API.post('/login', data);
export const signout = () => API.put('/logout');

// const url = 'https://svs-school.herokuapp.com/busfees';

// export const fetchBusfees = () => axios.get(url);
// export const createBusfees = (newfees) => axios.post(url, newfees);
// export const updateFees = (id, updatefees) => axios.patch(`${url}/${id}`, updatefees);
// export const deleteFees = (id) => axios.delete(`${url}/${id}`);