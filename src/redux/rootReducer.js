import { combineReducers } from "@reduxjs/toolkit";

import listData from './listReducer'



const rootReducer = combineReducers({listData});

export default rootReducer;