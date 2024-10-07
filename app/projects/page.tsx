

import { BreadCrumbs } from '@/components/breadcrumbs.component';
import { Panel, Theme } from '@/components/panel/panel.component';

import { GetProjectGroups } from './data';
import { RepoCard } from './repo-card';

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
      <BreadCrumbs crumbs={[{ label: 'Home', href: '/' }]}>Projects</BreadCrumbs>
      {Object.entries(groups).map(([language, projects]) => (
        <Panel key={language} theme={GetThemeOfLanguage(language)} label={language} id={language.toLowerCase()}>
          {projects.map((project, i) => <RepoCard {...project} theme={(['red', 'beige', 'green', 'pink', 'blue'] as const)[i % 5]} />)}
        </Panel>
      ))}
    </>
  );
}
