import { accessManager, Type } from '@roxavn/core/base';
import { baseModule } from './module.js';

export const resources = accessManager.makeResources(baseModule, {
  SchemaDefinition: {
    schema: Type.Object({
      openapi: Type.String(),
      info: Type.Any(),
      paths: Type.Any(),
      components: Type.Any(),
    }),
  },
});
