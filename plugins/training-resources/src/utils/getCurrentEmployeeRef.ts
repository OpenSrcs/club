//
// Copyright © 2026 OpenSrcs.
//

import { type Ref } from '@opensrcs/core'
import { getCurrentEmployee, type Employee } from '@opensrcs/contact'

export function getCurrentEmployeeRef (): Ref<Employee> {
  return getCurrentEmployee()
}
