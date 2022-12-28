
import { combineReducers } from "redux";
import * as homeReducers from '../../containers/Home/reducer';

// export default Object.assign(
//   {},
//   homeReducers
// );

const rootReducer = combineReducers({
  homeReducers : homeReducers.homeReducers
});

export default rootReducer;