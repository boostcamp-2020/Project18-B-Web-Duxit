function updateState(state) {
  this.status = {
    ...this.status,
    state,
  };
}

const methodGroup = { updateState };

export default methodGroup;
