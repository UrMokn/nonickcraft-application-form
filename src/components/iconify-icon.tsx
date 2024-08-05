'use client';

import { Icon, type IconifyIconProps } from '@iconify-icon/react/dist/iconify.mjs';

export function IconifyIcon(props: Omit<IconifyIconProps, 'ref'>) {
  return <Icon {...props} />;
}
