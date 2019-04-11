/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CategoryPage from 'Route/CategoryPage';
import ProductPage from 'Route/ProductPage';
import CmsPage from 'Route/CmsPage';
import NoMatch from 'Route/NoMatch';
import { getUrlParam } from 'Util/Url';
import UrlRewritesMockData from '../urlRewritesMockData';

class UrlRewrites extends Component {
    componentWillMount() {
        const { requestUrlRewrite, match, location } = this.props;
        const urlParam = getUrlParam(match, location);
        requestUrlRewrite(urlParam);
    }

    componentWillUnmount() {
        const { clearUrlRewrites } = this.props;
        clearUrlRewrites();
    }

    switcher({ type, id }) {
        const { props } = this;

        switch (type) {
        case 'PRODUCT':
            return <ProductPage { ...props } />;
        case 'CMS':
            return <CmsPage { ...props } />;
        case 'CATEGORY':
            return <CategoryPage { ...props } categoryIds={ id } />;
        default:
            return <NoMatch { ...props } />;
        }
    }

    findUrlRewrites(urlInput) {
        const { data: { products, cms, categories } } = UrlRewritesMockData;
        const getOriginalKey = (element) => {
            if (element) {
                const { items } = element;
                let original_url_key;
                items.forEach((item) => {
                    const { url_key, url_rewrites } = item;
                    url_rewrites.forEach((url_rewrite) => {
                        const { url } = url_rewrite;
                        if (url === urlInput) { original_url_key = url_key; }
                    });
                });

                return original_url_key;
            }

            return null;
        };

        const productsRewrites = [products, cms, categories].map((element, i) => {
            const originalKey = getOriginalKey(element);

            if (originalKey) return { originalKey, i };
            return null;
        });
        return productsRewrites && productsRewrites.filter(Boolean);
    }

    render() {
        const { urlRewrite } = this.props;

        if (urlRewrite && Object.entries(urlRewrite).length) {
            return this.switcher(urlRewrite);
        }

        return null;
    }
}

UrlRewrites.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    match: PropTypes.shape({
        path: PropTypes.string.isRequired
    }).isRequired
};

export default UrlRewrites;
