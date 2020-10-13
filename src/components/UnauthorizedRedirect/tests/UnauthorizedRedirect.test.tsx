/* eslint-disable no-use-before-define */
import React from 'react';
import { useLocation } from 'react-router';
import renderTestApp from '../../../testUtils/renderTestApp';
import createRoutes from '../../../testUtils/createTestRoutes';

describe('<UnauthorizedRedirect />', () => {
    it('should redirect to redirectPath', async () => {
        const { getByTestId } = await renderUnauthorizedRedirect(
            false,
            '/admin'
        );
        const currentLocation = getByTestId('location').textContent;
        expect(currentLocation).toEqual('/login?redirect=/admin');
    });
    it('should redirect to redirectPath and keep current search params', async () => {
        const { getByTestId } = await renderUnauthorizedRedirect(
            false,
            '/admin?id=4'
        );
        const currentLocation = getByTestId('location').textContent;
        expect(currentLocation).toEqual('/login?redirect=/admin&id=4');
    });
});

const TestComponent = () => {
    const { pathname, search } = useLocation();
    return <div data-testid="location">{`${pathname}${search}`}</div>;
};

async function renderUnauthorizedRedirect(authenticated: boolean, url: string) {
    const testAppProps = {
        authenticated,
        initialA11yMessage: '',
        initialDocumentTitle: '',
        initialEntries: [url],
        initialIndex: 0,
        routes: createRoutes({ component: TestComponent }, true),
        redirectPathAfterLogin: '/admin',
    };
    const result = await renderTestApp(testAppProps);
    return result;
}
