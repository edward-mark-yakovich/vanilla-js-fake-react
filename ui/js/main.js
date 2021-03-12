import { Home } from './modules/home.js';
import { Nav } from './modules/nav.js';
import { Loader } from './modules/loader.js';
import { Posts } from './modules/posts.js';
import { SinglePost } from './modules/singlePost.js';

const isLocal = window.location.host === 'localhost:8080';
export const subPath = isLocal ? '' : '/test/fake-react-test';
const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

export const navigateTo = url => {
  history.pushState(null, null, (subPath + url));
  sessionStorage.setItem('_globalStore_currentNavPage', url);

  router();
};

export const router = () => {
  const globalStore = {
    page: sessionStorage.getItem('_globalStore_currentPage'),
    navPage: sessionStorage.getItem('_globalStore_currentNavPage')
  };

  const navData = {
    links: [
      {
        title: 'Home',
        isActive: globalStore.navPage === '/'
      },
      {
        title: 'Posts',
        isActive: globalStore.navPage === '/posts'
      },
      {
        title: 'Single Page'
      }
    ]
  };

  const routes = [
    { path: `${subPath}/`, view: Home, nameId: 'home' },
    { path: `${subPath}/posts`, view: Posts, nameId: 'posts' },
    { path: `${subPath}/posts/:id`, view: SinglePost, nameId: 'single-post' }
  ];

  const potentialMatches = routes.map(route => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path))
    };
  });

  let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null),
      data = {};

  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname]
    };
  }

  const homeData = {
    title: 'Home Page',
    homeIntro: [],
    homeCategories: [],
    currentPage: globalStore.page || 1
  };
  const postData = {
    title: 'Posts Page',
    posts: [],
    currentPage: globalStore.page || 1
  };
  const singlePostData = {
    title: 'Single Post Page',
    post: [],
    slug: match?.result[1] || ''
  };

  switch (match.route.nameId) {
    case 'home':
      data = homeData;
      break;
    case 'posts':
      data = postData;
      break;
    case 'single-post':
      data = singlePostData;
      break;
  }

  const SelectedRoute = match.route.view;
  const loader = new Loader('loader');
  const nav = new Nav('nav', navData);
  const view = new SelectedRoute('app', data);

  loader.init();
  nav.init();
  view.init();
};

window.addEventListener("popstate", router);
document.addEventListener("DOMContentLoaded", router);
