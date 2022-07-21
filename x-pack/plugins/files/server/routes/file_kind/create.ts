/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { schema, TypeOf } from '@kbn/config-schema';
import { Ensure } from '@kbn/utility-types';
import type { CreateFileKindHttpEndpoint } from '../../../common/api_routes';
import type { FileKindsRequestHandler } from './types';
import * as commonSchemas from './common_schemas';

export const method = 'post' as const;

export const bodySchema = schema.object({
  name: commonSchemas.fileName,
  alt: commonSchemas.fileAlt,
  meta: commonSchemas.fileMeta,
  mimeType: schema.maybe(schema.string()),
});

type Body = Ensure<CreateFileKindHttpEndpoint['inputs']['body'], TypeOf<typeof bodySchema>>;

type Response = CreateFileKindHttpEndpoint['output'];

export const handler: FileKindsRequestHandler<unknown, unknown, Body> = async (
  { fileKind, files },
  req,
  res
) => {
  const { fileService } = await files;
  const {
    body: { name, alt, meta, mimeType },
  } = req;
  const file = await fileService
    .asCurrentUser()
    .create({ fileKind, name, alt, meta, mime: mimeType });
  const body: Response = {
    file: file.toJSON(),
  };
  return res.ok({ body });
};
