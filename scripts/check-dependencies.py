#!/usr/bin/env python3
"""
Our own implementation of the `check-dependencies` npm package, which is buggy
in its inability to detect version mismatches of in-house packages like web-ui
"""

import json
import os
import re
import sys


def main():
    # Read this repo's package.json
    with open("package.json") as f:
        package_json = json.load(f)

    # Loop through dependencies
    success = True
    for dependency, expected_version in {
        **package_json.get("dependencies", {}),
        **package_json.get("devDependencies", {}),
    }.items():
        # If expected_version !
        if expected_version.endswith(".tgz"):
            # This is an internal package, assume the version number is right
            # before the ".tgz" extension
            expected_version = (
                re.compile(r"^.*?(\d+\.\d+\.\d+)\.tgz$").match(expected_version).group(1)
            )

        # Check whether dependency is installed
        path = f"node_modules/{dependency}/package.json"
        if not os.path.exists(path):
            print(f"Package '{dependency}' is not installed")
            success = False
            continue

        # Read dependency's package.json
        with open(path) as f:
            package_json = json.load(f)

        # Check whether dependency is at expected version
        actual_version = package_json.get("version", "")
        if actual_version != expected_version:
            print(f"Package '{dependency}' is at {actual_version} but expected {expected_version}")
            success = False

    if not success:
        sys.exit(1)


if __name__ == "__main__":
    main()
