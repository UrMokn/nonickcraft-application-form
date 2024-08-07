'use client';

import { Avatar } from '@nextui-org/avatar';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import { User } from '@nextui-org/user';
import { signOut, useSession } from 'next-auth/react';

export function UserDropdown() {
  const { data: session } = useSession();
  if (!session) return null;

  return (
    <Dropdown showArrow placement='bottom-end'>
      <DropdownTrigger>
        <Avatar
          as='button'
          size='sm'
          name={session.user.name}
          src={session.user.image}
          showFallback
        />
      </DropdownTrigger>
      <DropdownMenu
        variant='flat'
        aria-label='Discordアカウントの情報を表示するドロップダウン'
        disabledKeys={['profile']}
      >
        <DropdownSection showDivider>
          <DropdownItem key='profile' textValue='profile' className='opacity-100' isReadOnly>
            <User
              name={session.user.name}
              avatarProps={{
                size: 'sm',
                src: session.user.image,
              }}
            />
          </DropdownItem>
        </DropdownSection>
        <DropdownItem onClick={() => signOut()} color='danger' key='logout' textValue='logout'>
          ログアウト
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
