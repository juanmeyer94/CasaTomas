import * as ActionTypes from "./actions-types"
import axios from "axios"

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

export const loginUser = (userData, navigate) => {
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
  
     
        navigate("/dashboard"); 
  
      } catch (error) {
       
        dispatch({
          type: ActionTypes.LOGIN_USER_FAILURE,
          payload: error.response?.data || { message: "Error desconocido" },
        });
  
        
        navigate("/"); 
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
