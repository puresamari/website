import { Endpoints } from '@octokit/types';
import { octokit } from './octokit';
import { Markdown } from './markdown';

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
    return <Markdown>{readme as any}</Markdown>;
  } catch (e) {
    return <></>;
  }
};

export const RepoCard = async (repo: Endpoints['GET /repos/{owner}/{repo}']['response']['data']) => {
  return (
    <>
      <hr className="mb-4" />
      <h2 className="ml-8">
        {repo.name}
        <sup className="bg-yellow rounded-full px-2 py-1">{repo.languages_url}</sup>:
      </h2>
      <p className="ml-4 type-body-3 mb-8">{repo.description}</p>
      <RepoReadme {...repo} />
    </>
  );
};
