import React, { FunctionComponent } from 'react';
import { ScreenReaderOnlyProps } from './ScreenReaderOnly.types';

const styles: React.CSSProperties = {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0px',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0px, 0px, 0px, 0px)',
    border: '0px',
};

/**
 * A component for making content only active for screen readers and
 * invisible to users not using screen readers.
 */
const ScreenReaderOnly: FunctionComponent<ScreenReaderOnlyProps> = ({
    children,
    ...rest
}): JSX.Element => {
    return (
        <div style={styles} {...rest}>
            {children}
        </div>
    );
};

export default ScreenReaderOnly;
