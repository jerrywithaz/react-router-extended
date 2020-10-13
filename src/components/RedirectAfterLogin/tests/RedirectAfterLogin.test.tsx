import React from 'react';
import { useLocation } from 'react-router';
import { act, render } from '@testing-library/react';
import createRoutes from '../../../testUtils/createTestRoutes';
import { RouteConfig } from '../../../types';
import createTestAppWrapper, {
    TestAppWrapperProps,
} from '../../../testUtils/createTestAppWrapper';

const TestComponent = () => {
    const { pathname, search } = useLocation();
    return <div data-testid="location">{`${pathname}${search}`}</div>;
};

function renderRedirectAfterLogin(
    authenticated: boolean,
    homepageRoutesProps?: Partial<RouteConfig>,
    testAppWrapperProps?: Partial<TestAppWrapperProps>,
    initialEntries?: string[],
    redirectPathAfterLogin?: string
) {
    const testAppProps = {
        authenticated,
        initialA11yMessage: '',
        initialDocumentTitle: '',
        initialEntries: initialEntries || ['/admin'],
        initialIndex: 0,
        routes: createRoutes({
            ...homepageRoutesProps,
            component: TestComponent,
        }),
        redirectPathAfterLogin: redirectPathAfterLogin || '/admin',
        ...(testAppWrapperProps || {}),
    };
    return createTestAppWrapper(testAppProps);
}

describe('<RedirectAfterLogin/>', () => {
    it('should redirect to the `redirectPathAfterLogin` path once authenticated is true', () => {
        const { rerender } = render(
            renderRedirectAfterLogin(false, { secure: true })
        );

        expect(document.title).not.toBe('Admin');

        act(() => {
            rerender(renderRedirectAfterLogin(true, { secure: true }));
        });

        expect(document.title).toBe('Admin');
    });
    it('should redirect to the `redirectPathAfterLogin` and keep search params', () => {
        const { rerender, getByTestId } = render(
            renderRedirectAfterLogin(false, { secure: true }, {}, [
                '/admin?id=5',
            ])
        );

        act(() => {
            rerender(
                renderRedirectAfterLogin(true, { secure: true }, {}, [
                    '/admin?id=5',
                ])
            );
        });

        const currentLocation = getByTestId('location').textContent;

        expect(currentLocation).toBe('/admin?id=5');
    });
});
