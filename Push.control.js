loadAPI(1);

host.defineController("Ableton", "Push", "1.0", "d4e8d489-1252-41ac-ad31-11562a5f9531");
host.defineMidiPorts(2, 2);
host.addDeviceNameBasedDiscoveryPair(["Ableton Push MIDI 1", "Ableton Push MIDI 2"],
                                     ["Ableton Push MIDI 1", "Ableton Push MIDI 2"]);

const BT_TAP_TEMPO    = 3;
const BT_METRONOME    = 9;

const BT_MASTER = 28;
const BT_STOP = 29;

const BT_1_32T = 43;
const BT_1_32 = 42;
const BT_1_16T = 41;
const BT_1_16 = 40;
const BT_1_8T = 39;
const BT_1_8 = 38;
const BT_1_4T = 37;
const BT_1_4 = 36;

const BT_LEFT = 44;
const BT_RIGHT = 45;
const BT_TOP = 46;
const BT_BOTTOM = 47;

const BT_UNDO         = 119;
const BT_DELETE       = 118;
const BT_DOUBLE       = 117;
const BT_QUANTIZE     = 116;

const BT_FIXED_LENGTH = 90;
const BT_AUTOMATE     = 89;
const BT_DUPLICATE    = 88;
const BT_NEW          = 87;
const BT_RECORD       = 86;
const BT_PLAY         = 85;

const BT_SELECT = 48;
const BT_SHIFT = 49;
const BT_NOTE = 50;
const BT_SESSION = 51;
const BT_ADD_EFFECT = 52;
const BT_ADD_TRACK = 53;
const BT_OCTAVE_DOWN = 54;
const BT_OCTAVE_UP = 55;
const BT_REPEAT = 56;
const BT_ACCENT = 57;
const BT_SCALE = 58;
const BT_USER = 59;
const BT_MUTE = 60;
const BT_SOLO = 61;
const BT_SEND = 62;
const BT_RETURN = 63;

const BT_DEVICE = 110;
const BT_BROWSE = 111;
const BT_TRACK = 112;
const BT_CLIP = 113;
const BT_VOLUME = 114;
const BT_PAN_SEND = 115;

const STATE_KEYBOARD = "keyboard";
const STATE_CLIP = "clip";
const STATE_DRUM = "drum";

function init() {
    state = STATE_KEYBOARD;

    transport = host.createTransport();
    trackBank = host.createTrackBankSection(8, 0, 0);
    cursorTrack = host.createCursorTrackSection(0, 8);
    masterTrack = host.createMasterTrackSection(0);

    host.getMidiInPort(0).setMidiCallback(onMidi0);
    host.getMidiInPort(0).setSysexCallback(onSysex0);
    host.getMidiInPort(1).setMidiCallback(onMidi1);
    host.getMidiInPort(1).setSysexCallback(onSysex1);

    userControls = host.createUserControls(8);
    for (var i = 0; i < 8; ++i) {
        
    }

    transport.addIsPlayingObserver(function(isPlaying) {
        println(isPlaying ? "PLAY" : "STOP");
    });

    println("Initialized");
}

function exit() {
}

function flush() {
}

function onMidi0(status, data1, data2) {
    println("unhandled midi 0: " + status + ", " + data1 + ", " + data2);
}

function onSysex0(data) {
    println("unhandled sysex 0: " + data);
}

function onMidi1(status, data1, data2) {
    if (status == 176) {
        // button pushed
        switch (data1) {
        case BT_PLAY:
            if (data2 == 0)
                transport.togglePlay();
            return;

        case BT_RECORD:
            if (data2 == 0)
                transport.record();
            return;

        case BT_METRONOME:
            if (data2 == 127)
                transport.toggleClick();
            return;
        }
    }

    println("unhandled midi 1: " + status + ", " + data1 + ", " + data2);
}

function onSysex1(data) {
    println("unhandled sysex 1: " + data);
}
