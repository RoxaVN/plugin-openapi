import {
  InferApiRequest,
  notFoundErrorFactory,
  TSchema,
} from '@roxavn/core/base';
import {
  ApiManager,
  BaseService,
  moduleManager,
  useApi,
} from '@roxavn/core/server';
import { schemaDefinitionApi } from '../../base/index.js';

const mapProperties = (name: string, schema: TSchema) => {
  return Object.entries(schema.properties ?? []).map(([key, value]) => {
    const {
      type: valueType = undefined,
      description,
      examples,
      ...schemaKeywords
    } = value as any;
    return {
      description,
      examples,
      schema: { type: valueType, ...schemaKeywords },
      in: name,
      name: key,
      required: schema.required?.includes(key) ?? false,
    };
  });
};

@useApi(schemaDefinitionApi.get)
export class GetSchemaDefinitionService extends BaseService {
  async handle(request: InferApiRequest<typeof schemaDefinitionApi.get>) {
    if (process.env.ROXAVN_STORIES) {
      const moduleInfo = moduleManager.modules.find(
        (m) => m.name === request.module
      );
      if (request.module && moduleInfo) {
        const apis = ApiManager.apiRoutes
          .filter((a) => a.api.module.name === request.module)
          .map((a) => a.api);
        const paths: any = {};
        for (const api of apis) {
          if (!paths[api.path]) {
            paths[api.path] = {};
          }
          paths[api.path][api.method.toLowerCase()] = {
            security: api.authorization && [{ tokenAuth: [] }],
            tags: [api.source.name],
            responses: {
              200: {
                description: 'Default Response',
                content: { 'application/json': { schema: api.response } },
              },
            },
            requestBody:
              api.method !== 'GET'
                ? {
                    content: { 'application/json': { schema: api.request } },
                    required: true,
                  }
                : undefined,
            parameters:
              api.method === 'GET'
                ? mapProperties('query', api.request)
                : undefined,
          };
        }

        return {
          openapi: '3.0.3',
          info: {
            title: moduleInfo.name,
            description: (moduleInfo as any).description,
            version: moduleInfo.version,
          },
          components: {
            securitySchemes: {
              tokenAuth: {
                description: 'Format: Bearer {access-token}',
                type: 'apiKey',
                name: 'Authorization',
                in: 'header',
              },
            },
            schemas: {},
          },
          paths,
        };
      }
    }
    throw notFoundErrorFactory.make();
  }
}
