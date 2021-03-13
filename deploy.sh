#!/bin/bash

rm -rf dist
npm run build

echo "** Syncing to production s3 bucket **"
aws s3 cp ./dist/  s3://static.iobio.io/prod/genepanel.iobio.io/ --recursive
echo "** Renew cloudfrount cache **"
aws cloudfront create-invalidation --distribution-id E14HSC209IWKWU --paths /\*
