import React from 'react';
import PropTypes from 'prop-types';

import { SeoHead } from 'utils';

import Filters from 'components/Filters';
import Products from 'components/Products';
import Hero from 'components/Hero';
import Container from 'components/Container';

const Catalog = ({ slug, banner, limit, name, description, tags }) => (
    <Container>
        <SeoHead type="catalog" name={name} />
        <Hero title={name} subtitle={description} image={banner} />
        {tags.length ? <Filters list={tags} /> : null}
        <Products slug={slug} limit={limit} />
    </Container>
);

Catalog.defaultProps = {
    limit: 40,
    name: 'Без имени',
    description: null,
    tags: [],
};

Catalog.propTypes = {
    limit: PropTypes.number,
    slug: PropTypes.string.isRequired,
    banner: PropTypes.string.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.object),
};

export default Catalog;
