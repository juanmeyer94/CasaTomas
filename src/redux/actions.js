import * as ActionTypes from "./actions-types"


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