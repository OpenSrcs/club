//
// Copyright © 2026 OpenSrcs.
//

import { type Doc } from '@opensrcs/core'
import { type IntlString, type Metadata, type Plugin, plugin, type Asset, type Resource } from '@opensrcs/club'
import { type AnyComponent } from '@opensrcs/ui/src/types'

export const printId = 'print' as Plugin

export const print = plugin(printId, {
  string: {
    PrintToPDF: '' as IntlString,
    PrintingDocumentOf: '' as IntlString,
    DownloadAll: '' as IntlString,
    PrintFailed: '' as IntlString,
    PrintSettings: '' as IntlString,
    LandscapeMode: '' as IntlString
  },
  component: {
    PrintToPDF: '' as AnyComponent,
    PrintBulkToPDF: '' as AnyComponent,
    DOCXViewer: '' as AnyComponent
  },
  icon: {
    Print: '' as Asset
  },
  metadata: {
    PrintURL: '' as Metadata<string>
  },
  function: {
    CanPrint: '' as Resource<(doc?: Doc | Doc[]) => Promise<boolean>>,
    CanConvert: '' as Resource<() => Promise<boolean>>
  }
})

export default print
