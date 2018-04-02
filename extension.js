const Clutter = imports.gi.Clutter;
const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;
const Util = imports.misc.util;
const PopupMenu = imports.ui.popupMenu;
const PanelMenu = imports.ui.panelMenu;
const GLib = imports.gi.GLib;

let text, button;
let command, message;

function _showHello() {
    GLib.spawn_async(null, ['/bin/bash', '-c', "echo -e 'connect 17:11:03:8F:08:31' | bluetoothctl"], null, 0, null)
    GLib.spawn_async(null, ['/bin/bash', '-c', "sleep 5 && paplay /usr/share/sounds/freedesktop/stereo/complete.oga"], null, 0, null)
    Main.notify("Connecting...")
}

function init() {
    button = new St.Bin({ style_class: 'panel-button', reactive: true, can_focus: true, x_fill: true, y_fill: false, track_hover: true });
    let icon = new St.Icon({ icon_name: 'system-run-symbolic', style_class: 'system-status-icon' });

    button.set_child(icon);
    button.connect('button-press-event', _showHello);

    let btcontrol = Main.panel.statusArea.aggregateMenu._bluetooth._control;
}

function enable() {
    Main.panel._rightBox.insert_child_at_index(button, 0);
}

function disable() {
    Main.panel._rightBox.remove_child(button);
}
