import { request, handleRouteUpdate } from '../helpers.js';
import Component from './component.js';

class Posts extends Component {
  constructor(el, props) {
    super();

    this.comp = document.getElementById(el);

    this.state = {
      title: props.title,
      posts: props.posts,
      perPage: 20,
      page: props.currentPage
    };
  }

  async getData() {
    const {perPage, page} = this.state;
    const data = await request(`http://chinonthetank.com/wp-json/wp/v2/posts?_embed&per_page=${perPage}&page=${page}`);

    this.setState({
      posts: data?.response || []
    });
  }

  handlePagination(dir) {
    const {page} = this.state;

    let updatedPage = page;

    dir === 'forward' ? ++updatedPage : --updatedPage;

    this.sendOffPage(updatedPage);
  }

  handlePaginationDirect(event) {
    const val = event.value;

    this.sendOffPage(parseInt(val) || 1);
  }

  sendOffPage(newPage) {
    this.setState({
      page: newPage
    });

    this.getData();

    window.scrollTo(0, 0);
    sessionStorage.setItem('_globalStore_currentPage', newPage);
  }

  handleGoToSlug(targ) {
    const slug = targ.dataset.slug;

    handleRouteUpdate('Single Page', slug);
  }

  reRender(updatedState = this.state) {
    this.state = updatedState;

    if (this.comp) this.comp.innerHTML = this.render();
  }

  render() {
    const {
      title,
      posts,
      page,
      perPage
    } = this.state;

    return `<div class="page page--posts">

              <div class="page__content">
                <div class="page__heading">
                  <h1>${title}</h1>
                </div>

                <div class="page__copy">

                  <div class="page__section">

                    ${posts.length === 0
                      ? "Fetching data..."
                      : `<div class="post-listing">
                          <ul class="grid">

                            ${posts.map(post => {
                              return (
                                `<li class="post-listing__item">
                                  <button data-slug="${post?.slug || ''}" onclick="document.componentRegistry[${this._id}].handleGoToSlug(this)">
                                    <div class="post-listing__img">
                                      <img src="${post?._embedded?.['wp:featuredmedia']?.['0'].source_url || ''}" />
                                    </div>

                                    <div class="post-listing__name">${post?.slug || ''}</div>
                                  </button>
                                </li>`
                              )
                            }).join('')}
                          </ul>

                          <nav class="pagination">
                            <div class="grid">
                              <button ${page == 1 ? "disabled" : ""} class="pagination__btn" onclick="document.componentRegistry[${this._id}].handlePagination('previous')">
                                Previous
                              </button>

                              <div class="pagination__counter">
                                <label class="vh" for="pagination__input-ID-01">{page}</label>
                                <input placeholder="${page}" onkeyup="document.componentRegistry[${this._id}].handlePaginationDirect(this)" value="${page}" type="text" name="pagination__input-ID-01" id="pagination__input-ID-01" />
                              </div>

                              <button ${perPage > posts.length ? "disabled" : ""} class="pagination__btn" onclick="document.componentRegistry[${this._id}].handlePagination('forward')">
                                Next
                              </button>
                            </div>
                          </nav>

                        </div>`
                    }

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

export { Posts };
