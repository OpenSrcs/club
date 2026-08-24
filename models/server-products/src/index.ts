//
// Copyright © 2026 OpenSrcs.
//
//

import type { Plugin } from '@opensrcs/club'
import products from '@opensrcs/products'

import core from '@opensrcs/core'
import { type Builder } from '@opensrcs/model'
import serverCore from '@opensrcs/server-core'

export const serverProductsId = 'server-products' as Plugin

export function createModel (builder: Builder): void {
  builder.mixin(products.class.Product, core.class.Class, serverCore.mixin.SearchPresenter, {
    iconConfig: {
      component: products.component.ProductSearchIcon,
      fields: [['icon'], ['color']]
    },
    title: [['name']]
  })
}
