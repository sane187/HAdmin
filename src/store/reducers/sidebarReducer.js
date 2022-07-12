const SidebarReducer = (state = {
    open1: false,
    open2: false,
    open3: false,
    open4: false,
    open5: false,
    open6:false
}, action) => {
    switch (action.type) {
        case "GET_TOGGLE":
            return state;
        case "SET_TOGGLE":
            return {...state,[action.num]:action.bool}
        default:
            return state;
    }
}
export default SidebarReducer