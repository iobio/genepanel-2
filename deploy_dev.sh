#!/bin/bash

rm -rf dist
npm run build

echo "** Syncing to dev s3 bucket **"
aws s3 cp ./dist/  s3://static.iobio.io/dev/panel.iobio.io/ --recursive
echo "** Renew cloudfrount cache **"
aws cloudfront create-invalidation --distribution-id E2ZI10KD8X77ZL --paths /\*




	