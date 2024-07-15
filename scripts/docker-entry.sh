#!/bin/bash

# Consume arguments of the form "ENV_VAR=" and export them into the environment.
# This ensures that the first argument is the actual command, and we can run
# by just doing "$@"
while [[ $1 =~ ^[A-Z_a-z0-9]+= ]]; do
  export "$1"
  shift
done

# Run the command
"$@"
