function Screen() {
    // [col][line]
    this.texts = [
        [
            "                 ",
            "                 ",
            "                 ",
            "                 "
        ],
        [
            "                 ",
            "      Bitfeel    ",
            "                 ",
            "                 "
        ],
        [
            "                 ",
            "                 ",
            "                 ",
            "                 "
        ],
        [
            "                 ",
            "                 ",
            "                 ",
            "                 "
        ],
    ];
}

Screen.prototype.screenClear = function() {
    const msg = [
        "f0 47 7f 15 1c 00 00 f7",
        "f0 47 7f 15 1d 00 00 f7",
        "f0 47 7f 15 1e 00 00 f7",
        "f0 47 7f 15 1f 00 00 f7"
    ];
    for (var i = 0; i < 4; ++i)
        clearLine(i);
}

Screen.prototype.clearLine = function(line_index) {
    const msg = [
        "f0 47 7f 15 1c 00 00 f7",
        "f0 47 7f 15 1d 00 00 f7",
        "f0 47 7f 15 1e 00 00 f7",
        "f0 47 7f 15 1f 00 00 f7"
    ];

    host.getMidiOutPort(0).sendSysex(msg[line_index]);
}

Screen.prototype.writeLine = function(line_index, text) {
    const header = [
        "f0 47 7f 15 18 00 45 00",
        "f0 47 7f 15 19 00 45 00",
        "f0 47 7f 15 1a 00 45 00",
        "f0 47 7f 15 1b 00 45 00"
    ];
    const footer = "68 f7";

    var msg = header[line_index];
    for (var i = 0; i < text.length; ++i)
        msg += text.charCodeAt(i).toString(16);
    for (var i = 0; i < 68 - text.length; ++i)
        msg += " ".charCodeAt(0).toString(16);
    msg += footer;
    host.getMidiOutPort(0).sendSysex(msg);
}

Screen.prototype.refresh = function() {
    for (var i = 0; i < 4; ++i) {
        var line = this.texts[0][i] + this.texts[1][i] + this.texts[2][i] +
            this.texts[3][i];
        this.writeLine(i, line);
    }
}
