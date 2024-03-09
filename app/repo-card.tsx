import { Endpoints } from '@octokit/types';
import { octokit } from './octokit';
import { Markdown } from '../components/markdown';
import { Collapsible } from '@/components/collapsible';
import { Panel, Theme } from '@/components/panel.component';

const RepoReadme = async (repo: Endpoints['GET /repos/{owner}/{repo}']['response']['data']) => {
  try {
    const { data: readme } = await octokit.request('GET /repos/{owner}/{repo}/readme', {
      owner: repo.owner.name || 'puresamari',
      repo: repo.name,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      mediaType: { format: 'raw' },
    });
    return (
      <Markdown>{readme as any}</Markdown>
      // <Collapsible>
      // </Collapsible>
    );
  } catch (e) {
    return <></>;
  }
};

export const RepoCard = async ({
  theme,
  ...repo
}: Endpoints['GET /repos/{owner}/{repo}']['response']['data'] & { theme: Theme }) => {
  return (
    <Panel theme={theme} label={repo.name}>
      {/* <hr className="mb-4" />
      <h2 className="ml-4">{repo.name}</h2> */}
      <div className="ml-4">
        <sup className="bg-yellow rounded-full px-1 py-[0.5] bg-yellow-500 ml-1 text-black type-chip">
          {repo.language}
        </sup>
      </div>
      <p className="ml-4 type-body-3 mb-8">{repo.description}</p>
      <RepoReadme {...repo} />
    </Panel>
  );
};
