import { octokit } from './octokit';
import { PropsData } from './repo-card';

type Project = PropsData & {
  id: number;
  url?: string;
  stars?: number;
  forks?: number;
  language: string;
};

type ProjectGroups = {
  [language: string]: Project[];
};

export const GetProjectGroups = async () => {
  const { data } = await octokit.request('GET /users/{username}/repos', {
    username: 'puresamari',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
    sort: 'updated',
  });

  return data
    .filter(v => !v.fork && !v.private)
    .sort((a, b) => (!b.language ? -1 : 0))
    .reduce((all, current) => {
      const project: Project = {
        id: current.id,
        name: current.name,
        description: current.description,
        url: current.html_url,
        stars: current.stargazers_count,
        forks: current.forks,
        language: current.language || 'other',
        owner: current.owner,
      };

      if (!all[project.language]) {
        all[project.language] = [];
      }

      all[project.language].push(project);

      return all;
    }, {} as ProjectGroups);
};
