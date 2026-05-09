import { ApiManager } from '@roxavn/core/server';
import { useEffect, useRef } from 'react';
import {
  type LinksFunction,
  type MetaFunction,
  useLoaderData,
} from 'react-router';
import { SwaggerUIBundle, SwaggerUIStandalonePreset } from 'swagger-ui-dist';
import { schemaDefinitionApi } from '../../base/index.js';
import { webModule } from '../../web/index.js';

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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      SwaggerUIBundle({
        urls,
        domNode: ref.current,
        layout: 'StandaloneLayout',
        presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
        docExpansion: 'list',
        deepLinking: false,
        persistAuthorization: true,
        tagsSorter: 'alpha',
        responseInterceptor: (response) => {
          const resp = JSON.parse(response.text);
          response.text = JSON.stringify(resp.data);
          return response;
        },
      });
    }
  }, [ref.current]);

  return <div ref={ref}></div>;
}

export const meta: MetaFunction = () => [{ title: 'OpenAPI Documentation' }];

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: webModule.resolveStaticPath('/swagger-ui.css'),
    },
  ];
};
