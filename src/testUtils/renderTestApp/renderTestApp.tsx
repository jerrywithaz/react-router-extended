import React from 'react';
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BetterReactRoutingProvider, { BetterReactRoutingProviderProps } from './../../provider/BetterReactRoutingProvider';
import { MemoryRouterProps } from 'react-router';

type RenderTestAppProps = BetterReactRoutingProviderProps & MemoryRouterProps;

function renderTestApp({
    initialEntries,
    initialIndex,
    keyLength,
    getUserConfirmation,
    ...betterReactRoutingProviderProps
}: RenderTestAppProps, children: React.ReactNode) {
    const result = render((
        <MemoryRouter 
            initialEntries={initialEntries} 
            initialIndex={initialIndex} 
            keyLength={keyLength}
            getUserConfirmation={getUserConfirmation}>
                <BetterReactRoutingProvider {...betterReactRoutingProviderProps}>
                    {children}
                </BetterReactRoutingProvider>
        </MemoryRouter>
    ));
    return result;
}

export default renderTestApp;