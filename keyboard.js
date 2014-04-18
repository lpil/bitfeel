function Keyboard() {
    this.keyOffset = 3 * 12;
    this.keys = [];
    this.drawKeys();
}

Keyboard.prototype.drawKey = function(x, y, is_pushed) {
    if ((x + 8 * y) % 12 > 0)
        push.setPadColor(x, y, 0, 1);
    else
        push.setPadColor(x, y, 31, 0);
}

Keyboard.prototype.drawKeys = function() {
    for (var x = 0; x < 8; ++x)
        for (var y = 0; y < 8; ++y)
            this.drawKey(x, y, false);
}
