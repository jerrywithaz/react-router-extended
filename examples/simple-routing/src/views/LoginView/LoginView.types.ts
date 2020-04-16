import { RouteConfigComponentProps } from '@jerrywithaz/better-react-router-routing';
import { Http } from "@status/codes";

export type LoginViewParams = {
  code?: string;
};

export type LoginViewLocationState = {
  from?: string;
  status?: Http;
};

export type LoginViewProps = RouteConfigComponentProps<
  LoginViewParams,
  LoginViewLocationState
> & {};
