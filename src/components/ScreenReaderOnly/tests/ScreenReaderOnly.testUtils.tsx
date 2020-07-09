import React from 'react';
import { render, screen } from '@testing-library/react';
import ScreenReaderOnly from '../ScreenReaderOnly.component';
import { ScreenReaderOnlyProps } from '../ScreenReaderOnly.types';

export function renderScreenReaderOnly(props: Partial<ScreenReaderOnlyProps>) {

    const text = "Screen reader only text.";
    const result = render((
        <ScreenReaderOnly {...props}>
            {text}
        </ScreenReaderOnly>
    ));
    const root = screen.getByText(text);
    const styles = root.style;

    return {
        ...result,
        root,
        text,
        styles
    };

};