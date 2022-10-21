
import { combineReducers } from "redux";

import busfees from './busfees';
import login from './login';
import year from './year';
import classs from './class';
import discount from './discount';
import fees from './fees';
import student  from "./student";
import payment from "./payment"

export default combineReducers ({ busfees, login, year, classs, discount, fees, student, payment });