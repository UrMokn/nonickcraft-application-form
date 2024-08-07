import { z } from 'zod';

export const applicationSchema = z
  .object({
    javaId: z
      .string()
      .transform((v) => (!v.length ? null : v))
      .nullable(),
    bedrockId: z
      .string()
      .transform((v) => (!v.length ? null : v))
      .nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.javaId?.length && !/^[a-zA-Z0-9_]{2,16}$/.test(data.javaId)) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '無効なIDです。',
        path: ['javaId'],
      });
    }

    if (data.bedrockId?.length && !/^(?!\d)(?:[a-zA-Z0-9 ]){3,18}$/.test(data.bedrockId)) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '無効なIDです。',
        path: ['bedrockId'],
      });
    }

    if (!data.javaId && !data.bedrockId) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'いずれかのIDを入力してください。',
        path: ['javaId'],
      });
    }
  });
