import { takeLatest, call, put } from "redux-saga/effects";
import * as api from "../../APIs";
import * as actions from "../actions";

function* getDataMobileSaga() {
    try {
        const mobile = yield call(api.getDataMobile);
        yield put(actions.getDataMobile.getDataMobileSuccess(mobile.data));
    } catch (error) {
        yield put(actions.getDataMobile.getDataMobileFailure(error));
    }
}

function* mySaga() {
    yield takeLatest(actions.getDataMobile.getDataMobileRequest, getDataMobileSaga);
}
export default mySaga;