function Launcher() {
    push.launcher = this;
    const launcher_ = this;

    // initialize clips [cols][rows]
    this.clips = []
    this.canScrollTracksUp = false;
    this.canScrollTracksDown = false;
    this.canScrollScenesUp = true;
    this.canScrollScenesDown = true;

    for (var i = 0; i < 8; ++i) {
        var clips = []
        for (var j = 0; j < 8; ++j) {
            clips.push({
                r: 0,
                g: 0,
                b: 0
            });
        }
        this.clips.push(clips);
    }

    const mkOb = function(index, launcher) {
        return function(slot, r, g, b) {
            launcher.setClipColor(index, slot, r, g, b);
        };
    };

    for (var i = 0; i < 8; ++i) {
        var track = push.trackBank.getTrack(i);
        var clipLauncher = track.getClipLauncher();
        clipLauncher.setIndication(true);
        clipLauncher.addColorObserver(mkOb(i, this));
    }

    push.trackBank.addCanScrollScenesDownObserver(function(can) {
        println("can scroll scenes down: " + can);
        launcher_.canScrollScenesDown = can;
    });
    push.trackBank.addCanScrollScenesUpObserver(function(can) {
        println("can scroll scenes up: " + can);
        launcher_.canScrollScenesUp = can;
    });
    push.trackBank.addCanScrollTracksDownObserver(function(can) {
        println("can scroll tracks down: " + can);
        launcher_.canScrollTracksDown = can;
    });
    push.trackBank.addCanScrollTracksUpObserver(function(can) {
        println("can scroll tracks up: " + can);
        launcher_.canScrollTracksUp = can;
    });
}

Launcher.prototype.setClipColor = function(i, slot, r, g, b) {
    var clip = this.clips[i][7 - slot];
    clip.r = r;
    clip.g = g;
    clip.b = b;
    if (push)
        push.setPadColorRGB(i, 7 - slot, clip.r, clip.g, clip.b);
    println("clip color: " + i + ", " + slot + ", r: " + r +
            ", g: " + g + ", b: " + b);
}

Launcher.prototype.draw = function() {
    for (var i = 0; i < 8; ++i) {
        for (var j = 0; j < 8; ++j) {
            var clip = this.clips[i][j];
            push.setPadColorRGB(i, j, clip.r, clip.g, clip.b);
        }
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

Launcher.prototype.scrollUp = function() {
    if (!this.canScrollScenesUp)
        return;

    for (var i = 0; i < 8; ++i) {
        this.clips[i].shift();
        this.clips[i].push({r: 0, g: 0, b: 0})
    }

    push.trackBank.scrollScenesUp();
    this.draw();
}

Launcher.prototype.scrollDown = function() {
    if (!this.canScrollScenesDown)
        return;

    for (var i = 0; i < 8; ++i) {
        this.clips[i].pop();
        this.clips[i].unshift({r: 0, g: 0, b: 0})
    }

    push.trackBank.scrollScenesDown();
    this.draw();
}

Launcher.prototype.scrollLeft = function() {
    if (!this.canScrollTracksUp)
        return;

    this.clips.pop();
    this.clips.unshift([
        {r: 0, g: 0, b: 0},
        {r: 0, g: 0, b: 0},
        {r: 0, g: 0, b: 0},
        {r: 0, g: 0, b: 0},
        {r: 0, g: 0, b: 0},
        {r: 0, g: 0, b: 0},
        {r: 0, g: 0, b: 0},
        {r: 0, g: 0, b: 0}
    ]);
    push.trackBank.scrollTracksUp();
    this.draw();
}

Launcher.prototype.scrollRight = function() {
    if (!this.canScrollTracksDown)
        return;

    this.clips.shift();
    this.clips.push([
        {r: 0, g: 0, b: 0},
        {r: 0, g: 0, b: 0},
        {r: 0, g: 0, b: 0},
        {r: 0, g: 0, b: 0},
        {r: 0, g: 0, b: 0},
        {r: 0, g: 0, b: 0},
        {r: 0, g: 0, b: 0},
        {r: 0, g: 0, b: 0}
    ]);
    push.trackBank.scrollTracksDown();
    this.draw();
}
