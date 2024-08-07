import { NavbarContent, NavbarItem, Navbar as NextUINavbar } from '@nextui-org/navbar';
import { UserDropdown } from './user-dropdown';

export function Navbar() {
  return (
    <NextUINavbar maxWidth='md' position='static' classNames={{ base: 'h-20' }}>
      <NavbarContent justify='end'>
        <NavbarItem>
          <UserDropdown />
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
}
