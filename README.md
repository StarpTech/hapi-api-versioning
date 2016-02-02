
[![Build Status](https://travis-ci.org/StarpTech/hapi-api-versioning.svg)](https://travis-ci.org/StarpTech/hapi-api-versioning)

Api versioning plugin for [**hapi**](https://github.com/hapijs/hapi)

```shell
npm install hapi-api-versioning
```

Example configuration:
```js
{
  register: require('hapi-api-versioning'),
  options: {
    defaultVersion: '1',
    vendor: 'github' // your company
  }
}

// accessible in the handler
request.pre.apiVersion

```

TODO
- [ ] Routing (optional)

Background:

[Github approach in the media api](https://developer.github.com/v3/media/)

[Using the Accept Header to version your API](http://labs.qandidate.com/blog/2014/10/16/using-the-accept-header-to-version-your-api)
