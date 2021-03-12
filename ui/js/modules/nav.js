import { navigateTo } from '../helpers.js';
import Component from './component.js';

class Nav extends Component {
  constructor(el, props) {
    super();

    this.comp = document.getElementById(el);

    this.state = {
      links: props.links
    };
  }

  reRender(updatedState = this.state) {
    this.state = updatedState;

    if (this.comp) this.comp.innerHTML = this.render();
  }

  handleGoTo(targ) {
    const url = targ.dataset.navigate;

    navigateTo(`/${url}`);
  }

  render() {
    const {
      links
    } = this.state;

    return `<nav class="nav">
              <ul class="grid">
                ${links.length && links.map(link => {
                  if (link.title === 'Single Page') return;

                  let linkUrl = '';

                  switch (link.title) {
                    case 'Home':
                      linkUrl = '';
                      break;
                    default:
                      linkUrl = link.title.toLowerCase();
                  }

                  return (
                    `<li class="${link.isActive ? '_acitve' : ''}">
                      <button data-navigate="${linkUrl || ''}" onclick="document.componentRegistry[${this._id}].handleGoTo(this)">
                        ${link.title}
                      </button>
                    </li>`
                  )
                }).join('')}
              </ul>
            </nav>`;
  }

  init() {
    this.reRender();
  }
}

export { Nav };
