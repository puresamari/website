import { Endpoints } from '@octokit/types';

export const RepoCard = (repo: Endpoints['GET /repos/{owner}/{repo}']['response']['data']) => {
  return (
    <>
      <hr className="my-4" />
      <h2 className="ml-8">
        {repo.name}
        <sub>{repo.language}</sub>:
      </h2>
      <p className="ml-4 type-body-3 ">{repo.description}</p>
    </>
  );
};
