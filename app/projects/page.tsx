
import { Panel, Theme } from '@/components/panel/panel.component';
import { GetProjectGroups } from './data';
import { RepoCard } from './repo-card';
import Link from 'next/link';

const GetThemeOfLanguage = (language: string): Theme => {
  switch (language.toLowerCase()) {
    case 'typescript':
      return 'blue';
    case 'javascript':
      return 'yellow';
    case 'python':
      return 'blue';
    case 'html':
      return 'orange';
    case 'css':
      return 'blue';
    case 'scss':
      return 'blue';
    case 'shell':
      return 'green';
    case 'rust':
      return 'beige';
    default:
      return 'black';
  }
}

export default async function Home() {
  const groups = await GetProjectGroups();

  return (
    <>
      <Link href="/" className='p-4'>Home</Link>
      {Object.entries(groups).map(([language, projects]) => (
        <Panel key={language} theme={GetThemeOfLanguage(language)} label={language} full id={language.toLowerCase()}>
          {projects.map((project, i) => {
            const theme = (['red', 'beige', 'green', 'pink', 'blue'] as const)[i % 5];
            return <RepoCard key={project.id} {...project} theme={theme} />;
          })}
        </Panel>
      ))}
    </>
  );
}
