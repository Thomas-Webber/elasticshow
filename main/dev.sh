#!/bin/bash

./node_modules/.bin/esbuild app/src/index.js --bundle --outfile=web/out.js \
	--loader:.js=tsx --loader:.svg=text \
	--format=iife \
	--target=chrome58,firefox57,safari11,edge16 \
	--define:process.env.NODE_ENV=\"development\" \
	--sourcemap \
	--servedir=web/ \
	--serve=1358
