const sounds = {};
const GBUCKS_PER_SECOND = 50;

function setGBucks(value) {
  window.localStorage.setItem("gbucks", value.toString());
  const event = new CustomEvent("gbucks-changed", {
    detail: { value: value },
  });
  document.dispatchEvent(event);
  console.log("GBucks: " + value.toString());
}

function getGBucks() {
  return parseInt(window.localStorage.getItem("gbucks") || "0");
}

function assign_sound_to_key(key, sound_filename, looping = false) {
  document.addEventListener("keydown", function (event) {
    if (event.code === key && event.repeat === false) {
      end_sound(sound_filename);
      start_sound(sound_filename, looping);
    }
  });
  document.addEventListener("keyup", function (event) {
    if (event.code === key) {
      end_sound(sound_filename);
    }
  });
}

function start_sound(sound_filename, looping = false) {
  if (sounds[sound_filename]) {
    return;
  }
  sounds[sound_filename] = new Audio(`sounds/${sound_filename}`);
  sounds[sound_filename].loop = looping;
  sounds[sound_filename].play();
}

function end_sound(sound_filename) {
  if (sounds[sound_filename]) {
    sounds[sound_filename].pause();
    sounds[sound_filename].currentTime = 0;
    delete sounds[sound_filename];
  }
}

function mute_all_sounds() {
  for (const sound in sounds) {
    sounds[sound].pause();
    sounds[sound].currentTime = 0;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  assign_sound_to_key("KeyC", "cbar_hit_loop.wav", true);
  assign_sound_to_key("KeyN", "noo.wav");
  assign_sound_to_key("KeyO", "no.wav");
  assign_sound_to_key("KeyY", "yes.wav");
  assign_sound_to_key("KeyA", "absolutely.wav");
  assign_sound_to_key("KeyS", "administrator.wav");
  assign_sound_to_key("KeyF", "afellowsci.wav");
  assign_sound_to_key("KeyD", "absolutelynot.wav");
  assign_sound_to_key("KeyP", "sci_pain4.wav");

  // Mute all sounds when the space bar is pressed
  document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
      event.preventDefault();
      event.stopPropagation();
      mute_all_sounds();
    }
  });

  // Poll for crowbar playing
  const periodMs = 100;
  setInterval(function () {
    if (sounds["cbar_hit_loop.wav"]) {
      const gbucks = getGBucks();
      const nextGbucks = Math.floor(
        gbucks + (GBUCKS_PER_SECOND * periodMs) / 1000
      );
      setGBucks(nextGbucks);
    }
  }, periodMs);

  function displayGBucks(gbucks) {
    document.getElementById("gbucks-counter").textContent = gbucks;
  }

  document.addEventListener("gbucks-changed", function (event) {
    displayGBucks(event.detail.value);
  });
  displayGBucks(getGBucks());
});
