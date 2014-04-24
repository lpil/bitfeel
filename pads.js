// 0x91, color
// 0x98, blink fast
// 0x99, blink slower

// (x, y) the pad coordinate, [0..7]x[0..7]
// 1 <= Hue < 14
// 0 <= l < 4
Push.prototype.setPadColor = function(x, y, h, l) {
    host.getMidiOutPort(1).sendMidi(0x91, PAD_0 + x + 8 * y, h * 4 + (3 - l));
}

Push.prototype.setPadBlinkColor = function(x, y, h, l) {
    host.getMidiOutPort(1).sendMidi(0x98, PAD_0 + x + 8 * y, h * 4 + (3 - l));
}

function min2(a, b) {
    if (a < b)
        return a;
    return b;
}

function min3(a, b, c) {
    return min2(a, min2(b, c));
}

function max2(a, b) {
    if (a > b)
        return a;
    return b;
}

function max3(a, b, c) {
    return max2(a, max2(b, c));
}

Push.prototype.setPadColorRGB = function(x, y, r, g, b) {
    if (r == 0 && g == 0 && b == 0)
        this.setPadOff(x, y);
    else {
        var max = max3(r, g, b);
        var min = min3(r, g, b);

        var l = (min + max) / 2;
        if (l < 0.5)
            var s = (max - min) / (max + min);
        else
            var s = (max - min) / (2.0 - max - min);

        if (max == min)
            var h = 0;
        else {
            if (r == max)
                var h = (g - b) / (max - min);
            else if (g == max)
                var h = 2 + (b - r) / (max - min);
            else if (b == max)
                var h = 4 + (r - g) / (max - min);
            h = h * 60 + (h < 0 ? 360 : 0);
            h = 1 + Math.round(h * 13 / 360);
        }

        l = 3 - Math.floor(l * 4);
        println("max: " + max + ", min: " + min + ", l: " + l + ", s: " + s + ", h: " + h);
        this.setPadColor(x, y, h, l);
    }
}

Push.prototype.setPadOff = function(x, y) {
    host.getMidiOutPort(1).sendMidi(0x91, PAD_0 + x + 8 * y, 0);
}
