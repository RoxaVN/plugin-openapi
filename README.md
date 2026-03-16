# @roxavn/plugin-openapi

## Flow

### Gated Access
Documentation access is strictly controlled by the `ALLOW_OPENAPI` environment variable. If disabled, the documentation endpoints return a 404 response to ensure security in production environments.

### Dynamic Module Discovery
The documentation index scans all registered `ApiManager.apiRoutes` to identify installed RoxaVN modules. It generates a navigation list pointing to specialized JSON specification endpoints for each discovered module.

### Interactive UI Rendering
Integrated with `SwaggerUIBundle` to provide a standard, interactive interface for API exploration. It dynamically loads the necessary assets from a CDN and initializes the UI with the discovered module endpoints.

### On-the-fly Spec Generation
The specialized `json` endpoint generates an OpenAPI 3.0.3 specification in real-time for any requested module. It translates internal `TSchema` definitions into OpenAPI-compliant objects, including request bodies, query parameters, and security schemes (Bearer tokens).

## Environment variables

```
ALLOW_OPENAPI = 1 // by default, the OpenAPI URL will be hidden.
```

The plugin automatically generates OpenAPI documentation for all installed RoxaVN modules with swagger ui. It will create documentation at link

```
http://[DEV_SERVER]/__doc/openapi
```

Install

```bash
npm i -D @roxavn/plugin-openapi
```