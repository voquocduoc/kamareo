import { VIEW_STORE, VIEW_STORE_ID, UPDATE_STORE, UPLOAD_IMAGE } from "../actionTypes";

const defaultState = {
    selectedStore: null,
    image: null,
    storeId: null
};

export default function store(state = defaultState, action) {
    switch (action.type) {
        case VIEW_STORE:
            return {...state, selectedStore: action.selectedStore}
        case VIEW_STORE_ID:
            return Object.assign({}, state, {
                storeId: action.storeId
            })
        case UPDATE_STORE:
            return Object.assign({}, state, {
                products: [...state.selectedStore, action.selectedStore]
            })
        case UPLOAD_IMAGE:
            return Object.assign({}, state, {
                image: action.image
            })
        default:
            return state
    }
}
