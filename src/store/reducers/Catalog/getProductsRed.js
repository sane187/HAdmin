export const ProductsReducer = (state = "", action) => {
    switch (action.type) {
        case "GET_ALL_PRODUCTS":
            return action.products;
        default:
            return state;
    }
}

export const CategoryReducer = (state = "", action) => {
   
    switch (action.type) {
        case "GET_ALL_CATEGORIES":
            return action.categories;
        default:
            return state;
    }
}
export const get_category_branchesReducer = (state = "", action) => {
    switch (action.type) {
        case "GET_CATEGORY_BRANCHES":
            return action.data;
        case "SET_CATEGORY_BRANCHES":
            return ""
        default:
            return state;
    }
}

export const get_product_branchReducer = (state = "", action) => {
    switch (action.type) {
        case "GET_BRANCH_PRODUCT":
            return action.data;
        case "SET_BRANCH_PRODUCT":
            return ""
        default:
            return state;
    }
}

export const AddonsReducer = (state = "", action) => {
    switch (action.type) {
        case "GET_ALL_ADDONS":
            return action.addons;
        default:
            return state;
    }
}

export const UpdateReducer = (state="", action) => { 
     switch (action.type) {
case "UPDATE_CATEGORY": return state
    default: return state
    }
}


export const AddProductToCat = (state="", action) => { 
    switch (action.type) {
case "ADD_PRODUCT": return action.payload
   default: return state
   }
}

export const GET_CURRENT_CAT=(state="", action) => { 

    switch (action.type) {
        case "CURRENT_CAT": return action.payload
           default: return state
           }
}
export const GET_CURRENT_BRANCH=(state="", action) => { 

    switch (action.type) {
        case "get_current_branch": return action.payload
           default: return state
           }
}
export const DELETE__PRODUCT=(state="", action) => { 

    switch (action.type) {
        case "DELETE_PRODUCT": return state
           default: return state
           }
}
export const UPDATE__PRODUCT=(state="", action) => { 

    switch (action.type) {
        case "UPDATE_PRODUCT": return state
           default: return state
           }
}
export const ITEMS__AVAILABLE=(state="", action) => { 

    switch (action.type) {
        case "ITEMS_AVAILABLE": return state
           default: return state
           }
}
export const GET_SINGLE__ADDON=(state="", action) => { 

    switch (action.type) {
        case "GET_SINGLE_ADDON": return action.data.data
           default: return state
           }
}

export const UPDATE_ADDON__PRODUCT=(state="", action) => { 

    switch (action.type) {
        case "UPDATE_ADDON_PRODUCT": return state
           default: return state
           }
}
export const DELETE_SINGLE__ADDON=(state="", action) => { 

    switch (action.type) {
        case "DELETE_SINGLE_ADDON": return state
           default: return state
           }
}
export const DELETE__CATEGORY=(state="", action) => { 

    switch (action.type) {
        case "DELETE_CATEGORY": return state
           default: return state
           }
}
export const DELETE_PRODUCT=(state="", action) => { 

    switch (action.type) {
        case "DELETE__PRODUCT": return state
           default: return state
           }
}



