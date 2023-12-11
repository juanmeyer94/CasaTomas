import * as ActionTypes from "./actions-types"
import { fakeData } from "../BDD/fakeData";


const initialState = {
    user: null,
    error: null,
    isLoggedIn: false,
    items: [],
    filteredItems: [],
    cart: [],

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_ALL_ITEMS:
            return {
                ...state,
                items: [...action.payload],
            };
        case ActionTypes.FILTER_ITEMS:
            const filteredItems = state.items.filter((item) => {
                const normalizedSection = action.payload.section ? action.payload.section.toLowerCase() : "";
                const normalizedSubsection = action.payload.subsection ? action.payload.subsection.toLowerCase() : "";
                const normalizedType = action.payload.type ? action.payload.type.toLowerCase() : "";
                const normalizedMarca = action.payload.marca ? action.payload.marca.toLowerCase() : "";

                const normalizedItemSection = item.section ? item.section.toLowerCase() : "";
                const normalizedItemSubsection = item.subsection ? item.subsection.toLowerCase() : "";
                const normalizedItemType = item.data && item.data.type ? item.data.type.toLowerCase() : "";
                const normalizedItemMarca =
                    item.data && item.data.items[0]?.marca ? item.data.items[0]?.marca.toLowerCase() : "";

                return (
                    (!action.payload.section || normalizedItemSection.includes(normalizedSection)) &&
                    (!action.payload.subsection || normalizedItemSubsection.includes(normalizedSubsection)) &&
                    (!action.payload.type || normalizedItemType.includes(normalizedType)) &&
                    (!action.payload.marca || (normalizedItemMarca && normalizedItemMarca.includes(normalizedMarca))) &&
                    (!action.payload.price || (item.data && item.data.items[0] && item.data.items[0].price <= action.payload.price))
                );
            });

            return {
                ...state,
                filteredItems: filteredItems,
            };
        case ActionTypes.FILTER_FILTERED_ITEMS:
            const targetType = action.payload.types?.toLowerCase().trim();

            if (!targetType) {

                return state;
            }

            const doubleFilteredItems = state.filteredItems.filter((item) => {
                const itemType = item?.data?.type?.toLowerCase().trim();
                return itemType === targetType;
            });

            return {
                ...state,
                filteredItems: doubleFilteredItems,
            };
        case ActionTypes.LOGIN_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                error: null,
            };
        case ActionTypes.LOGIN_USER_FAILURE:
            return {
                ...state,
                user: null,
                error: action.payload,
            };
        case ActionTypes.LOGOUT_USER:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case ActionTypes.SET_LOGGED_IN:
            return {
                ...state,
                isLoggedIn: action.payload,
            };
        case ActionTypes.NEW_ITEM:

            return {
                ...state,
                items: [...state.items, action.payload],
            };
        case ActionTypes.CHANGE_QUANTITY:
            const { productId, number } = action.payload;
            const updatedCart = state.cart.map((item) => ({
                ...item,
                quantity: item._id === productId ? Math.max(0, item.quantity + number) : item.quantity,
            }));

            // Filtra los elementos con cantidad mayor a 0 para eliminar los productos con cantidad 0
            const filteredCart = updatedCart.filter((item) => item.quantity > 0);

            return {
                ...state,
                cart: filteredCart,
            };
        case ActionTypes.ADD_CART:
            const newItem = action.payload;
            const existingItem = state.cart.find((item) => item._id === newItem._id);

            if (existingItem) {
                // If the item is already in the cart, update the quantity
                existingItem.quantity = (existingItem.quantity || 0) + (newItem.quantity || 1);
                return {
                    ...state,
                    cart: [...state.cart],
                };
            } else {
                // If the item is not in the cart, add it with the provided quantity or default to 1
                newItem.quantity = newItem.quantity || 1;
                return {
                    ...state,
                    cart: [...state.cart, newItem],
                };
            }
        case ActionTypes.REMOVE_PRODUCT:
  const { productId2 } = action.payload;
  const updatedCartAfterRemove = state.cart.filter((item) => item._id !== productId2);

  return {
    ...state,
    cart: updatedCartAfterRemove,
  };

        default:
            return state;
    }
};

export default reducer;
