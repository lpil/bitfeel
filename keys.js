Push.prototype.keysInit = function() {
    this.keyOffset = 12;
}

Push.prototype.keysDraw = function() {
    for (var i = 0; i < 64; ++i) {
        if (i % 12 > 0)
            this.setPadColor(i % 8, (i - (i % 8)) / 8, 0, 1);
        else
            this.setPadColor(i % 8, (i - (i % 8)) / 8, 31, 0);
    }
}
