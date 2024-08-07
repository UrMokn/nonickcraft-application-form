import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { cn } from '@nextui-org/theme';
import type { ReactNode } from 'react';

export const FormSelectClassNames = {
  multiple: {
    trigger: 'py-2',
    base: 'md:max-w-[400px]',
  },
  single: {
    base: 'md:max-w-[320px]',
  },
};

export function FormCard({
  title,
  className,
  children,
}: { title?: string; className?: string; children: ReactNode }) {
  return (
    <Card>
      {title && (
        <CardHeader className='p-6'>
          <h3 className='text-lg font-semibold'>{title}</h3>
        </CardHeader>
      )}
      <CardBody className={cn('flex flex-col gap-6 p-6', { 'pt-0': title }, className)}>
        {children}
      </CardBody>
    </Card>
  );
}
