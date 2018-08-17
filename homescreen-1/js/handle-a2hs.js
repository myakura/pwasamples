"use strict";

const INSTALL_BUTTON_CLASS = `.install-button`;

// beforeinstallpropmt event object for handling prompt
let deferredPrompt = null;


window.addEventListener(`beforeinstallprompt`, event => {
  // for Chrome ~67
  event.preventDefault();

  // store this event for later use.
  deferredPrompt = event;

  const button = document.querySelector(INSTALL_BUTTON_CLASS);
  button.disabled = false;
  button.classList.add(`--flash`);

  button.addEventListener(`click`, event => {
    // once clicked, there's no second chance
    button.disabled = true;

    // show the prompt
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(result => {
      if (result.outcome === `accepted`) {
        console.log(`a2hs: prompt accepted.`);
      }
      else {
        console.error(`a2hs: prompt dismissed.`);
      }
      deferredPrompt = null;
    })
  });
});


window.addEventListener(`appinstalled`, event => {
  console.log(`a2hs: app installed.`);
  // send conversion to analytics
});
