import { Endpoints } from '@octokit/types';

export const RepoCard = (repo: Endpoints['GET /repos/{owner}/{repo}']['response']['data']) => {
  return (
    <>
      <hr className="mb-4" />
      <h2 className="ml-8">
        {repo.name}
        <sup className="bg-yellow rounded-full px-2 py-1">{repo.language}</sup>:
      </h2>
      <p className="ml-4 type-body-3 mb-8">{repo.description}</p>
    </>
  );
};
