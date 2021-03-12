import { request } from '../helpers.js';
import Component from './component.js';

class SinglePost extends Component {
  constructor(el, props) {
    super();

    this.comp = document.getElementById(el);

    this.state = {
      title: props.title,
      post: [],
      slug: props.slug
    };
  }

  async getData() {
    const {slug} = this.state;
    const dataPost = await request(`http://chinonthetank.com/wp-json/wp/v2/posts?_embed&slug=${slug}`);

    this.setState({
      post: dataPost?.response?.[0] || []
    });
  }

  reRender(updatedState = this.state) {
    this.state = updatedState;

    if (this.comp) this.comp.innerHTML = this.render();
  }

  render() {
    const {
      title,
      post
    } = this.state;

    return `<div class="page page--single-post">

              <div class="page__content">
                <div class="page__heading">
                  <h1>${title}</h1>
                </div>

                <div class="page__copy">

                  <div class="page__section">

                  ${post.length === 0
                    ? "Fetching data..."
                    : `<div class="post-page">
                        <div class="post-page__img">
                          <img src="${post?._embedded?.['wp:featuredmedia']?.['0'].source_url || ''}">
                        </div>

                        <div class="post-page__content">
                          <h2 class="post-page__content-heading">${post?.title?.rendered || ''}</h2>

                          <div class="post-page__content-body">
                            ${post?.content?.rendered || ''}
                          </div>

                        </div>
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

export { SinglePost };
