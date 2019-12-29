install:
	npm install
start:
	npx babel-node src/bin/gendiff.js
build:
	npm run build
lint:
	npx eslint .
publish:
	npm publish --dry-run
