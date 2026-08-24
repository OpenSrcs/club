import { type Person } from '@opensrcs/contact'
import { type Ref } from '@opensrcs/core'
import { type IntlString } from '@opensrcs/club'

/**
 * @public
 */
export interface AssigneeCategory {
  label: IntlString
  func: (val: Array<Ref<Person>>) => Promise<Array<Ref<Person>>>
}
