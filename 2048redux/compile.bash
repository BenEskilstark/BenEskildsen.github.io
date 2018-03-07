#!/bin/bash

# remove bin so this doesn't recursively copy per each run

# npm run babel -- --plugins transform-react-jsx

# flow transform
# npm run babel -- --presets flow index.js
npm run babel -- js/ -d bin

# clientside require
npm run browserify -- bin/index.js -o bin/bundle.js




