'use client';

import { FormControl, FormField, FormItem, FormLabel } from '@/components/form';
import { FormCard } from '@/components/form-utils';
import { applicationSchema } from '@/lib/database/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { cn } from '@nextui-org/theme';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { z } from 'zod';
import { postApplication } from './action';

export function Form() {
  const form = useForm<z.input<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: { javaId: '', bedrockId: '' },
  });

  async function onSubmit(value: z.output<typeof applicationSchema>) {
    const res = await postApplication(value);
    if (!res?.ok) toast.error(`問題が発生しました。\n${res?.error}`);
  }

  return (
    <FormProvider {...form}>
      <form className={cn('flex flex-col gap-4')}>
        <FormCard>
          <FormField
            control={form.control}
            name='javaId'
            render={({ field: { onChange, value }, fieldState: { invalid } }) => (
              <FormItem dir='row' mobileDir='col'>
                <FormLabel title='Java版のアカウント名' />
                <FormControl>
                  <Input
                    className='md:w-[300px]'
                    onChange={onChange}
                    value={value ?? ''}
                    placeholder='IDを入力 (省略可)'
                    isInvalid={invalid}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='bedrockId'
            render={({ field: { onChange, value }, fieldState: { invalid } }) => (
              <FormItem dir='row' mobileDir='col'>
                <FormLabel title='統合版のアカウント名' />
                <FormControl>
                  <Input
                    className='md:w-[300px]'
                    onChange={onChange}
                    value={value ?? ''}
                    placeholder='IDを入力 (省略可)'
                    isInvalid={invalid}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </FormCard>
        <div className='flex justify-end pb-6'>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            color='primary'
            isLoading={form.formState.isSubmitting}
            isDisabled={!form.formState.isDirty}
          >
            申請
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
