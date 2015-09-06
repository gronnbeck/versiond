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

We try to be async. So many of our POST and DELETE endpoints cannot
guarantee that the action was persisted. The client has to double
using GET to verify that the action was completed.

**Peek on current config**
```
// Request
GET /v1/env/{env}/applications/{applicationId}

// Response
{
  "key1": "value1",
  "key2": "value2"
  // ...
  "keyN": "valueN"
}
```

**Add or update a config**
```
// Request
POST /v1/env/{env}/applications/{applicationId}

{
  "key1": "value1",
  "key2": "value2"
  // ...
  "keyN": "valueN"
}

// Response
{
  "id": "applicationId",
  "status": "creating"
}
```

**Delete current config**
```
// Request
DELETE /v1/env/{env}/applications/{applicationId}

// Response
{
  success: true
}

```

**Delete a key inside a config**
```
// Request
DELETE /v1/env/{env}/applications/{applicationId}/keys/{key}

// Response
{
  success: true
}
```

**Generate and store configuration**
```
// Request
POST /v1/env/{env}/applications/{applicationId}/generate

// Response
{
  "hash": "sha256hash", // can be used to get stored config
  "status": "creating"
}
```

**Get stored configuration**
```
// Request
GET /v1/config/stored/{sha256hash}

// Response
{
  "key1": "value1",
  "key2": "value2"
  // ...
  "keyN": "valueN"
}
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
