load("defines.js");

function Push() {
    var push = this;

    this.state = STATE_CLIP;
    this.shift = false;

    this.transport = host.createTransport();
    this.trackBank = host.createTrackBank(8, 2, 8);
    this.cursorTrack = host.createCursorTrack(2, 8);
    this.cursorDevice = host.createCursorDevice();
    this.cursorClip = host.createCursorClip(8, 8);

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

    println("Initialized");
}

Push.prototype.onMidi0 = function(status, data1, data2) {
    println("unhandled midi 0: " + status + ", " + data1 + ", " + data2);
}

Push.prototype.onSysex0 = function(data) {
    println("unhandled sysex 0: " + data);
}

Push.prototype.onMidi1 = function(status, data1, data2) {
    if (status == 144) {
        // enc touch
        switch (data1) {
        case TOUCH_ENC_0:
        case TOUCH_ENC_1:
        case TOUCH_ENC_2:
        case TOUCH_ENC_3:
        case TOUCH_ENC_4:
        case TOUCH_ENC_5:
        case TOUCH_ENC_6:
        case TOUCH_ENC_7:
            this.cursorDevice.getParameter(data1 - TOUCH_ENC_0).touch(!!data2);
            return;
        }
    } else if (status == 176) {
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

        // case BT_BOTTOM:
        //     if (this.state == STATE_CLIP) {

        //     }
        //     return;

        case ENC_0:
        case ENC_1:
        case ENC_2:
        case ENC_3:
        case ENC_4:
        case ENC_5:
        case ENC_6:
        case ENC_7:
            var amount = data2 < 64 ? data2 : data2 - 128;
            this.cursorDevice.getParameter(data1 - ENC_0).inc(amount, 100);
            return;

        case ENC_SWING:
            return;

        case ENC_TEMPO:
            var amount = (this.shift ? 1 : 10) * (data2 == 1 ? 1 : -1);
            this.transport.increaseTempo(amount, 10 * (666 - 20) + 1);
            return;
        }
    }

    println("unhandled midi 1: " + status + ", " + data1 + ", " + data2);
}

Push.prototype.onSysex1 = function(data) {
    println("unhandled sysex 1: " + data);
}