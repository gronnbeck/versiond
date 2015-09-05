# Versiond

API for centralized configuration backed by etcd

## Disclaimer

This is just a side project of mine and it is either under under heavy
development or just abanonned, like many side projects.

## (Desired) Features
  * [x] Get flattened configuration
  * [x] Generate and store a configuration version
  * [x] Get stored configuration
  * [ ] Endpoint for writing to a non-stored configuration
  * [ ] Support global configs
  * [ ] Support Service Discovery. Not sure if I want to
  support this.
  * [ ] WebHook trigger when configs has changed

## API

**Peek on current config**
```
GET /v1/config/applications/{applicationId}
```

**Generate and store configuration**
```
POST /v1/config/applications/{applicationId}
```

**Get stored configuration**
```
GET /v1/config/stored/{sha256hash}
```


## Contribute

Download the current repository and install dependencies

```sh
npm install
```

start the application using

```
node index.js
```

and create a pull request.
