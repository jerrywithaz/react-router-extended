import React from 'react';
import { render, screen } from '@testing-library/react';
import A11yMessage from '../A11yMessage.component';
import { A11yMessageProps } from '../A11yMessage.types';

function renderA11yMessage(props: A11yMessageProps) {
    return render(<A11yMessage {...props} />);
}

describe('<A11yMessage/>', () => {
    it('should render without error', () => {
        const message = 'This message is for the screen reader.';
        renderA11yMessage({
            message,
        });
        expect(screen.getByText(message)).toBeInTheDocument();
    });
});
