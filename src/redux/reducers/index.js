import { combineReducers } from "redux";
import mobiles from './mobile';
import cart from './cart';

export default combineReducers({
    mobiles,
    cart
})