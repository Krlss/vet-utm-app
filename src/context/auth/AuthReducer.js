import { GET_DATA_AUTH } from '../types';

export default (state, action) => {
    const { payload, type } = action;

    switch (type) {
        case GET_DATA_AUTH:
            return {
                ...state,
                user: payload,
            } 
        default: return state;
    }
}