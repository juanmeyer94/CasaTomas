import { createContext, useContext } from "react";
import { deleteItemById2, getItemById, updatedItem } from "../../../redux/actions";


const ItemsContext = createContext();

export const useItems = () => {
    const context = useContext(ItemsContext);
    if(!context) {
        throw new Error("useItems must be use within a ItemsProvider")
    }
    return context;
}

export function ItemsProvider({children}) {


    const getItem = async (id) => {
        try {
          const res = await getItemById(id);
          return res.data;
        } catch (error) {
          console.error(error);
        }
      };

      const deleteItemById = async (id) => {
        try {
          const res = await deleteItemById2(id);
          return res.data;
        } catch (error) {
          console.error(error);
        }
      };

      const updateItem = async (id, data) => {
        try {
          const rest = await updatedItem(id, data);
          return rest
        } catch (error) {
          console.error(error);
        }
      }


    return (
        <ItemsContext.Provider value={{getItem, deleteItemById, updateItem}}>
            {children}
        </ItemsContext.Provider>
    )
}