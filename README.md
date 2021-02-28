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
- clean code architecture with lesser dependencies
- focused on data filtering/sorting and export
- high performance

## Deployment
### Docker Installation
```sh
docker run -p 1342:1342 -d appbaseio/dejavu
open http://localhost:1342/
```
### Elasticsearch CORS configurations
CORS settings for your Elasticsearch instance must be configured in the `elasticsearch.yml` configuration file.
```yaml
http.port: 9200
http.cors.allow-origin: 'http://localhost:1342'
http.cors.enabled: true
http.cors.allow-headers: X-Requested-With,X-Auth-Token,Content-Type,Content-Length,Authorization
http.cors.allow-credentials: true
```

## Development
1. Run `yarn` to install the dependencies
2. Run `./dev.sh` to compile the app, watch for changes and run a dev server on port 1358


## TODO
Features:
- debug browser components
- date filter
- read only view
- logout+indexes navigation
- error message
- i18n
- docker


Optimizations:
- clean dev dependencies
- integrate @appbaseio/reactivesearch dep
- upgrade react version
- antd upgrade https://ant.design/docs/react/migration-v4
- remove momentjs https://ant.design/docs/react/replace-moment