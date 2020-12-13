function getState() {
  return this.status.state;
}

function setState(state) {
  this.status = {
    ...this.status,
    state,
  };
}

const methodGroup = { getState, setState };

export default methodGroup;
