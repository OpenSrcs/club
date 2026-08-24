#!/bin/bash

git subtree pull --prefix=foundations/utils git@github.com:opensrcs/club.utils.git main
git subtree pull --prefix=foundations/core git@github.com:opensrcs/club.core.git main
git subtree pull --prefix=foundations/server git@github.com:opensrcs/club.server.git main
git subtree pull --prefix=foundations/net git@github.com:opensrcs/club.net.git main

git subtree pull --prefix=foundations/clublake git@github.com:opensrcs/clublake.git master
git subtree pull --prefix=foundations/clubpulse git@github.com:opensrcs/clubpulse.git main
git subtree pull --prefix=foundations/communication git@github.com:opensrcs/communication.git main
