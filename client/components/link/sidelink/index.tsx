import Link from 'next/link';
import * as React from 'react';

export interface SideLinkProps {
    label: string;
    href: string;
    position: 'text-center' | 'text-left' | 'text-right';
}

const SideLink: React.FunctionComponent<SideLinkProps> = ({ href, label, position }) => (
    <div className={position}>
        <Link href={href}>
            <a href={href} className="text-mercury text-sm duration-300 hover:text-malibu">
                {label}
            </a>
        </Link>
    </div>
);

export default SideLink;
