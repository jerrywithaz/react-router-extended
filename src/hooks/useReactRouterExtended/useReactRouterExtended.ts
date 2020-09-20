import { useContext } from 'react';
import {
    ReactRouterExtendedContext,
    ReactRouterExtendedContextValue,
} from '../../provider/ReactRouterExtendedProvider';

function useReactRouterExtended(): ReactRouterExtendedContextValue {
    const context = useContext(ReactRouterExtendedContext);

    if (context === undefined) {
        throw new Error(
            `useReactRouterExtended must be used within a ReactRouterExtendedProvider`
        );
    }

    return context;
}

export default useReactRouterExtended;
