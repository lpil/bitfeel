function DeviceController() {
    push.device_controller = this;

    push.cursorDevice.addNameObserver(
        17, "     (none)", function(name) {
            push.device_controller.onNameChanged(name);
        });

    push.cursorDevice.addPageNamesObserver(
        function(names) {
            push.device_controller.onPageNamesChanged(names);
        });

    const mkObName = function(index, dc) {
        return function(name) {
            dc.onParameterNameChanged(index, name);
        };
    };

    const mkObValue = function(index, dc) {
        return function(value) {
            dc.onParameterValueChanged(index, value);
        };
    };

    for (var i = 0; i < 8; ++i) {
        var param = push.cursorDevice.getParameter(i);
        param.addNameObserver(17, "", mkObName(i, this));
        param.addValueDisplayObserver(17, "", mkObValue(i, this));
    }
}

DeviceController.prototype = {
    name: "",
    page_names: "",
    parameters_name: ["", "", "", "", "", "", "", ""],
    parameters_value: ["", "", "", "", "", "", "", ""],
    pending_draw: false,

    queueDrawScreen: function() {
        if (this.pending_draw)
            return;
        this.pending_draw = true;
        push.midi_queue.push(function() {
            push.device_controller.drawScreen();
        });
    },

    drawScreen: function() {
        this.pending_draw = false;
        for (var i = 0; i < 8; ++i) {
            push.screen.texts[i >> 1][2 * (i % 2)]     = this.parameters_name[i];
            push.screen.texts[i >> 1][2 * (i % 2) + 1] = this.parameters_value[i];
        }
        push.screen.refresh();
    },

    onNameChanged: function(name) {
        this.name = name;
    },

    onPageNamesChanged: function(names) {
        this.page_names = names;
    },

    onParameterNameChanged: function(index, name) {
        this.parameters_name[index] = (name + "                 ").substr(0, 17);
        this.queueDrawScreen();
    },

    onParameterValueChanged: function(index, value) {
        this.parameters_value[index] = (value + "                 ").substr(0, 17);
        this.queueDrawScreen();
    }
}
