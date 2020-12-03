import React from 'react';
import { Link } from 'react-router-dom';
import { BreadcrumbLinkProps } from './BreadcrumbLink.types';

const BreadcrumbLink = ({
    isExact,
    isLink,
    name,
    to,
    isDisabled,
}: BreadcrumbLinkProps): JSX.Element | null => {
    if (isDisabled) return null;
    return (
        <>
            {isLink ? <Link to={to}>{name}</Link> : <span>{name}</span>}
            {!isExact && <span> / </span>}
        </>
    );
};

export default BreadcrumbLink;
