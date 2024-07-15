.DEFAULT_GOAL := serve
MAKEFLAGS += --no-print-directory --silent

# Variables and targets are underscore-prefixed to prevent them from appearing
# in Bash autocomplete
_S3_PREFIX_PROD = "duo-mingle.internal"
_S3_PREFIX_STAGE = "duo-mingle-stage.internal"

# Create production files in /dist
.PHONY: build
build: config
	scripts/docker npx webpack --config config/webpack.config.js --mode production

# Check code style, raising an error upon failure
.PHONY: ci
ci: eslint

# Compiles TypeScript files in the config/ directory.
.PHONY: config
config: _check-node-deps
	scripts/docker npx tsc -p config

# Upload non-hashed files last to ensure that their referenced assets
# already exist on S3. Requires AWS credentials with S3 upload permissions.
.PHONY: deploy-prod
deploy-prod:
	scripts/docker aws s3 cp dist/ s3://$(_S3_PREFIX_PROD).duolingo.com \
		--cache-control max-age=31536000 \
		--exclude "*" \
		--include "static/*" \
		--recursive
	scripts/docker aws s3 cp dist/ s3://$(_S3_PREFIX_PROD).duolingo.com \
		--cache-control no-cache \
		--exclude "static/*" \
		--recursive

# Upload non-hashed files last to ensure that their referenced assets
# already exist on S3. Requires AWS credentials with S3 upload permissions.
.PHONY: deploy-stage
deploy-stage:
	scripts/docker aws s3 cp dist/ s3://$(_S3_PREFIX_STAGE).duolingo.com \
		--cache-control max-age=31536000 \
		--exclude "*" \
		--include "static/*" \
		--recursive
	scripts/docker aws s3 cp dist/ s3://$(_S3_PREFIX_STAGE).duolingo.com \
		--cache-control no-cache \
		--exclude "static/*" \
		--recursive

.PHONY: eslint
eslint: _check-node-deps
	scripts/docker npx eslint --ext=.ts,.tsx --max-warnings=0 config
	scripts/docker npx eslint --ext=.ts,.tsx --max-warnings=0 src

.PHONY: eslint-fix
eslint-fix: _check-node-deps
	scripts/docker npx eslint --ext=.ts,.tsx --fix config
	scripts/docker npx eslint --ext=.ts,.tsx --fix src

.PHONY: install
install:
	NODE_ENV= scripts/docker npm ci # NODE_ENV= to always include devDependencies

.PHONY: proxy
proxy: _check-node-deps
	npx lcp --proxyUrl https://duo-mingle.duolingo.com --port 5000 --proxyPartial '' --credentials --origin http://localhost:8080

.PHONY: serve
serve: config
	npx webpack serve --config config/webpack.config.js --mode development --env api='http://localhost:5000/api'

.PHONY: stylelint
stylelint: _check-node-deps
	npx stylelint --config config/stylelint.config.js "src/**/*.scss"

.PHONY: test
test: config
	npx jest --config config/jest.config.js --silent --watch

.PHONY: _check-node-deps
_check-node-deps:
	scripts/docker python3 scripts/check-dependencies.py || make install
