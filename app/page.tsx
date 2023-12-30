import Link from 'next/link';
import { Group } from '@mantine/core';
import { Welcome } from './components/Welcome/Welcome';
import { ColorSchemeToggle } from './components/ColorSchemeToggle/ColorSchemeToggle';

export default function HomePage() {
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />

      <Group justify="center" mt="xl">
        <Link href="/upload">
          <span>Upload</span>
        </Link>
      </Group>
    </>
  );
}
