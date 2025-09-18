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
  bio: {
  text: 'Engineer with a passion for robotics, IoT, and AI, specializing in full-stack web development. I founded the Mongolian Robotics Club and led the Mongolian team to the F.I.R.S.T. Global Robotics Tournament, ranking 32nd among 190 countries. I also organize and participate in hackathons, and share my projects and ideas on platforms like Medium and EasyEDA.',
  links: [
  {
  text: 'Medium',
  url: 'https://medium.com/@enkhe.enkhebold',
  external: true
  },
  {
  text: 'EasyEDA',
  url: 'https://easyeda.com/',
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
  label: 'LinkedIn',
  value: 'LinkedIn',
  url: 'https://www.linkedin.com/in/enkhbold470/',
  type: 'social',
  external: true
  },
  {
  label: 'X',
  value: 'X',
  url: 'https://x.com/1nkfy',
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
  url: 'https://enk.icu/blog'
  }
  ]