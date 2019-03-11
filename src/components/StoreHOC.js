import React, {Component} from "react";
import {compose} from 'recompose';
import {connect} from "react-redux";

class StoreHOC extends Component {
    constructor(props) {
        super(props);
    }
}

const reduxStore = compose(
    connect(
        (state) => {
            return {
                selectedStore: state.storeReducer.selectedStore
            }
        },
        (dispatch) => {
            return {
                dispatch
            }
        }
    )
);

export default compose(
    reduxStore
)
