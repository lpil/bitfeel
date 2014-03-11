Push.prototype.setClipColor = function(i, slot, r, g, b) {
    println("setClipColor(" + i + ", " + slot + ", " + r +
            ", " + g + ", " + b + ")");
}

Push.prototype.mixInit = function() {
    for (var i = 0; i < 8; ++i) {
        var track = this.trackBank.getTrack(i);
        var clipLauncher = track.getClipLauncher();
        (function() {
            const i_ = i;
            const p = push;
            clipLauncher.addColorObserver(function(slot, r, g, b) {
                p.setClipColor(i_, slot, r, g, b);
            });
        })();
    }
}

Push.prototype.mixDraw = function() {
    for (var i = 0; i < 8; ++i) {
        var track = this.trackBank.getTrack(i);
        println("track: " + i + ", exists: " + track.exists());
    }
}
