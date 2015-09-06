# Versiond

API for centralized configuration backed by etcd

## Disclaimer

This is just a side project of mine and it is either under under heavy
development or just abanonned, like many side projects.

## (Desired) Features
  * [x] Get flattened configuration
  * [x] Generate and store a configuration version
  * [x] Get stored configuration
  * [x] Support for environment
  * [x] Endpoint for writing to a non-stored configuration
  * [ ] Support global configs
  * [ ] Support Service Discovery. Not sure if I want to support this.
  * [ ] WebHook trigger when configs has changed
  * [x] Should be able to delete configuration that is no longer needed
  * [ ] Considering if NewConfig is OK for updating as well.

## API

**Peek on current config**
```
GET /v1/env/{env}/applications/{applicationId}
```

**Add or update a config**
```
POST /v1/env/{env}/applications/{applicationId}
```

**Delete current config**
```
DELETE POST /v1/env/{env}/applications/{applicationId}
```

**Delete a key inside a config**
```
DELETE POST /v1/env/{env}/applications/{applicationId}/key/{key}
```

**Generate and store configuration**
```
POST /v1/env/{env}/applications/{applicationId}
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
