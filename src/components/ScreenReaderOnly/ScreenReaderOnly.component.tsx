import React, { FunctionComponent } from 'react';
import * as Styled from './ScreenReaderOnly.style';
import { ScreenReaderOnlyProps } from './ScreenReaderOnly.types';

/**
 * A component for making content only active for screen readers and 
 * invisible to users not using screen readers.
 */
const ScreenReaderOnly: FunctionComponent<ScreenReaderOnlyProps> = ({
    children,
    ...rest
}): JSX.Element => {
    return (
        <Styled.ScreenReaderOnly {...rest}>
            {children}
        </Styled.ScreenReaderOnly>
    );
}

export default ScreenReaderOnly;