#!/bin/bash

# NVM
if ! [ -e ~/.nvm/nvm.sh ]; then
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
  export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
  source ~/.bashrc
  nvm install 18
  nvm use 18
  source ~/.bashrc
  echo "NVM Installed"
  source ~/.bashrc
  . ~/.nvm/nvm.sh
  npm install --global yarn
fi
# End NVM

# NextJS start
if ! [ -e ./dist/ ]; then
  yarn install
  yarn build
  yarn run
fi
# END NextJS start