function getState() {
  return this.status.state;
}

function setState(state) {
  if (!state) {
    console.error(`Set State, but ${state}`);
    return;
  }
  this.status.state = state;
}

const methodGroup = { getState, setState };

export default methodGroup;
