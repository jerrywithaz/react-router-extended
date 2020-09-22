import { RedirectPathAfterLogin } from '../../types';

export type RedirectAfterLoginProps = {
    authenticated: boolean;
    redirectPathAfterLogin: RedirectPathAfterLogin;
};
