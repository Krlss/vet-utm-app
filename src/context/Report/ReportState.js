import React, { useReducer } from "react";

import ReportContext from "./ReportContext";
import ReportReducer from "./ReportReducer";
import { initialState } from './initialState';

import { GET_DATA_ANIMAL_REPORT, GET_DATA_USER_REPORT } from "../types";

const ReportState = (props) => {

    const [state, dispatch] = useReducer(ReportReducer, initialState);

    const rsaveUSER = (data) => {

        try {
            dispatch({
                type: GET_DATA_USER_REPORT,
                payload: data,
            });
        } catch (error) {
            console.log(error);
        }
    }

    const rsavePET = (data) => {
        try {
            dispatch({
                type: GET_DATA_ANIMAL_REPORT,
                payload: { ...data, data },
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ReportContext.Provider
            value={{
                ruser_data: state.user,
                ranimal_data: state.pet,
                rsaveUSER,
                rsavePET,
            }}
        >
            {props.children}
        </ReportContext.Provider>
    )
}

export default ReportState;