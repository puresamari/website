import { Octokit } from '@octokit/core';

import { FancyImage } from './fancy-image';
import { RepoCard } from './repo-card';
import { octokit } from './octokit';
import { Panel } from '@/components/panel/panel.component';

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
        <p className="mt-4">
          Simon Rothert: a masterful tech maestro, skillfully orchestrating a symphony of code across continents,
          crafting digital wonders from the intricate web of languages, frameworks, and projects, all while garnishing
          his career with a sprinkle of design accolades.
        </p>
        <p className="type-body-3 mt-2 underline">- ChatGPT, March 2024</p>
      </Panel>

      {data
        .filter(v => !v.fork && !v.private)
        .map((v, i) => {
          const theme = ['red', 'beige', 'green', 'pink', 'blue'][i % 5];
          return <RepoCard key={v.id} {...(v as any)} theme={theme} />;
        })}

      <Panel theme="white" label="Footer" full>
        <footer className="text-left">
          <p>Crafted with ❤️ by Simon Rothert.</p>
          <br />
          Reach out on
          <a
            href="mailto:simon@rothert.cc"
            className="ml-2 underline hover:no-underline text-blue-600 underline-offset-8"
          >
            Email
          </a>
          <br />
          or check out my
          <a
            href="https://github.com/puresamari"
            className="ml-2 underline hover:no-underline text-blue-600 underline-offset-8"
          >
            GitHub
          </a>
        </footer>
      </Panel>
    </>
  );
}
