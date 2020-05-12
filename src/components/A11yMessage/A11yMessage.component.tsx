import React, { FunctionComponent } from 'react';
import ScreenReaderOnly from './../ScreenReaderOnly';
import { A11yMessageProps } from './A11yMessage.types';

/**
 * A component that will read aloud a message to users using a screen reader
 * whenever the message changes.
 */
const A11yMessage: FunctionComponent<A11yMessageProps> = ({
    message
}) => {
    return (
        <ScreenReaderOnly 
            role="status" 
            aria-live="polite" 
            aria-atomic={true}>
                {message}
        </ScreenReaderOnly>
    );
}

export default A11yMessage;