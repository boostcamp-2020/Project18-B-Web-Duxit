export const redirectToLobby = () => {
  window.location.href = '/';
};

export const copyGameCode = (e) => {
  const gamecodeInput2 = e.currentTarget.firstChild;
  navigator.permissions.query({ name: 'clipboard-write' }).then(({ state }) => {
    if (state === 'granted' || state === 'prompt') {
      navigator.clipboard.writeText(gamecodeInput2.innerText);
    }
  });
};
