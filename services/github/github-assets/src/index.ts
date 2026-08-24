//
// Copyright © 2026 OpenSrcs.
//

import { loadMetadata } from '@opensrcs/club'
import github from '@opensrcs/github'

const icons = require('../assets/icons.svg') as string // eslint-disable-line
loadMetadata(github.icon, {
  Github: `${icons}#github`,
  GithubRepository: `${icons}#repository`,
  PullRequest: `${icons}#pullRequest`,
  PullRequestMerged: `${icons}#pullRequestMerged`,
  PullRequestClosed: `${icons}#pullRequestClosed`,
  Forks: `${icons}#forks`
})
