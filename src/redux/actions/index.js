import { createActions } from "redux-actions";

export const getType = (reduxAction) => {
    return reduxAction().type;
}

export const getDataMobile = createActions({
    getDataMobileRequest: undefined,
    getDataMobileSuccess: (payload) => payload,
    getDataMobileFailure: (err) => err
})