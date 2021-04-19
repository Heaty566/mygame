import * as React from 'react';
import Link from 'next/link';

import config from './config';
import { useTestId } from '../../../test/helper/data-testId';

export interface NavbarMenuProps {}

const NavbarMenu: React.FunctionComponent<NavbarMenuProps> = () => (
    <ul className=" hidden space-x-3.5 md:flex" id="navbar-menu">
        {config.map((item) => (
            <li key={item.label}>
                <Link href={item.link}>
                    <a href={item.link} className="duration-300 text-cloud hover:text-cloud-50" {...useTestId(`navbarMenu-link-${item.label}`)}>
                        {item.label}
                    </a>
                </Link>
            </li>
        ))}
    </ul>
);

export default NavbarMenu;
