import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { MemoryRouterProps } from 'react-router';
import ReactRouterExtendedProvider, {
    ReactRouterExtendedProviderProps,
} from '../../provider/ReactRouterExtendedProvider';
import Switch from '../../components/Switch';

export type TestAppWrapperProps = Omit<
    ReactRouterExtendedProviderProps,
    'FoundComponent'
> &
    MemoryRouterProps & {
        FoundComponent?: ReactRouterExtendedProviderProps['FoundComponent'];
    };

function createTestAppWrapper({
    initialEntries,
    initialIndex,
    keyLength,
    getUserConfirmation,
    FoundComponent,
    routes,
    ...ReactRouterExtendedProviderProps
}: TestAppWrapperProps): JSX.Element {
    const DefaultFoundComponent = () => <Switch routes={routes} />;
    return (
        <MemoryRouter
            initialEntries={initialEntries}
            initialIndex={initialIndex}
            keyLength={keyLength}
            getUserConfirmation={getUserConfirmation}
        >
            <ReactRouterExtendedProvider
                FallbackPermissionsComponent={() => (
                    <div>Invalid permissions</div>
                )}
                FallbackRolesComponent={() => <div>Invalid roles</div>}
                {...ReactRouterExtendedProviderProps}
                FoundComponent={FoundComponent || DefaultFoundComponent}
                routes={routes}
            />
        </MemoryRouter>
    );
}

export default createTestAppWrapper;
