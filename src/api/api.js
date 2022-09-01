import axios from 'axios';

const url = 'http://localhost:5000/busfees';

export const fetchBusfees = () => axios.get(url);
export const createBusfees = (newfees) => axios.post(url, newfees);