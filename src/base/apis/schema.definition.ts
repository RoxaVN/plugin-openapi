import { ApiSource, Type } from '@roxavn/core/base';
import { scopes } from '../access.js';
import { baseModule } from '../module.js';

const schemaDefinitionSource = new ApiSource(
  scopes.SchemaDefinition,
  baseModule
);

export const schemaDefinitionApi = {
  get: schemaDefinitionSource.api({
    method: 'GET',
    path: schemaDefinitionSource.apiPath(),
    request: Type.Object({ module: Type.String() }),
    response: scopes.SchemaDefinition.schema,
  }),
};
