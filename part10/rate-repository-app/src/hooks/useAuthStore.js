import { authStorageContext } from "../authStorage";
import { useContext } from "react";

const useAuthStore = () => useContext(authStorageContext);

export default useAuthStore;
