Push.prototype.mixInit = function() {
}

Push.prototype.mixDraw = function() {
    for (var i = 0; i < 8; ++i) {
        var track = this.trackBank.getTrack(i);
        println("track: " + i + ", exists: " + track.exists());
    }
}
