import { router, subPath } from './main.js';



// ****** Request ******
export const request = async (endpoint, authKey = '', headerMeta = false) => {
  let fullResponse = null;

  document.querySelector('body').classList.add('_request-active');

  return await fetch(`${endpoint}`, {
           method: 'GET',
         })
         .then(response => {
            if (headerMeta) fullResponse = response;

            if (response.status == 200) {
              return response.json();
            } else {
              console.warn('** Get Request Error');
            }
         })
         .then(data => {
            document.querySelector('body').classList.remove('_request-active');

            return {
              ...(headerMeta && {meta: {
                [headerMeta]: fullResponse.headers.get(headerMeta),
              }}),
              response: data
            };
          }
        );
};



// ****** isEmpty - Object ******
export const isEmptyObj = obj => Object.keys(obj).length === 0;





// ****** navigateTo - router update ******
export const navigateTo = url => {
  history.pushState(null, null, (subPath + url));
  sessionStorage.setItem('_globalStore_currentNavPage', url);

  router();
};
