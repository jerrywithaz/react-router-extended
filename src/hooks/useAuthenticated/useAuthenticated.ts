import { useSelector } from "react-redux";
import { Selectors } from "./../../app-redux";

/**
 * A hook that selects the authentication state
 * of the current user from the app redux store.
 */
function useAuthenticated() {
  const authenticated = useSelector(Selectors.Auth.authenticated);
  return authenticated;
}

export default useAuthenticated;
