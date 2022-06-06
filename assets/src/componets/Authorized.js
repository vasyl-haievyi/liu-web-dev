import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

import UserContext from '../context';

function Authorized({ children }) {
    let user = useSelector(state => state.user)

    if (user) {
        return (
            <UserContext.Provider value={user}>
                {children}
            </UserContext.Provider>
        )
    } else {
        return <Navigate to={{
            pathname: '/login', 
            search: '?redirect=' + window.location.pathname + '?' + window.location.search}}/>
    }
}

export default Authorized;
