import { useContext } from "react";
import AuthContext from "../contexts/ContextProvider"; 

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;