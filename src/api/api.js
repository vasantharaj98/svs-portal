import axios from "axios";

export const url = process.env.REACT_APP_CONNECTION_URL;

const API = axios.create({ baseURL: url });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("login")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("login")).data.jwt
    }`;
  }

  return req;
});

export const signin = (data) => API.post(process.env.REACT_APP_LOGIN, data);
export const signout = () => API.put(process.env.REACT_APP_LOGOUT);

//year

export const newYear = (year) => API.post(process.env.REACT_APP_ADD_YEAR, year);
export const fetchYear = () => API.get(process.env.REACT_APP_FIND_ALL_YEAR);

// Busfees

export const fetchBusfees = (year) =>
  API.get(`${process.env.REACT_APP_FIND_ALL_BUS_FEES}${year}`);
export const createBusfees = (newfees) =>
  API.post(process.env.REACT_APP_ADD_BUS_FEES, newfees);
// export const updateFees = (id, updatefees) => axios.patch(`${url}/${id}`, updatefees);
// export const deleteFees = (id) => axios.delete(`${url}/${id}`);

// Class

export const fetchClass = () => API.get(process.env.REACT_APP_FIND_ALL_CLASS);
export const createClass = (val) =>
  API.post(process.env.REACT_APP_ADD_CLASS, val);

// Class

export const fetchDiscount = () =>
  API.get(process.env.REACT_APP_FIND_ALL_DISCOUNT);
export const createDiscount = (val) =>
  API.post(process.env.REACT_APP_ADD_DISOCUNT, val);

// Academic Fees

export const fetchFees = (year) =>
  API.get(`${process.env.REACT_APP_FIND_ALL_TUITION_FEES}${year}`);
export const createFees = (val) =>
  API.post(process.env.REACT_APP_ADD_TUITION_FEES, val);

// Student

export const fetchStudent = (val) =>
  API.post(process.env.REACT_APP_FIND_ALL_STUDENT, val);
export const createStudent = (val) =>
  API.post(process.env.REACT_APP_ADD_STUDENT, val);

// Payment
export const payStudent = (val) =>
  API.post(process.env.REACT_APP_ADD_FEES_PAYMENT, val);
export const viewStudent = (id) =>
  API.get(`${process.env.REACT_APP_FIND_ALL_STUDNET_DETAIL}${id}`);
export const prevPayStudent = (val) =>
  API.post(process.env.REACT_APP_PREV_FEES_PAYMENT, val);
  
