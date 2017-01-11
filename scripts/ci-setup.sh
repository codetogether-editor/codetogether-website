#!/bin/sh

# Check for asdf and install in case it doesn't exist
if ! asdf | grep version
then
    git clone https://github.com/HashNuke/asdf.git ~/.asdf
fi

# Add Nodejs plugins
asdf plugin-add nodejs https://github.com/asdf-vm/asdf-nodejs.git

# Install plugins based on .tool-versions file
asdf install
