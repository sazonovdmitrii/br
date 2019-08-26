import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { seoHead } from 'utils';

import Sidebar from 'components/Sidebar';
import Pagination from 'components/Pagination';
import Filters from 'components/Filters';
import Products from 'components/Products';
import Hero from 'components/Hero';
import Container from 'components/Container';

const Catalog = ({ match, slug, limit, name, count, description, subtitle, tags = [] }) => {
    const {
        groups: { index },
    } = match.url.match(/(\/page-)(?<index>\d+)/) || { groups: { index: null } };
    const currentPage = index ? parseInt(index, 10) : 1;
    const offset = currentPage > 1 ? (currentPage - 1) * limit : 0;
    const redirectToIndexPage = count < offset || parseInt(index, 10) === 0 || parseInt(index, 10) === 1;

    if (redirectToIndexPage) {
        return <Redirect to=".." />;
    }

    return (
        <div>
            {seoHead('catalog', { name, page: currentPage })}
            <Hero title={name} subtitle="Shop frames below or pick five pairs to try for free" />
            <Container>
                <Filters list={tags} />
                <Products slug={slug} limit={limit} offset={offset} count={count} />
            </Container>
        </div>
    );
};

Catalog.defaultProps = {
    limit: 40,
    name: 'Без имени',
    subtitle: null,
    description: null,
};

Catalog.propTypes = {
    limit: PropTypes.number,
    slug: PropTypes.string.isRequired,
    match: PropTypes.object,
    name: PropTypes.string,
    count: PropTypes.number.isRequired,
    description: PropTypes.string,
    subtitle: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.object),
};

export default Catalog;
