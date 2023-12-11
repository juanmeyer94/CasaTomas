import * as ActionTypes from "./actions-types"
import axios from "./axios"
import { useNavigate } from 'react-router-dom';

export const getAllItems = (data) => {
  return {
    type: ActionTypes.GET_ALL_ITEMS,
    payload: [data],
  };
};


export const filterItems = (filters) => {
  return {
    type: ActionTypes.FILTER_ITEMS,
    payload: filters,
  };
};

export const filterFilteredItems = (filters) => {
  return {
    type: ActionTypes.FILTER_FILTERED_ITEMS,
    payload: filters,
  };
};
  

export const loginUser = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:3001/api/login", userData);

      dispatch({
        type: ActionTypes.LOGIN_USER_SUCCESS,
        payload: response.data,
      });

      dispatch({
        type: ActionTypes.SET_LOGGED_IN,
        payload: true,
      });

      return response.data; 

    } catch (error) {
    
      throw error;
    }
  };
};


export const logoutUser = () => {

  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:3001/api/logout");
      dispatch({
        type: ActionTypes.LOGOUT_USER,
        payload: false
      })
    } catch (error) {

    }
  }
};

export const registerUser = async (user) => {
  try {
    const response = await axios.post("http://localhost:3001/api/register", user);
    return response; 
  } catch (error) {
    throw error;
  }
};

export const newItem = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:3001/api/items", data);
      return response
    } catch (error) {
    
      console.error("Error al crear un nuevo item:", error);
    }
  };
};


export const verifyTokenRequest = () => axios.get("/verify")


export const getAllItemsBdd = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/items");
      dispatch({
        type: ActionTypes.GET_ALL_ITEMS,
        payload: response.data,
      });
    } catch (error) {
      console.log("no anda pa");
    }
  };
};

export const getItemById = async (id) => {
  
    try {
      const response = await axios.get(`/items/${id}`);
      return response
    } catch (error) {
      res.status(400).json({message:"Id no encontrado"})
    }
  
};

export const deleteItemById2 = async (id) => {
  
  try {
    const response = await axios.delete(`/items/${id}`);
    return response
  } catch (error) {
    res.status(400).json({message:"Id no encontrado"})
  }

};



export const updatedItem = async (id, data) => {
  
  try {
    const response = await axios.put(`/items/${id}`, data);
    return response
  } catch (error) {
    res.status(400).json({message:"Id no encontrado"})
  }

};


export const addToCart = (data, quantity = 1) => {
  
  return (dispatch) => {
      dispatch({
          type: ActionTypes.ADD_CART,
          payload: { ...data, quantity }, 
      });
  };
};


export const changeQuantity = (productId, number) => ({
  type: 'CHANGE_QUANTITY',
  payload: { productId, number },
});

export const removeProduct = (productId2) => ({
  type: 'REMOVE_PRODUCT',
  payload: { productId2 },
});
