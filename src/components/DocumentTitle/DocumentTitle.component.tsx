import { FunctionComponent } from 'react';
import { DocumentTitleProps } from './DocumentTitle.types';

const DocumentTitle: FunctionComponent<DocumentTitleProps> = ({
    title
}) => {

    document.title = title;

    return null;
    
}

export default DocumentTitle;