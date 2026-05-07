import { ApiManager } from '@roxavn/core/server';
import { useEffect } from 'react';
import {
  type LinksFunction,
  type MetaFunction,
  useLoaderData,
} from 'react-router';
import { schemaDefinitionApi } from '../../base/index.js';

export async function loader() {
  const result = new Set<string>();
  for (const m of ApiManager.apiRoutes) {
    result.add(m.api.module.name);
  }
  return [...result].map((m) => ({
    name: m,
    url: schemaDefinitionApi.get.path + '?module=' + decodeURIComponent(m),
  }));
}

export default function () {
  const urls = useLoaderData<typeof loader>();

  useEffect(() => {
    const w: any = window;
    w.ui = w.SwaggerUIBundle({
      urls,
      dom_id: '#swagger-ui',
      layout: 'StandaloneLayout',
      presets: [w.SwaggerUIBundle.presets.apis, w.SwaggerUIStandalonePreset],
      docExpansion: 'list',
      deepLinking: false,
      persistAuthorization: true,
      tagsSorter: 'alpha',
      responseInterceptor: (response: any) => {
        const resp = JSON.parse(response.text);
        response.text = JSON.stringify(resp.data);
        return response;
      },
    });
  }, []);

  return (
    <div>
      <div id="swagger-ui"></div>
      <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-standalone-preset.js"></script>
      <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js"></script>
    </div>
  );
}

export const meta: MetaFunction = () => [{ title: 'OpenAPI Documentation' }];

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css',
    },
  ];
};
