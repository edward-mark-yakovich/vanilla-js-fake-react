import { Home } from './modules/home.js';
import { Loader } from './modules/loader.js';
import { Nav } from './modules/nav.js';
import { Posts } from './modules/posts.js';
import { SinglePost } from './modules/singlePost.js';

(function() {

  // fake "Store" with sessionStorage
  const globalStore = {
    page: sessionStorage.getItem('_globalStore_currentPage'),
    slug: sessionStorage.getItem('_globalStore_currentSlug'),
    navPage: sessionStorage.getItem('_globalStore_currentNavPage')
  };

  console.log( globalStore );

  const navData = {
    links: [
      {
        title: 'Home',
        isActive: globalStore.navPage === 'Home'
      },
      {
        title: 'Posts',
        isActive: globalStore.navPage === 'Posts'
      },
      {
        title: 'Single Page',
        isActive: globalStore.navPage === 'Single Page'
      }
    ]
  };
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
    slug: globalStore.slug  || ''
  };

  const loader = new Loader('loader');
  const nav = new Nav('nav', navData);
  const home = new Home('app', homeData);
  const posts = new Posts('app', postData);
  const singlePost = new SinglePost('app', singlePostData);

  let activeComponent = null;
  let hashUrl = globalStore.navPage;

  // find which component is "Route"
  switch (globalStore.navPage) {
    case "Home":
      activeComponent = home;
      break;
    case "Posts":
      activeComponent = posts;
      break;
    case "Single Page":
      hashUrl = globalStore.slug;
      activeComponent = singlePost;
      break;
    default:
      activeComponent = home;
  }

  loader.init();
  nav.init();
  activeComponent.init();

  if (hashUrl && globalStore.navPage) {
    location.hash = `#${hashUrl.toLowerCase().replace(/\s/g, '-')}`;
  } else {
    location.hash = '';
  }

}());
