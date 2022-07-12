export const setSideToggle = (num,bool) => {
    return (dispatch, getState) => {
            dispatch({
                type: "SET_TOGGLE",
                num:num,
                bool:bool
            })
        }
}