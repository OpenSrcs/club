//
// Copyright © 2026 OpenSrcs.
//
import mammoth from 'mammoth'

export async function convertToHtml (buffer: Buffer): Promise<string> {
  return (await mammoth.convertToHtml({ buffer })).value
}
