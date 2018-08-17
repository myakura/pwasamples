"use strict";

const SERVICE_WORKER_PATH = `/homescreen-1/serviceworker.js`;

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) { return }

  navigator.serviceWorker.register(SERVICE_WORKER_PATH)
  .then(registration => {
    console.log(`sw: registration succeeded`);
    console.dir(registration);
  })
  .catch(error => {
    console.error(`sw: registration failed`, error);
  })
}

window.addEventListener(`load`, event => {
  registerServiceWorker();
});
