import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const Protected = ({  children }) => {
const status = useSelector(state => state.login);
 if (status.status!=="success") {
 return <Navigate to="/login" />;
 }
 return children;
};
export default Protected;