export interface BioLink {
  text: string;
  url: string;
  external?: boolean;
}

export interface ContactItem {
  label: string;
  value: string;
  url: string;
  type: 'email' | 'social';
  external?: boolean;
}

export interface SiteConfig {
name: string;
title: string;
description: string;
author: string;
keywords: string[];
url: string;
locale: string;
type: string;
bio: {
text: string;
links?: BioLink[];
};
contact: {
email: string;
linkedin: string;
x: string;
github: string;
};
contactDisplay: ContactItem[];
}

export const siteConfig: SiteConfig = {
  name: 'Inky Ganbold',
  title: 'Inky Ganbold - Hackathon Winner & Open Source Contributor',
  description: 'Portfolio of Inky Ganbold, a CS student at De Anza who has won 11 prizes across 26 hackathons including YC Agent Hack, Stanford TreeHacks, HackMIT, and MIT Energy Hack. Active open-source contributor and hackathon organizer.',
  author: 'Inky Ganbold',
  keywords: ['Inky Ganbold', 'hackathon winner', 'computer science', 'open source', 'Stanford TreeHacks', 'HackMIT', 'YC Agent Hack', 'De Anza College', 'software developer', 'hackathon organizer'],
  url: 'https://enk.icu',
  locale: 'en_US',
  type: 'website',
  bio: {
    text: '11x hackathon winner across 26 hackathons (incl. YC Agent Hack, Stanford TreeHacks, HackMIT, MIT Energy Hack, Harvard Hack, etc.). Hosted 3 (incl. [DAHacks], [DAHacks 3.0]);  ~4,900 commits on [Github]. 3 open-source circuit designs on [OSHWLab]. GDSC member; invited to [Google I/O] 2024 & 2025. Represented Mongolia at [FIRST Global 2019]. Active on [Medium]. CS student at De Anza.',
    links: [
      {
        text: 'Medium',
        url: 'https://enkhy.medium.com/',
        external: true
      },
      {
        text: 'OSHWLab',
        url: 'https://oshwlab.com/enkhbold470',
        external: true
      },
      {
        text: 'DAHacks',
        url: 'https://deanzahacks.com',
        external: true
      },
      {
        text: 'DAHacks 3.0',
        url: 'https://lavozdeanza.com/multimedia/video/2024/10/31/student-hackers-compete-at-da-hacks-3-0-hack-a-thon-for-over-7500-in-prizes/',
        external: true
      },
      {
        text: 'Github',
        url: 'https://github.com/enkhbold470',
        external: true
      },
      {
        text: 'Google I/O',
        url: 'https://www.linkedin.com/posts/enkhbold470_googleio-googleio-activity-7330860474412032001-yrzG',
        external: true
      },
      {
        text: 'FIRST Global 2019',
        url: 'https://first.global/2019-nations/mongolia-2019/',
        external: true
      }

    ]

  },
  contact: {
    email: 'inky@enk.icu',
    linkedin: 'https://www.linkedin.com/in/enkhbold470/',
    x: 'https://x.com/1nkfy',
    github: 'https://github.com/enkhbold470'
  },
  contactDisplay: [
    {
      label: 'X',
      value: 'X',
      url: 'https://x.com/1nkfy',
      type: 'social',
      external: true
    },
    {
      label: 'LinkedIn',
      value: 'LinkedIn',
      url: 'https://www.linkedin.com/in/enkhbold470/',
      type: 'social',
      external: true
    },
    {
      label: 'GitHub',
      value: 'Github',
      url: 'https://github.com/enkhbold470',
      type: 'social',
      external: true
    }
  ]
}

export const recentUpdates = [
  {
    date: 'October 31, 2024',
    title: 'Student hackers compete at DAHacks 3.0 hack-a-thon for over $7,500 in prizes',
    url: 'https://lavozdeanza.com/multimedia/video/2024/10/31/student-hackers-compete-at-da-hacks-3-0-hack-a-thon-for-over-7500-in-prizes/'
  },
  {
    date: 'November 3, 2023',
    title: 'Electricity calculator design shocks De Anza Hackathon',
    url: 'https://lavozdeanza.com/features/2023/11/03/electricity-calculator-design-shocks-de-anza-hackathon/'
  }
]
