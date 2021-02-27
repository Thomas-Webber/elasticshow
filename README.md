# Frontastic: Simple elasticsearch data browser
WORK IN PROGRESS <br>
Simple elasticsearch data browser web-client.
## Features:
- View of every elasticsearch indexes
- Filter rows with multiple conditions
- Sort rows with multiple conditions
- Export results to CSV

This repository is originally a fork of appbaseio/dejavu with the following philosophy:
- client only
- the app is simple to build and run
- focused on data filtering/sorting and export


## Deployment
### Docker Installation
```sh
docker run -p 1342:1342 -d appbaseio/dejavu
open http://localhost:1342/
```
### Cross-origin resource sharing (CORS)
To make sure you enable CORS settings for your Elasticsearch instance, add the following lines in the `elasticsearch.yml` configuration file.

```yaml
http.port: 9200
http.cors.allow-origin: 'http://localhost:1342'
http.cors.enabled: true
http.cors.allow-headers: X-Requested-With,X-Auth-Token,Content-Type,Content-Length,Authorization
http.cors.allow-credentials: true
```

## Development
1. Run `yarn` after cloning the repo to install dependencies
2. Run `yarn dev:browser` which starts the `watcher` under `packages/browser` package i.e. `@appbaseio/dejavu-browser`.
3. Run `yarn dev:dejavu` which starts the `webpack-dev-server` on port `1342`
4. Run `yarn format` to run prettier on `*.js` files.


## TODO
debug browser components
integrate @appbaseio/reactivesearch dep
improvments