load("defines.js");

function Push() {
    var push = this;

    this.state = STATE_KEYBOARD;
    this.shift = false;

    this.transport = host.createTransport();
    this.trackBank = host.createTrackBankSection(8, 0, 0);
    this.cursorTrack = host.createCursorTrackSection(0, 8);
    this.masterTrack = host.createMasterTrackSection(0);

    host.getMidiInPort(0).setMidiCallback(function(status, data1, data2) {
        push.onMidi0(status, data1, data2);
    });
    host.getMidiInPort(0).setSysexCallback(function(data) {
        push.onSysex0(data);
    });
    host.getMidiInPort(1).setMidiCallback(function(status, data1, data2) {
        push.onMidi1(status, data1, data2);
    });
    host.getMidiInPort(1).setSysexCallback(function(data) {
        push.onSysex1(data);
    });

    this.userControls = host.createUserControls(8);
    for (var i = 0; i < 8; ++i) {
        
    }

    println("Initialized");
}

Push.prototype.onMidi0 = function(status, data1, data2) {
    println("unhandled midi 0: " + status + ", " + data1 + ", " + data2);
}

Push.prototype.onSysex0 = function(data) {
    println("unhandled sysex 0: " + data);
}

Push.prototype.onMidi1 = function(status, data1, data2) {
    if (status == 176) {
        // button pushed
        switch (data1) {
        case BT_SHIFT:
            this.shift = (data2 != 0);
            return;

        case BT_PLAY:
            if (data2 == 0)
                this.transport.togglePlay();
            return;

        case BT_RECORD:
            if (data2 == 0)
                this.transport.record();
            return;

        case BT_METRONOME:
            if (data2 == 127)
                this.transport.toggleClick();
            return;

        case ENC_SWING:
            return;

        case ENC_BPM:
            println("shift: " + this.shift + ", data2: " + data2);
            var amount = (this.shift ? 1 : 5) * (data2 == 1 ? 1 : -1);
            this.transport.increaseTempo(amount, 666 - 19);
            return;
        }
    }

    println("unhandled midi 1: " + status + ", " + data1 + ", " + data2);
}

Push.prototype.onSysex1 = function(data) {
    println("unhandled sysex 1: " + data);
}
