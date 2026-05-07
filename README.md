# @roxavn/plugin-openapi

A RoxaVN plugin that automatically generates OpenAPI documentation for all installed modules and provides an interactive Swagger UI for exploration.

## Key Features

- **Dynamic Module Discovery**: Automatically identifies all installed RoxaVN modules by scanning registered API routes.
- **On-the-fly Spec Generation**: Real-time generation of OpenAPI 3 specifications from internal `TSchema` definitions.
- **Full API Metadata**: Supports request bodies, query parameters, responses, and security schemes (Bearer tokens).
- **Interactive UI**: Integrated with Swagger UI for easy API exploration and testing.
- **Security-First**: Documentation access can be gated to ensure security in production environments.

## How it Works

1. **Gated Access**: Access to documentation endpoints is strictly controlled. By default, it is enabled in story mode.
2. **Scanning**: The plugin scans `ApiManager.apiRoutes` to build a map of all available endpoints.
3. **Translation**: It translates RoxaVN's internal type system into OpenAPI-compliant schema objects.
4. **Rendering**: Swagger UI is initialized with the generated endpoints, allowing for direct interaction with the APIs.

## Usage

Open stories server

```
npx roxavn stories
```

Then go to document page of this plugin.
