import Link from 'next/link';
import * as React from 'react';
import { useTestId } from '../../../test/helper/data-testId';

export interface BtnLinkProps {
    label: string;
    href: string;
}

const BtnLink: React.FunctionComponent<BtnLinkProps> = ({ label, href }) => (
    <Link href={href}>
        <a
            href={href}
            className="inline-block px-8 py-2 text-white duration-300 bg-gray-800 rounded-sm outline-none hover:bg-gray-900"
            {...useTestId(`btnLink-${label}`)}
        >
            {label}
        </a>
    </Link>
);

export default BtnLink;
