function Launcher() {
    for (var i = 0; i < 8; ++i) {
        var track = push.trackBank.getTrack(i);
        var clipLauncher = track.getClipLauncher();
        clipLauncher.setIndication(true);
        // (function() {
        //     const i_ = i;
        //     clipLauncher.addColorObserver(function(slot, r, g, b) {
        //         push.launcher.setClipColor(i_, slot, r, g, b);
        //     });
        // })();
    }
}

Launcher.prototype.setClipColor = function(i, slot, r, g, b) {
    println("setClipColor(" + i + ", " + slot + ", " + r +
            ", " + g + ", " + b + ")");
}

Launcher.prototype.draw = function() {
    for (var i = 0; i < 8; ++i) {
        var track = this.trackBank.getTrack(i);
        println("track: " + i + ", exists: " + track.exists());
    }
}

Launcher.prototype.onPadReleased = function(x, y, velocity) {
}

Launcher.prototype.onPadPushed = function(x, y, velocity) {
    var track = push.trackBank.getTrack(x);
    track.getClipLauncherSlots().launch(7 - y);
}

Launcher.prototype.onPadAfterTouched = function(x, y, velocity) {
}
