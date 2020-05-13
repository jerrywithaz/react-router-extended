import React from 'react';
import { render } from "@testing-library/react";
import createTestAppWrapper, { TestAppWrapperProps } from '../createTestAppWrapper';

function renderTestApp(wrapperProps: TestAppWrapperProps, children: React.ReactNode) {
    const result = render(createTestAppWrapper(wrapperProps, children));
    return result;
}

export default renderTestApp;