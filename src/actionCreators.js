import {
   VIEW_STORE, VIEW_STORE_ID
} from "./actionTypes";

import { change } from 'redux-form';

export const selectStoreIdToView = (storeId) => {
    return {type: VIEW_STORE_ID, storeId};
};

export const selectStoreToView = (selectedStore) => {
    return {type: VIEW_STORE, selectedStore}
};
