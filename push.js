load("defines.js");
load("pads.js");

load("screen.js");
load("launcher.js");
load("keyboard.js");

function Push() {
    push = this;

    this.state = STATE_CLIP;
    this.shift = false;

    this.application = host.createApplication();
    this.transport = host.createTransport();
    this.trackBank = host.createTrackBank(8, 2, 8);
    this.cursorTrack = host.createCursorTrack(2, 8);
    this.cursorDevice = host.createCursorDevice();
    this.cursorClip = host.createCursorClip(8, 8);
    this.arranger = host.createArranger(0);

    //this.mixer = host.createMixer();
    //this.arranger.toggleCueMarkerVisibility();

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

    this.screen = new Screen();
    this.keyboard = new Keyboard();

    println("Initialized");
}

Push.prototype.onMidi0 = function(status, data1, data2) {
    println("unhandled midi 0: " + status + ", " + data1 + ", " + data2);
}

Push.prototype.onSysex0 = function(data) {
    println("unhandled sysex 0: " + data);
}

Push.prototype.onMidi1 = function(status, data1, data2) {
    if (status == 128) {
        if (PAD_0 <= data1 && data1 <= PAD_63) {
            // pad release
            this.cursorTrack.stopNote(this.keyboard.keyOffset + data1 - PAD_0, data2);
            return;
        }
    } else if (status == 144) {
        if (TOUCH_ENC_0 <= data1 && data1 <= TOUCH_ENC_7) {
            // encoder touch
            this.cursorDevice.getParameter(data1 - TOUCH_ENC_0).touch(!!data2);
            return;
        } else if (PAD_0 <= data1 && data1 <= PAD_63) {
            // pad touch
            this.cursorTrack.startNote(this.keyboard.keyOffset + data1 - PAD_0, data2);
            return;
        }
    } else if (status == 160) {
        if (PAD_0 <= data1 && data1 <= PAD_63) {
            // pad after touch
            //this.cursorTrack.playNote(this.keyOffset + data1 - PAD_0, data2);
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

        case BT_UNDO:
            if (data2 == 127)
                this.application.undo();
            return;

        case BT_DELETE:
            if (data2 == 127)
                println("FIXME: this.application.delete()");
            return;

        case BT_DUPLICATE:
            if (data2 == 127)
                this.application.duplicate();
            return;

        // case BT_BOTTOM:
        //     if (this.state == STATE_CLIP) {

        //     }
        //     return;

        case BT_IN:
            if (data2 == 127)
                this.cursorDevice.previousParameterPage();
            return;

        case BT_OUT:
            if (data2 == 127)
                this.cursorDevice.nextParameterPage();
            return;

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

        case BT_LEFT:
            println("==================");
            if (data2 == 127)
                this.trackBank.scrollTracksUp();
            return;

        case BT_RIGHT:
            println("==================");
            if (data2 == 127)
                this.trackBank.scrollTracksDown();
            return;

        case BT_UP:
            println("==================");
            if (data2 == 127)
                this.trackBank.scrollScenesUp();
            return;

        case BT_DOWN:
            println("==================");
            if (data2 == 127)
                this.trackBank.scrollScenesDown();
            return;
        }
    }

    println("unhandled midi 1: " + status + ", " + data1 + ", " + data2);
}

Push.prototype.onSysex1 = function(data) {
    println("unhandled sysex 1: " + data);
}
