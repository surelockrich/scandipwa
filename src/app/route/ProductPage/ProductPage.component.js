/* eslint-disable react/no-unused-state */
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
import ProductGallery from 'Component/ProductGallery';
import ContentWrapper from 'Component/ContentWrapper';
import ProductInformation from 'Component/ProductInformation';
import Meta from 'Component/Meta';
import ProductActions from 'Component/ProductActions';
import { ProductType } from 'Type/ProductList';
import RelatedProducts from 'Component/RelatedProducts';
import './ProductPage.style';
// import ProductConfigurableAttributes from 'Component/ProductConfigurableAttributes';

class ProductPage extends Component {
    render() {
        const {
            product,
            configurableVariantIndex,
            parameters,
            getLink,
            dataSource,
            updateUrl,
            getProductOrVariant
        } = this.props;
        const areDetailsLoaded = dataSource === product;
        const productOrVariant = getProductOrVariant(dataSource);
        return (
            <>
                <Meta metaObject={ dataSource } />
                <main block="ProductPage" aria-label="Product page">
                    <div
                      itemScope
                      itemType="http://schema.org/Product"
                    >
                    <ContentWrapper
                      mix={ { block: 'ProductPage' } }
                      wrapperMix={ { block: 'ProductPage', elem: 'Wrapper' } }
                      label={ __('Main product details') }
                    >
                        <ProductGallery
                          product={ productOrVariant }
                        />
                        <ProductActions
                          getLink={ getLink }
                          updateUrl={ updateUrl }
                          product={ dataSource }
                          parameters={ parameters }
                          areDetailsLoaded={ areDetailsLoaded }
                          configurableVariantIndex={ configurableVariantIndex }
                        //   updateConfigurableVariantIndex={ updateUrl }
                        />
                    </ContentWrapper>
                    </div>
                    <ProductInformation product={ dataSource } type="block" />
                    <RelatedProducts
                      product={ dataSource }
                      areDetailsLoaded={ areDetailsLoaded }
                      label="ScandiPWA recommends"
                      itemType=""
                    />
                </main>
            </>
        );
    }
}

ProductPage.propTypes = {
    configurableVariantIndex: PropTypes.number.isRequired,
    // getProductOrVariant: PropTypes.func.isRequired,
    updateUrl: PropTypes.func.isRequired,
    dataSource: ProductType.isRequired,
    // filters: PropTypes.object.isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
        state: PropTypes.shape({
            product: ProductType
        })
    }),
    history: PropTypes.shape({
        location: PropTypes.object.isRequired,
        push: PropTypes.func.isRequired
    }).isRequired,
    match: PropTypes.shape({
        path: PropTypes.string.isRequired
    }).isRequired,
    // product: ProductType.isRequired
    // requestProduct: PropTypes.func.isRequired,
    // updateBreadcrumbs: PropTypes.func.isRequired,
    // changeHeaderState: PropTypes.func.isRequired,
    // clearGroupedProductQuantity: PropTypes.func.isRequired,
    isOnlyPlaceholder: PropTypes.bool,
    product: ProductType.isRequired
};

ProductPage.defaultProps = {
    location: { state: {} }
};

export default ProductPage;
