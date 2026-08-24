import { makeLocalesTest } from '@opensrcs/club'

it(
  'Locales are equal',
  makeLocalesTest((lang) => import(`../../lang/${lang}.json`))
)
