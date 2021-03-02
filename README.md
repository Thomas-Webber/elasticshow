# ElasticShow: A simple Stateless elasticsearch index browser
Elasticsearch data browser web-client. View and search all your data with style.

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
2. Run `yarn dev` to watch for updates and start the webserver


## Contributing and TODO
Feel free to fork and contribute, here are the features goals and improvements to do:

### Features:
- date filter
- help page
- refresh DataBrowser when multiple indexes in config
- i18n
- production build and Dockerfile


### Improvements:
- query explorer
- merge @appbaseio/reactivesearch dep
- on resize re-render table
- remove react warnings
- upgrade to typescript
- upgrade react and antd version https://ant.design/docs/react/migration-v4
- remove moment dependency https://ant.design/docs/react/replace-moment


## Licence
MIT