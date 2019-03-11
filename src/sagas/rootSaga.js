/* eslint-disable no-constant-condition */

import {call, fork, put, select, take} from 'redux-saga/effects'
import {actionTypes as formActionTypes} from 'redux-form'
import Api from '../MockApi';
import { VIEW_STORE, VIEW_STORE_ID } from "../actionTypes";
import { selectStoreToView, selectStoreIdToView } from "../actionCreators";

export function* watchViewStoreDetail() {
    while (true) {
        const { storeId } = yield take(VIEW_STORE_ID);
        const selectedStore = yield call(Api.getStore, parseInt(storeId));
        yield put(selectStoreToView(selectedStore));
    }
}

export default function* rootSaga() {
    yield fork(watchViewStoreDetail);
}
