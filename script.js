document.addEventListener('DOMContentLoaded', function () {
    const soundboard = document.getElementById('soundboard');
    const sounds = {};

    function assign_sound_to_key(key, sound_filename) {
        document.addEventListener('keypress', function (event) {
            if (event.code === key) {
                start_sound(sound_filename);
            }
        });
        document.addEventListener('keyup', function (event) {
            if (event.code === key) {
                end_sound(sound_filename);
            }
        });
    }

    function start_sound(sound_filename) {
        if (sounds[sound_filename]) {
            return;
        }
        sounds[sound_filename] = new Audio(`sounds/${sound_filename}`);
        sounds[sound_filename].loop = true;
        sounds[sound_filename].play();
    }

    function end_sound(sound_filename) {
        if (sounds[sound_filename]) {
            sounds[sound_filename].pause();
            sounds[sound_filename].currentTime = 0;
            delete sounds[sound_filename];
        }
    }

    assign_sound_to_key('KeyC', 'cbar_hit_loop.wav')
    assign_sound_to_key('KeyN', 'noo.wav');
    assign_sound_to_key('KeyO', 'no.wav');
    assign_sound_to_key('KeyY', 'yes.wav');
    assign_sound_to_key('KeyA', 'absolutely.wav');
    assign_sound_to_key('KeyS', 'administrator.wav');
    assign_sound_to_key('KeyF', 'afellowsci.wav');
    assign_sound_to_key('KeyD', 'absolutelynot.wav');
    assign_sound_to_key('KeyP', 'sci_pain4.wav');

    // Mute all sounds when the space bar is pressed
    document.addEventListener('keydown', function (event) {
        if (event.code === 'Space') {
            event.preventDefault();
            event.stopPropagation();
            for (const sound in sounds) {
                sounds[sound].pause();
                sounds[sound].currentTime = 0;
            }
        }
    });
});