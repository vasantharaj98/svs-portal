import axios from 'axios';

// const url = 'http://localhost:5000/busfees';

const url = 'https://svs-school.herokuapp.com/busfees';

export const fetchBusfees = () => axios.get(url);
export const createBusfees = (newfees) => axios.post(url, newfees);
export const updateFees = (id, updatefees) => axios.patch(`${url}/${id}`, updatefees);
export const deleteFees = (id) => axios.delete(`${url}/${id}`);