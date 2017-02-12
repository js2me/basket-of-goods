import {
    GET_CURRENCIES,
    GET_GOODS,
    UPDATE_BASE,
    UPDATE_SELECTED_GOODS,
    UPDATE_PAYMENT
} from '../constants/App'

const initialState = {
    currencies: [],
    base:'USD',
    goods:[],
    selectedGoods:[],
    payment:{},
    fetching: false,
    error:''
};

export default function game(state = initialState, action) {

    switch (action.type) {
        case GET_CURRENCIES:
            return {...state,currencies:action.payload, fetching: action.fetching || false, error: action.error || ''};
        case GET_GOODS:
            return {...state,goods:action.payload || state.goods,fetching: action.fetching || false};
        case UPDATE_BASE:
            return {...state,base:action.payload};
        case UPDATE_SELECTED_GOODS:
            return {...state,selectedGoods:action.payload};
        case UPDATE_PAYMENT:
            return {...state,payment:action.payload};
        default:
            return state;
    }

}
