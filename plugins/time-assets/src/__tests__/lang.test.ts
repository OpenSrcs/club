import { makeLocalesTest } from '@opensrcs/club'

it(
  'Locales are equale',
  makeLocalesTest((lang) => import(`../../lang/${lang}.json`))
)
