import { request } from '../helpers.js';
import Component from './component.js';

class Home extends Component {
  constructor(el, props) {
    super();

    this.comp = document.getElementById(el);

    this.state = {
      title: props.title,
      homeIntro: [],
      homeCategories: [],
      page: props.currentPage
    };
  }

  async getData() {
    const {perPage, page} = this.state;
    const dataHomeIntro = await request('http://chinonthetank.com/wp-json/wp/v2/pages?_embed&slug=about');
    const dataCats = await request('http://chinonthetank.com/wp-json/wp/v2/categories');

    this.setState({
      homeIntro: dataHomeIntro?.response?.[0] || [],
      homeCategories: dataCats?.response || []
    });
  }

  updatePage() {
    let updatePage = parseInt(this.state.page) + 1;

    this.setState({
      page: updatePage
    });

    sessionStorage.setItem('_globalStore_currentPage', updatePage);
  }

  reRender(updatedState = this.state) {
    this.state = updatedState;

    if (this.comp) this.comp.innerHTML = this.render();
  }

  render() {
    const {
      title,
      homeIntro,
      homeCategories,
      page
    } = this.state;

    return `<div class="page page--home">

              <div class="page__content">
                <div class="page__heading">
                  <h1>${title}</h1>
                </div>

                <div class="page__copy">

                  <div class="page__section">

                    <div class="home-intro-top">
                      <div><button onclick="document.componentRegistry[${this._id}].updatePage()">Set post page</button><span> = ${page}</span></div>
                    </div>

                    ${homeIntro.length === 0
                      ? "Fetching data..."
                      : `<div class="home-intro">
                          <div class="grid">

                            <div class="home-intro__img">
                              <img src="${homeIntro?._embedded?.['wp:featuredmedia']?.['0'].source_url || ''}">
                            </div>

                            <div class="home-intro__content">
                              <h3 class="home-intro__heading">${homeIntro?.title?.rendered || ''}</h3>
                              <div class="home-intro__copy">
                                ${homeIntro?.excerpt?.rendered || ''}
                              </div>
                            </div>

                          </div>
                        </div>`
                    }

                    <div class="home-categories">
                      <h3>Categories</h3>

                      ${homeCategories.length === 0
                        ? "Fetching data..."
                        : `<ul>
                            ${homeCategories.map(cat => {
                              return (
                                `<li class="post-listing__item">${cat.name}</li>`
                              )
                            }).join('')}
                          </ul>`
                      }
                    </div>


                  </div>

                </div>

              </div>
            </div>`;
  }

  init() {
    this.reRender();
    this.getData();
  }
}

export { Home };
