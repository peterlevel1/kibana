
import { IDataSourceItem, EnumHostStates } from '../types';

export const dataSource: IDataSourceItem[] = [
  {
    id: '0',
    hostName: 'google.com',
    state: EnumHostStates.GREEN, description: 'Search the world\'s information, including webpages, images, videos and more. Google has many special features to help you find exactly what you\'re looking ...',
  },
  {
    id: '1',
    hostName: 'youtobe.com',
    state: EnumHostStates.YELLOW, description: 'Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.',
  },
  {
    id: '2',
    hostName: 'twitter.com',
    state: EnumHostStates.RED, description: 'Join the conversation, follow accounts, see your Home Timeline, and catch up on Tweets from the people you know.',
  },
  {
    id: '3',
    hostName: 'edition.cnn.com',
    state: EnumHostStates.RED, description: 'Find the latest breaking news and information on the top stories, weather, business, entertainment, politics, and more. For in-depth coverage, CNN provides ...',
  },
  {
    id: '4',
    hostName: 'elastic.co',
    state: EnumHostStates.GREEN, description: 'Elasticsearch. The fast and scalable search and analytics engine at the heart of the Elastic Stack. logo-kibana- ...',
  },
  {
    id: '5',
    hostName: 'reactjs.org',
    state: EnumHostStates.YELLOW, description: 'Elasticsearch. The fast and scalable search and analytics engine at the heart of the Elastic Stack. logo-kibana- ...',
  },
  {
    id: '6',
    hostName: 'angularjs.org',
    state: EnumHostStates.GREEN, description: 'AngularJS is a toolset for building the framework most suited to your application development. It is fully extensible and works well with other libraries. Every ...',
  },
  {
    id: '7',
    hostName: 'vuejs.org',
    state: EnumHostStates.RED, description: 'Vue.js - The Progressive JavaScript Framework.',
  },
  {
    id: '8',
    hostName: 'redux.js.org',
    state: EnumHostStates.GREEN, description: 'Redux ; Predictable. Redux helps you write applications that behave consistently ; Centralized. Centralizing your application\'s state and logic enables powerful ...',
  },
  {
    id: '9',
    hostName: 'nodejs.org',
    state: EnumHostStates.RED, description: 'Node.js® is a JavaScript runtime built on Chrome\'s V8 JavaScript engine.',
  },
  {
    id: '10',
    hostName: 'www.typescriptlang.org',
    state: EnumHostStates.YELLOW, description: 'TypeScript is a programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static typing to the language. It is designed for the development of large applications and transpiles to JavaScript.',
  },
  {
    id: '11',
    hostName: 'github.com',
    state: EnumHostStates.GREEN, description: 'GitHub is where over 83 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, ...',
  },
  {
    id: '12',
    hostName: 'tortoisesvn.net',
    state: EnumHostStates.GREEN, description: 'TortoiseSVN is an Apache Subversion (SVN) client, implemented as a Windows shell extension. It\'s intuitive and easy to use, since it doesn\'t require the ...',
  },
  {
    id: '13',
    hostName: 'www.npmjs.com',
    state: EnumHostStates.YELLOW, description: 'Relied upon by more than 11 million developers worldwide, npm is committed to making JavaScript development elegant, productive, and safe. The free npm Registry ...',
  },
  {
    id: '14',
    hostName: 'webpack.js.org',
    state: EnumHostStates.YELLOW,
    description: 'webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, ...',
  },
];
