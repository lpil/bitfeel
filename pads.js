// (x, y) the pad coordinate, [0..7]x[0..7]
// 0 <= Hue < 32
// 0 <= l < 4
Push.prototype.setPadColor = function(x, y, h, l) {
    host.getMidiOutPort(1).sendMidi(0x91, PAD_0 + x + 8 * y, h * 4 + (3 - l));
}

Push.prototype.setPadOff = function(x, y) {
    host.getMidiOutPort(1).sendMidi(0x91, PAD_0 + x + 8 * y, 0);
}
