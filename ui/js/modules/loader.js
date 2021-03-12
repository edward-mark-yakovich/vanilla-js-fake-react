import Component from './component.js';

class Loader extends Component {
  constructor(el, props = {}) {
    super();

    this.comp = document.getElementById(el);

    this.state = {
      init: false
    };

    this.updateInitLoader();
  }

  updateInitLoader() {
    setTimeout(() => this.setState({init: true}), 100);
  }

  reRender(updatedState = this.state) {
    this.state = updatedState;

    if (this.comp) this.comp.innerHTML = this.render();
  }

  render() {
    const {
      init
    } = this.state;

    return `<div class="${`loader ${init ? '_init' : ''}`}">
              <div class="loader__spin">
                <svg version="1.1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 80 80"
                  xmlSpace="preserve">
                  <path
                    id="spinner"
                    fill="#000000"
                    d="M40,72C22.4,72,8,57.6,8,40C8,22.4,
                    22.4,8,40,8c17.6,0,32,14.4,32,32c0,1.1-0.9,2-2,2
                    s-2-0.9-2-2c0-15.4-12.6-28-28-28S12,24.6,12,40s12.6,
                    28,28,28c1.1,0,2,0.9,2,2S41.1,72,40,72z"
                  />
                </svg>
              </div>
              <p class="loader__message vh">Currently loading, please wait.</p>
            </div>`;
  }

  init() {
    this.reRender();
  }
}

export { Loader };
