import { Octokit } from '@octokit/core';

import { FancyImage } from './fancy-image';
import { RepoCard } from './projects/repo-card';
import { octokit } from './projects/octokit';
import { Panel } from '@/components/panel/panel.component';
import { GetProjectGroups } from './projects/data';
import Link from 'next/link';

export default async function Home() {

  const groups = await GetProjectGroups();

  return (
    <div className='flex flex-row bg-red-500 border-t-2'>
      <div className='flex flex-col relative'>
        <div className='w-12 sticky top-0 left-0 h-64'>
          <h2 className='rotate-90 whitespace-nowrap text-2xl translate-y-5'>Simon Lukas Rothert</h2>
        </div>
      </div>
      <div className='flex flex-col w-full mt-32'>

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

        <Panel theme="beige" label="Projects" full>
          <ul>
            {Object.keys(groups).map((language) => (
              <li key={language}>
                <Link className="text-2xl underline" href={`/projects#${language.toLowerCase()}`}>
                  {language}
                </Link>
              </li>
            ))}
          </ul>
        </Panel>

      </div>
    </div>
  );
}
