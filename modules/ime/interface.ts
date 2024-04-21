import { zod } from './deps.ts'

const IMERecordSchema = zod.tuple([zod.string(), zod.string()]);
const IMETypeSchema = zod.union([
  zod.literal('disabled'),
  zod.literal('transliterate'),
  zod.literal('lookup'),
],{
  required_error: "Type is required",
  invalid_type_error: "Type must be one of: disabled, transliterate, lookup",
});

export const IMESchema = zod.object({
  id: zod.string({
    required_error: "ID is required",
    invalid_type_error: "ID must be a string",
  }),
  type: IMETypeSchema,
  name: zod.string(),
  description: zod.string(),
  version: zod.string(),
  data: zod.array(IMERecordSchema),
  altData: zod.array(IMERecordSchema).optional(),
});

export type IMEType = zod.infer<typeof IMESchema>;