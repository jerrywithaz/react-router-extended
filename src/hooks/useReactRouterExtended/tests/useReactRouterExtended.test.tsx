/* eslint-disable react/display-name */
/* eslint-disable no-use-before-define */
import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useReactRouterExtended from '../useReactRouterExtended';
import createTestAppWrapper from '../../../testUtils/createTestAppWrapper';
import createRoutes from '../../../testUtils/createTestRoutes';

describe('Hooks - useReactRouterExtended', () => {
    it('should throw an error if hook is not used inside of a <ReactRouterExtendedProvider/>', () => {
        expect(() => useReactRouterExtended()).toThrowError();
    });
    it('should return context value from <ReactRouterExtendedProvider/>', () => {
        const { result } = renderUseReactRouterExtendedHook(true);
        expect(result.current.authenticated).toEqual(true);
        expect(result.current.pageNotFoundA11yMessage).toEqual(
            'Page Not Found'
        );
        expect(result.current.pageNotFoundDocumentTitle).toEqual('Login');
        expect(result.current.redirectPath).toEqual('/login');
        expect(result.current.setA11yMessage).toBeInstanceOf(Function);
        expect(result.current.setDocumentTitle).toBeInstanceOf(Function);
    });
});

function renderUseReactRouterExtendedHook(authenticated: boolean) {
    const result = renderHook(() => useReactRouterExtended(), {
        wrapper: ({ children }) =>
            createTestAppWrapper({
                authenticated,
                initialDocumentTitle: '',
                initialA11yMessage: '',
                pageNotFoundA11yMessage: 'Page Not Found',
                pageNotFoundDocumentTitle: 'Login',
                redirectPath: '/login',
                routes: createRoutes(),
                FoundComponent: () => <div>{children}</div>,
                redirectPathAfterLogin: '/admin',
            }),
    });

    return result;
}
