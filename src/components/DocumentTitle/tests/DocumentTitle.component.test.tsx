import React from 'react';
import { render } from '@testing-library/react';
import DocumentTitle from '..';

describe('<DocumentTitle/>', () => {
    it('should change document title when rendered', () => {
        render(<DocumentTitle title="My Title" />);
        expect(document.title).toEqual('My Title');
    });
});
