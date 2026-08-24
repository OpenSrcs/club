//
// Copyright © 2026 OpenSrcs.
//
import { type Doc } from '@opensrcs/core'
import { type Resources } from '@opensrcs/club'
import { showPopup } from '@opensrcs/ui'
import { getPrintBaseURL } from '@opensrcs/print'

import PrintToPDF from './components/PrintToPDF.svelte'
import PrintBulkToPDF from './components/PrintBulkToPDF.svelte'
import DOCXViewer from './components/DOCXViewer.svelte'

export async function print (
  object: Doc | Doc[],
  evt: Event,
  props: {
    signed: boolean
  }
): Promise<void> {
  const signed = props?.signed ?? false
  const docs = Array.isArray(object) ? object : [object]

  if (docs.length === 0) {
    return
  }
  if (docs.length === 1) {
    showPopup(
      PrintToPDF,
      {
        object: docs[0],
        signed
      },
      'float'
    )
    return
  }
  showPopup(
    PrintBulkToPDF,
    {
      objects: docs,
      signed
    },
    'float'
  )
}

export async function canPrint (): Promise<boolean> {
  let printURL = ''
  try {
    printURL = getPrintBaseURL()
  } catch (err) {
    // do nothing
  }

  return printURL?.length > 0
}

export default async (): Promise<Resources> => ({
  component: {
    PrintToPDF,
    PrintBulkToPDF,
    DOCXViewer
  },
  actionImpl: {
    Print: print
  },
  function: {
    CanPrint: canPrint,
    CanConvert: canPrint
  }
})
