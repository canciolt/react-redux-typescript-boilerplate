import { combineReducers } from 'redux';
import { AuthReducer, ErrorReducer, AdminReducer } from 'store/reducers/reducers';

export default combineReducers({
  auth: AuthReducer,
  error: ErrorReducer,
  user: AdminReducer
});
