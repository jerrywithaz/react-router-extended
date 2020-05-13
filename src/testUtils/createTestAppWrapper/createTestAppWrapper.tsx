import React from 'react';
import { MemoryRouter } from "react-router-dom";
import BetterReactRoutingProvider, { BetterReactRoutingProviderProps } from './../../provider/BetterReactRoutingProvider';
import { MemoryRouterProps } from 'react-router';

export type TestAppWrapperProps = BetterReactRoutingProviderProps & MemoryRouterProps;

function createTestAppWrapper({
    initialEntries,
    initialIndex,
    keyLength,
    getUserConfirmation,
    ...betterReactRoutingProviderProps
}: TestAppWrapperProps, children: React.ReactNode) {
    return (
        <MemoryRouter 
            initialEntries={initialEntries} 
            initialIndex={initialIndex} 
            keyLength={keyLength}
            getUserConfirmation={getUserConfirmation}>
                <BetterReactRoutingProvider {...betterReactRoutingProviderProps}>
                    {children}
                </BetterReactRoutingProvider>
        </MemoryRouter>
    );
}

export default createTestAppWrapper;