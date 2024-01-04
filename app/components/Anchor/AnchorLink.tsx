import type { FC } from 'react';
import { Anchor } from '@mantine/core';
import styles from './AnchorLink.module.css';

type AnchorLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

const AnchorLink: FC<AnchorLinkProps> = ({ href, children, className }) => (
  <Anchor
    href={href}
    target="_blank"
    underline="always"
    className={`${styles.container} ${className}`}
  >
    {children}
  </Anchor>
);

export default AnchorLink;
