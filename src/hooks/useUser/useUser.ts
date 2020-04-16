import { useSelector } from "react-redux";
import { Selectors } from "./../../app-redux";

/**
 * A hook that selects the current user from
 * the app redux store.
 */
function useUser() {
  const user = useSelector(Selectors.Auth.user);
  return user;
}

export default useUser;
