import { handleRouteUpdate } from '../helpers.js';
import Component from './component.js';

class Nav extends Component {
  constructor(el, props) {
    super();

    this.comp = document.getElementById(el);

    this.state = {
      links: props.links
    };
  }

  handleGoToNavItem(targ) {
    const navPage = targ.dataset.navlink;

    handleRouteUpdate(navPage);
  }

  reRender(updatedState = this.state) {
    this.state = updatedState;

    if (this.comp) this.comp.innerHTML = this.render();
  }

  render() {
    const {
      links
    } = this.state;

    return `<nav class="nav">
              <ul class="grid">
                ${links.length && links.map(link => {
                  if (link.title === 'Single Page' && !link.isActive) return;

                  return (
                    `<li class="${link.isActive ? '_acitve' : ''}">
                      <button data-navlink="${link.title || ''}" onclick="document.componentRegistry[${this._id}].handleGoToNavItem(this)">
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
