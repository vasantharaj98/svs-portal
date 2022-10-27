import axios from 'axios';

export const url = 'http://43.205.97.103';

const API = axios.create({baseURL : url});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('login')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('login')).data.jwt}`;
    }

    return req;
});

export const signin = (data) => API.post('/login', data);
export const signout = () => API.put('/logoutUser');

//year

export const newYear = (year) => API.post('/api/academicYears/addYear', year);
export const fetchYear = () => API.get('/api/academicYears/findAll');

// Busfees

export const fetchBusfees = (year) => API.get(`/api/busFees/findAll/${year}`);
export const createBusfees = (newfees) => API.post('/api/busFees/addBusFees', newfees);
// export const updateFees = (id, updatefees) => axios.patch(`${url}/${id}`, updatefees);
// export const deleteFees = (id) => axios.delete(`${url}/${id}`);

// Class

export const fetchClass = () => API.get('/api/classSections/findAll');
export const createClass = (val) => API.post('/api/classSections/addClassSection', val);

// Class

export const fetchDiscount = () => API.get('/api/discount/findAll');
export const createDiscount = (val) => API.post('/api/discount/add', val);

// Academic Fees

export const fetchFees = (year) => API.get(`/api/tuitionFees/findAll/${year}`);
export const createFees = (val) => API.post('/api/tuitionFees/addTuitionFees', val);

// Student

export const fetchStudent = (val) => API.post('/api/studentList', val);
export const createStudent = (val) => API.post('/api/addStudentDetail', val);

// Payment
export const payStudent = (val) => API.post('/api/feesPayment/add', val);
export const viewStudent = (id) => API.get(`/api/feesPayment/getAllStudentDetail/${id}`);

