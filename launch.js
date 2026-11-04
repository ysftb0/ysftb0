
(function () {
  'use strict';

  const state = document.getElementById('state');
  const cache = document.getElementById('cache');
  const button = document.getElementById('start');

  const match = /PlayStation\s+4[\/ ](\d+)\.(\d{1,2})(?!\d)/i
    .exec(navigator.userAgent || '');

  const firmware = match
    ? parseInt(match[1], 10) + '.' + ('0' + match[2]).slice(-2)
    : null;

  if (firmware !== '14.00') {
    state.textContent =
      "Bro, what firmware is THAT? 💀 This page expects PS4 14.00.";
    cache.textContent =
      "Wrong firmware. I'm not a magician.";
    return;
  }

  const appCache = window.applicationCache;

  function showReady() {
    state.textContent =
      "All systems ready! Look who's being productive today. 😎";

    cache.textContent =
      "Cache saved. Your files are officially couch potatoes.";

    button.hidden = false;
    button.disabled = false;
    button.textContent = "Got it!";
  }

  function showFailure() {
    state.textContent =
      "Well... that went wonderfully wrong. 💀";

    cache.textContent =
      "Cache couldn't be completed. Check your connection and try again.";

    button.hidden = false;
    button.disabled = false;
    button.textContent = "Okay, I guess...";
  }

  button.addEventListener('click', function () {
    state.textContent =
      "Mission accomplished? Not quite. This page only checks the cache.";

    cache.textContent =
      "No GoldHEN launch is performed by this demo.";
  });

  if (!appCache) {
    state.textContent =
      "Your browser has no AppCache support. It's 2026, buddy. 💀";

    cache.textContent =
      "A modern Service Worker cache is needed instead.";

    return;
  }

  state.textContent =
    "Scanning your PS4... Is it alive? 🤨";

  appCache.addEventListener('checking', function () {
    state.textContent =
      "Checking files... They can't hide forever.";
  });

  appCache.addEventListener('downloading', function () {
    state.textContent =
      "Downloading files... My virtual legs are tired.";
  });

  appCache.addEventListener('progress', function (event) {
    if (event.total) {
      const percent = Math.round(
        event.loaded / event.total * 100
      );

      cache.textContent =
        "Saving files: " + percent +
        "% — Almost there, don't panic. 🫡";
    }
  });

  appCache.addEventListener('cached', showReady);
  appCache.addEventListener('noupdate', showReady);

  appCache.addEventListener('updateready', function () {
    state.textContent =
      "New files?! Again?! Fine, updating...";

    try {
      appCache.swapCache();
    } catch (error) {}

    location.reload();
  });

  appCache.addEventListener('error', showFailure);
  appCache.addEventListener('obsolete', showFailure);

  if (appCache.status === 1) {
    showReady();
  } else if (appCache.status === 4) {
    state.textContent =
      "Update detected. Give me a second...";

    try {
      appCache.swapCache();
    } catch (error) {}

    location.reload();
  }

})();
