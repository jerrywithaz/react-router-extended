import React from 'react';
import { Link } from 'react-router-dom';
import { BreadcrumbLinkProps } from './BreadcrumbLink.types';

const BreadcrumbLink = ({
    isExact,
    isLink,
    name,
    to,
}: BreadcrumbLinkProps): JSX.Element | null => {
    return (
        <>
            {isLink ? <Link to={to}>{name}</Link> : <span>{name}</span>}
            {!isExact && <span> / </span>}
        </>
    );
};

export default BreadcrumbLink;
