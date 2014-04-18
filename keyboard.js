function Keyboard() {
    this.keyOffset = 3 * 12;
    this.keys = [];
    this.draw();
}

Keyboard.prototype.octaveUp = function() {
    if (this.keyOffset <= 48)
        this.keyOffset += 12;
}

Keyboard.prototype.octaveDown = function() {
    if (this.keyOffset >= 12)
        this.keyOffset -= 12;
}

Keyboard.prototype.drawKey = function(x, y, is_pushed) {
    if ((x + 8 * y) % 12 > 0)
        push.setPadColor(x, y, 0, 1);
    else
        push.setPadColor(x, y, 31, 0);
}

Keyboard.prototype.draw = function() {
    for (var x = 0; x < 8; ++x)
        for (var y = 0; y < 8; ++y)
            this.drawKey(x, y, false);
}

Keyboard.prototype.onPadReleased = function(x, y, velocity) {
    push.cursorTrack.stopNote(this.keyOffset + x + 8 * y, velocity);
}

Keyboard.prototype.onPadPushed = function(x, y, velocity) {
    push.cursorTrack.startNote(this.keyOffset + x + 8 * y, velocity);
}

Keyboard.prototype.onPadAfterTouched = function(x, y, velocity) {
    // XXX
}
