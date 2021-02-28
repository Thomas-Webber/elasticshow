#!/bin/bash

set -euo pipefail

[ ! -e web/antd.min.css ] && cp node_modules/antd/dist/antd.min.css web/antd.min.css

./node_modules/.bin/esbuild src/index.js --bundle --outfile=web/out.js \
	--loader:.js=tsx --loader:.svg=text \
	--target=chrome58,firefox57,safari11,edge16 \
	--define:process.env.NODE_ENV=\"development\" \
	--define:global=window \
	--sourcemap \
	--servedir=web/ \
	--serve=1358
