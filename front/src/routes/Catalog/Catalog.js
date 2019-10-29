import React from 'react';
import PropTypes from 'prop-types';

import { SeoHead } from 'utils';
import { useFormatMessage } from 'hooks';

import Filters from 'components/Filters';
import Products from 'components/Products';
import Hero from 'components/Hero';
import Container from 'components/Container';

const Catalog = ({ slug, banner, limit, name, description, tags }) => {
    const [defaultTitle] = useFormatMessage([{ id: 'p_catalog_meta_title', values: { name } }]);

    return (
        <Container>
            <SeoHead type="catalog" name={defaultTitle} />
            <Hero title={name} subtitle={description} image={banner} />
            {tags.length ? <Filters list={tags} /> : null}
            <Products slug={slug} limit={limit} />
        </Container>
    );
};
Catalog.defaultProps = {
    limit: 90,
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
