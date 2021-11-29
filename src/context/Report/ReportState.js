import React, { useReducer } from "react";

import ReportContext from "./ReportContext";
import ReportReducer from "./ReportReducer";
import { initialState } from './initialState';

import { GET_DATA_ANIMAL_REPORT, GET_DATA_USER_REPORT } from "../types";

const ReportState = (props) => {

    const [state, dispatch] = useReducer(ReportReducer, initialState);

    const saveUSER = (data) => {

        try {
            dispatch({
                type: GET_DATA_USER_REPORT,
                payload: data,
            });
        } catch (error) {
            console.log(error);
        }
    }

    const savePET = (data) => {
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
                user_data: state.user,
                animal_data: state.pet,
                saveUSER,
                savePET,
            }}
        >
            {props.children}
        </ReportContext.Provider>
    )
}

export default ReportState;