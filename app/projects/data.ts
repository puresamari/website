import { octokit } from './octokit';
import { RepoCardPropsData } from './repo-card';

type Project = RepoCardPropsData & {
  key: string;
  stars?: number;
  forks?: number;
  language: string;
  description?: string;
  url: string;
};

type Projects = { [key: string]: Project };
type ProjectGroups = { [language: string]: Project[] };

export const GetProjects = async (): Promise<Projects> => {
  const { data } = await octokit.request('GET /users/{username}/repos', {
    username: 'puresamari',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
    sort: 'updated',
  });

  return data
    .filter(v => !v.fork && !v.private)
    .reduce((all, current) => {
      const project: Project = {
        // id: current.id,
        key: current.name.toLowerCase(),
        name: current.name,
        description: current.description || undefined,
        // url: current.html_url,
        stars: current.stargazers_count,
        forks: current.forks,
        owner: current.owner,
        language: current.language || 'other',
        url: current.html_url,
      };

      return { ...all, [project.key]: project };
    }, {} as Projects);
};

export const GetProjectByKey = async (key: string): Promise<Project | undefined> => (await GetProjects())[key];

export const GetProjectGroups = async () =>
  (Object.values(await GetProjects()) as Project[])
    .sort((a, b) => (!b.language ? -1 : 0))
    .reduce((all, project) => {
      if (!all[project.language]) all[project.language] = [];
      all[project.language].push(project);
      return all;
    }, {} as ProjectGroups);
