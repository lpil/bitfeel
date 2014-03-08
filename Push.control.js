loadAPI(1);

load("push.js");

/////////////////////////
// Interface to Bitwig //
/////////////////////////

host.defineController("Ableton", "Push", "1.0", "d4e8d489-1252-41ac-ad31-11562a5f9531");
host.defineMidiPorts(2, 2);
host.addDeviceNameBasedDiscoveryPair(["Ableton Push MIDI 1", "Ableton Push MIDI 2"],
                                     ["Ableton Push MIDI 1", "Ableton Push MIDI 2"]);

function init() {
    push = new Push();
}

function exit() {
    push = null;
}

function flush() {
}
