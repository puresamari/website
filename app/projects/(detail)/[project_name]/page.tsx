import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';

import { BreadCrumbs } from '@/components/breadcrumbs.component';
import { Panel } from '@/components/panel/panel.component';

import { GetProjectByKey } from '../../data';
import { octokit } from '../../octokit';

export default async function Project({ params }: { params: { project_name: string } }) {
  const project = await GetProjectByKey(params.project_name);

  if (!project)
    notFound();

  try {
    const { data: readme } = await octokit.request('GET /repos/{owner}/{repo}/readme', {
      owner: project.owner.name || 'puresamari',
      repo: project.name,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      mediaType: { format: 'raw' },
    });
    return (
      <>
        <BreadCrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Projects', href: '/projects' }]}>{project.name}</BreadCrumbs>
        {project.description && <Panel theme="blue" >{project.description}</Panel>}
        <Panel label={project.name.toUpperCase()} theme="pink">
          <Markdown urlTransform={v => `${project.url}/raw/main${v}`}>{readme as any}</Markdown>
        </Panel>
      </>
    );
  } catch (e) {
    return (
      <>
        <BreadCrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Projects', href: '/projects' }]}>{project.name}</BreadCrumbs>
        {project.description && <Panel theme="blue" >{project.description}</Panel>}
      </>
    );
  }


}