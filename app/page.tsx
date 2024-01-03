import Link from 'next/link';
import { Group } from '@mantine/core';
import { Welcome } from './components/Welcome/Welcome';
import { ColorSchemeToggle } from './components/ColorSchemeToggle/ColorSchemeToggle';

export default function HomePage() {
  const links = [
    {
      id: '1',
      href: '/upload',
      text: 'Upload',
    },
    {
      id: '2',
      href: '/camera-upload',
      text: 'Camera Upload',
    },
  ];

  return (
    <>
      <Welcome />
      <ColorSchemeToggle />

      <Group justify="center" mt="xl">
        {links.map(({ id, href, text }) => (
          <Link key={id} href={href}>
            <span>{text}</span>
          </Link>
        ))}
      </Group>
    </>
  );
}
