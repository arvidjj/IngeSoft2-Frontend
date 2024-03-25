import { GET_RUC, GET_Productos } from '../types.jsx';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_RUC:
      return {
        ...state,
        ruc: payload,
      };
    case GET_Productos:
      return {
        ...state,
        selectedProductos: payload,
      };
    default:
      return state;
  }
};