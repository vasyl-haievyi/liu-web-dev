import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

function Authorized({ children }) {
    let user = useSelector(state => state.user)

    if (user) {
        return children
    } else {
        return <Navigate to={{
            pathname: '/login', 
            search: '?redirect=' + window.location.pathname}}/>
    }
}

export default Authorized;
