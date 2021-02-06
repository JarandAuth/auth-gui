#!/bin/bash

npm run build
cp -r build/ docs/
git add .
git commit -m "Upload to pages"
git push
