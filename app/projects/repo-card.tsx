import { PanelLink } from '@/components/panel/panel-link.component';
import { Theme } from '@/components/panel/panel.component';
import { Endpoints } from '@octokit/types';

export type RepoCardPropsData = Pick<Endpoints['GET /repos/{owner}/{repo}']['response']['data'], 'name'> & { owner: Pick<Endpoints['GET /repos/{owner}/{repo}']['response']['data']['owner'], 'name'> };

export const RepoCard = async ({
  theme,
  name
}: RepoCardPropsData & { theme: Theme }) => (
  <PanelLink theme={theme} href={`/projects/${name.toLowerCase()}`}>
    {name}
  </PanelLink>
);
