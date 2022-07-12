import { toast } from "react-toastify";

const authReducer = (state = [], action) => {
    switch (action.type) {
        case "GET_LOGIN":
            return {
                login:action.employeeInfo,
                status:action.status,
                role:action.role
            };
            case "SET_LOGIN":
                toast.success(`Please Login Again`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined, theme: "colored"
                });
            return {
                login:null,
                status:"failure",
                role:null
            };
        default:
            return state;
    }
}
export default authReducer