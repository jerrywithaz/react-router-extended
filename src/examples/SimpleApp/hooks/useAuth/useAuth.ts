import { useDispatch } from "react-redux";
import { Actions } from "../../app-redux";

/**
 * Hooks for redux authentication actions.
 */
function useAuth() {
  const dispatch = useDispatch();

  function login(username: string, password: string) {
    dispatch(Actions.Auth.login(username, password));
  }

  function logout() {
    dispatch(Actions.Auth.logout());
  }

  return { login, logout };
}

export default useAuth;
