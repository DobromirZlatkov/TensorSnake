import actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

const loadingReducer = (state = initialState.isLoading, action) => {
    switch (action.type) {
        case actionTypes.SET_LOADING:
            return action.payload;
        default:
            return state;
    }
};

export default loadingReducer