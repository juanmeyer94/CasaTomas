import { createContext, useState, useContext, useEffect, useRef } from "react";
import { registerUser, loginUser, getAllItemsBdd, getAllOrdersFromApi, getOrderById, updateOrderStatusToApi, updateOrderStatus, getAllOrders, deleteOrderToApi, deleteOrder } from "../../../redux/actions";
import {useDispatch } from "react-redux"
import Cookies from "js-cookie"
import { verifyTokenRequest } from "../../../redux/actions";

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an authProvider")
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);


    const signup = async (user) => {
        try {
            const res = await registerUser(user);

            if (res && res.status === 200) {
                setUser(res.data);
                setIsAuthenticated(true);
            } else {
                setErrors("Unexpected response:");
            }
        } catch (error) {
            if (error.response && error.response.data) {
               
                setErrors(error.response.data);
            } else {
                setErrors("Unexpected error format:");
            }
        }
    };

    const signin = async (user, history) => {
        try {
          const res = await dispatch(loginUser(user));
          
          setUser(res);
          setIsAuthenticated(true);
          history("/dashboard");
          return res;
        } catch (error) {
        if(Array.isArray(error.response.data)){
            return setErrors(error.response.data)
        }
        setErrors([error.response.data.message])
      
          
        }
      };


      const logout = () => {
        Cookies.remove("token");
        setUser(null);
        setIsAuthenticated(false);
      };

      const ordersBdd = () => {
        try {
          dispatch(getAllOrdersFromApi())
        } catch (error) {
          console.error(error);
        }
      }

      const orderById = async (id) => {
        try {
         const response = await getOrderById(id);
         return response
        } catch (error) {
          console.error(error);
        }
      }

      const updateStatus = async (id, status) => {
        console.log(id, status);
        try {
          const response = await updateOrderStatusToApi(id, status);
          dispatch(updateOrderStatus(id, status));
          ordersBdd();
          return response;
        } catch (error) {
          console.error(error);
        }
      };
      
      const deleteOrderGeneral = async (id) => {
      console.log("se llamo")
        try {
            dispatch(deleteOrderToApi(id));
    
            await ordersBdd();
    
            return "Orden eliminada exitosamente";
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
    
      //sacar errores cada 5 seg
      useEffect(() => {
       if(errors.length > 0) {
        const timer = setTimeout(() => {
            setErrors([])
        }, 5000)
        return () => clearTimeout(timer)
       }
      }, [errors])
      


      useEffect(() => {
        const checkLogin = async () => {
          const cookies = Cookies.get();
          if (!cookies.token) {
            setIsAuthenticated(false);
            setLoading(false);
            return;
          }
    
          try {
            const res = await verifyTokenRequest(cookies.token);
            if (!res.data) return setIsAuthenticated(false);
            setIsAuthenticated(true);
            setUser(res.data);
            setLoading(false);
          } catch (error) {
            setIsAuthenticated(false);
            setLoading(false);
          }
        };
        checkLogin();
      }, []);
      const noDouble = useRef(false)

      useEffect(() => {
           if(noDouble.current === false){
            const fetchData = async () => {
              try {
           
                await dispatch(getAllItemsBdd());
              
             
              } catch (error) {
               
                console.error('Error al cargar los items:', error);
              }
            };
        
            fetchData();
            return () => {
              noDouble.current = true
            }
           }
         }, [dispatch])
     

    return (
        <AuthContext.Provider value={{
            signup,
            user,
            errors,
            signin,
            isAuthenticated,
            loading,
            logout,
            ordersBdd,
            orderById,
            updateStatus,
            deleteOrderGeneral,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;