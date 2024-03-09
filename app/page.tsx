import { Octokit } from '@octokit/core';

import { FancyImage } from './fancy-image';
import { RepoCard } from './repo-card';
import { octokit } from './octokit';
import { Panel } from '@/components/panel.component';

export default async function Home() {
  const { data } = await octokit.request('GET /users/{username}/repos', {
    username: 'puresamari',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
    sort: 'updated',
  });

  return (
    <>
      <Panel
        theme="black"
        label="サイモン・ルーカス・ロット"
        full
        sticky={{
          children: <FancyImage className="h-auto flex w-64" src="/me.png" width={3024} height={4032} alt="Me" />,
        }}
      >
        <p className='mt-4'>
          Simon Rothert: a masterful tech maestro, skillfully orchestrating a symphony of code across continents,
          crafting digital wonders from the intricate web of languages, frameworks, and projects, all while garnishing
          his career with a sprinkle of design accolades.
        </p>
        <p className='type-body-3 mt-2 underline'>- ChatGPT, March 2024</p>
      </Panel>

      {data
        .filter(v => !v.fork && !v.private)
        .map((v, i) => {
          const theme = ['red', 'beige', 'green', 'pink', 'blue'][i % 5];
          return <RepoCard key={v.id} {...(v as any)} theme={theme} />;
        })}

      <Panel theme="white" label="Footer" full>
        <footer>
          <p>
            The footer is the bottom of a page. In HTML, this section is expressed by the <code>{'<footer>'}</code> tag,
            which contains all the elements that should be there. As a rule, the footer is the same on each page of a
            website. It is therefore included in the page template to allow it to be multiplied throughout the site.
            Furthermore, as the footer is the last element of a page that is viewed, it is important to optimise it to
            make it attractive and interesting. More specifically, the footer of a site can contain: SEO optimised text
            with strategic keywords, company contact information (address, contact details), the sitemap, the site’s
            legal notice, internal links to pages on the site (contact, about us, etc.), secondary navigation links,
            your social networks, etc.
          </p>
        </footer>
      </Panel>
    </>
  );
}
