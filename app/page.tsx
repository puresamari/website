import { Octokit } from '@octokit/core';

import { FancyImage } from './fancy-image';
import { RepoCard } from './repo-card';
import { octokit } from './octokit';

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
      <div className="h-screen flex flex-col pb-8">
        <h1 className="type-headline h-16">サイモン・ルーカス・ロット</h1>
        <div className="flex-1 flex flex-row justify-end overflow-hidden items-center">
          <div className="text-right -mr-16 relative z-[1]">
            <p className="type-headline">Thats me {`>>>`}</p>
          </div>
          <FancyImage className="h-full flex w-auto" src="/me.png" width={3024} height={4032} alt="Me" />
        </div>
        <h1 className="type-headline ml-8">
          THIS PAGE IS <span className="text-yellow-500">WIP</span>
        </h1>
        <h1 className="type-headline">Simon rothert</h1>
        <h1 className="type-headline">Simon rothert</h1>
      </div>
      <h2>My projects:</h2>
      {data
        .filter(v => !v.fork && !v.private)
        .map(v => (
          <RepoCard key={v.id} {...(v as any)} />
        ))}
    </>
  );
}
