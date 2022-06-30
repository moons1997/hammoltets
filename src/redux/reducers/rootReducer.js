import { combineReducers } from "redux";
// import paginationReducer from "./filters";
import filtersReducer from "./filters/";
import servicesApiReducer from "./servicesapi/";

const rootReducer = combineReducers({
  filters: filtersReducer,
  servicesApi: servicesApiReducer,
});

export default rootReducer;
