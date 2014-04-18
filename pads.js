// 0x91, color
// 0x98, blink fast
// 0x99, blink slower

// (x, y) the pad coordinate, [0..7]x[0..7]
// 0 <= Hue < 32
// 0 <= l < 4
Push.prototype.setPadColor = function(x, y, h, l) {
    host.getMidiOutPort(1).sendMidi(0x91, PAD_0 + x + 8 * y, h * 4 + (3 - l));
}

Push.prototype.setPadColorRGB = function(x, y, r, g, b) {
    if (r == 0 && g == 0 && b == 0)
        this.setPadOff(x, y);
    else {
        l = Math.floor((r + g + b) / 3 * 4);
        h = 14;
        this.setPadColor(x, y, h, l);
    }
}

Push.prototype.setPadOff = function(x, y) {
    host.getMidiOutPort(1).sendMidi(0x91, PAD_0 + x + 8 * y, 0);
}
