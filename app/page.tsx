import Image from 'next/image';
import { FancyImage } from './fancy-image';
import { Octokit } from '@octokit/core';
import { Repo } from './repo.model';
import { RepoCard } from './repo-card';

const octokit = new Octokit({
  auth: process.env.GH,
});

export default async function Home() {
  // GH
  // const repos = await fetch('https://api.github.com/users/puresamari/repos');
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
        <h1 className="type-headline ml-8">THIS PAGE IS <span className='text-yellow-500'>WIP</span></h1>
        <h1 className="type-headline">Simon rothert</h1>
        <h1 className="type-headline">Simon rothert</h1>
      </div>
      <h2>My projects:</h2>
      {data
        .filter(v => !v.fork)
        .map(v => (
          <RepoCard key={v.id} {...(v as any)} />
        ))}
    </>
  );
}
