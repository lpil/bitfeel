function Keyboard() {
    this.keyOffset = 3 * 12;
    this.keys = [];
}

Keyboard.prototype.drawKey = function(x, y, is_pushed) {
    
}

Keyboard.prototype.drawKeys = function() {
    for (var x = 0; x < 8; ++x)
        for (var y = 0; y < 8; ++y)
            this.drawKey(x, y, false);
}
