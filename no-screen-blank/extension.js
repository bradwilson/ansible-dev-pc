// This extension is a super ugly hack, because extensions are supposed to be
// when the lock screen gets shown. Since doing this would completely defeat the
// purpose of this extension, it has to break with this assumption
const ScreenShield = imports.ui.screenShield;
const Main = imports.ui.main;

let extensionActive = false;

let orig_activateFade = ScreenShield.ScreenShield.prototype._activateFade;
let orig_completeLockScreenShown = ScreenShield.ScreenShield.prototype._completeLockScreenShown;

// don't fade in a full screen black box which would obscure the view
function noFade_activateFade (lightbox, time) {};

// basically a copy of the original method without the emission of the
// "active-changed" signal which would cause gnome-settings-daemon to
// blank the screen
function noFade_completeLockScreenShown () {
    this._isActive = true;

    if (this._aboutToSuspend)
        this._uninhibitSuspend();

    Main.screenShield.emit('lock-screen-shown');
}

function init() {
}

function enable() {
    if (!extensionActive) {
        extensionActive = true;
        ScreenShield.ScreenShield.prototype._activateFade = noFade_activateFade;
        ScreenShield.ScreenShield.prototype._completeLockScreenShown = noFade_completeLockScreenShown;
    }
}

function disable() {
    // Only allow disabling the extension when in 'user' mode (i.e. manually),
    // but not in lock-screen mode.
    if (extensionActive && Main.sessionMode.currentMode == 'user') {
        extensionActive = false;
        ScreenShield.ScreenShield.prototype._activateFade = orig_activateFade;
        ScreenShield.ScreenShield.prototype._completeLockScreenShown = orig_completeLockScreenShown;
    }
}
