import React, { useReducer } from "react";
import axios from "axios";

import ComprasCajaContext from "./ComprasCajaContext";
import ComprasCajaReducer from "./ComprasCajaReducer";


import { GET_RUC, GET_Productos } from "../types";

const ComprasCajaState = (props) => {
  const initialState = {
    ruc: [],
    selectedProductos: null,
  };

  const [state, dispatch] = useReducer(ComprasCajaReducer, initialState);

  const getRUC = async () => {
    try {
      const res = await axios.get("https://reqres.in/api/users");
      const data = res.data.data;
      dispatch({ type: GET_RUC, payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  const getProductos = async (id) => {
    try {
      const res = await axios.get("https://reqres.in/api/users/" + id);
      const { data }= res;
      dispatch({ type: GET_Productos, payload: data.data });
    } catch (error) {}
  };

  return (
    <ComprasCajaContext.Provider
      value={{
        ruc: state.ruc,
        selectedProductos: state.selectedProductos,
        getRUC,
        getProductos,
      }}
    >
      {props.children}
    </ComprasCajaContext.Provider>
  );
};

export default ComprasCajaState;