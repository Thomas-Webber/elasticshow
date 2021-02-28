# ElasticShow: A simple Stateless elasticsearch data browser
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


### Elasticsearch CORS configurations
CORS settings for your Elasticsearch instance must be configured in the `elasticsearch.yml` configuration file.
```yaml
http.port: 9200
http.cors.allow-origin: 'http://localhost:1358'
http.cors.enabled: true
http.cors.allow-headers: X-Requested-With,X-Auth-Token,Content-Type,Content-Length,Authorization
http.cors.allow-credentials: true
```

## Development
1. Run `yarn` to install the dependencies
2. Run `yarn build` to compile the app in the `web` directory


## TODO
Features:
- read only view
- logout and indexes navigation
- date filter
- i18n
- production build and Dockerfile


Optimizations:
- clean dev dependencies
- remove @appbaseio/reactivesearch dep
- remove lodash dep
- remove lodash dep
- upgrade react version
- antd upgrade https://ant.design/docs/react/migration-v4
- remove momentjs https://ant.design/docs/react/replace-moment