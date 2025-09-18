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
  description: 'Portfolio of Inky Ganbold, a CS student at De Anza who has won 10/25 hackathons including YC Agent Hack, Stanford TreeHacks, HackMIT, and MIT Energy Hacks. Active open source contributor and hackathon organizer.',
  author: 'Inky Ganbold',
  keywords: ['Inky Ganbold', 'hackathon winner', 'computer science', 'open source', 'Stanford TreeHacks', 'HackMIT', 'YC Agent Hack', 'De Anza College', 'software developer', 'hackathon organizer'],
  url: 'https://enk.icu',
  locale: 'en_US',
  type: 'website',
  bio: {
    text: 'Won 10/25 hackathons (YC Agent Hack, Stanford Treehacks, HackMIT, MIT Energy Hacks, Harvard Hack etc.), hosted 3 (incl. [DAHacks]), actively open source contributor on [Github], [OSHWLab], and [Medium], CS student at De Anza. ',
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
        url: 'https://da.hackathon.org/',
        external: true
      },
      {
        text: 'Github',
        url: 'https://github.com/enkhbold470',
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
      label: 'Twitter',
      value: 'Twitter',
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
    },
    {
      label: 'Email',
      value: 'inky@enk.icu',
      url: 'mailto:inky@enk.icu',
      type: 'email',
      external: false
    }
  ]
}

export const recentUpdates = [

  {
    date: 'November 3, 2023',
    title: 'Electricity calculator design shocks De Anza Hackathon',
    url: 'https://lavozdeanza.com/features/2023/11/03/electricity-calculator-design-shocks-de-anza-hackathon/'
  }
]