import * as ActionTypes from "./actions-types"
import { fakeData } from "../BDD/fakeData";


const initialState = {
    user: null,
    error: null,
    isLoggedIn: false,
    items: [],
    filteredItems: [],

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

        default:
            return state;
    }
};

export default reducer;
