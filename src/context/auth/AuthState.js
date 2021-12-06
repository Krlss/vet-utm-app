import React, { useReducer } from "react";

import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import { initialState } from './initialState';

import { GET_DATA_AUTH } from "../types";

const ReportState = (props) => {

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const saveUSER = (data) => {

        try {
            dispatch({
                type: GET_DATA_AUTH,
                payload: data,
            });
        } catch (error) {
            console.log(error);
        }
    } 

    return (
        <AuthContext.Provider
            value={{
                user_data: state.user, 
                saveUSER, 
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default ReportState;