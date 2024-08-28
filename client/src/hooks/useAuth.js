import { useContext, useLayoutEffect } from "react";
import { UserContext } from "../context/userContext";

export const useAuth = () => {
  const { user, setUser, logOut } = useContext(UserContext);

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser(JSON.parse(token));
  }, [setUser]);

  return {
    user,
    setUser,
    logOut,
  };
};
