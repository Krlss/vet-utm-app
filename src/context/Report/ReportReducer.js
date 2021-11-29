import { GET_DATA_ANIMAL_REPORT, GET_DATA_USER_REPORT } from '../types';

export default (state, action) => {
    const { payload, type } = action;

    switch (type) {
        case GET_DATA_USER_REPORT:
            return {
                ...state,
                user: payload,
            }
        case GET_DATA_ANIMAL_REPORT:
            return {
                ...state,
                pet: payload
            }
        default: return state;
    }
}