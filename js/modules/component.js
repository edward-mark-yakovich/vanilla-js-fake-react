document.componentRegistry = {};
document.nextId = 0;

class Component {
  constructor() {
    this.setState = (newState, state = this.state || {}, ) => {
      const updatedState = {...state, ...newState};

      return this.reRender(updatedState);
    };

    this._id = ++document.nextId;
    document.componentRegistry[this._id] = this;
  }
}

export default Component;
