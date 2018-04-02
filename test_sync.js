const GLib = imports.gi.GLib;

let [res, out] = GLib.spawn_sync(null, ['/bin/bash', '-c', "echo -e 'paired-devices' | bluetoothctl"], null, 0, null);
let lines = String(out).split('\n');
log(lines.length)

let devices = lines.filter(line => line.indexOf('Device') === 0)
log(devices)

let macs = devices.map(device => device.split('\ ')[1])
log(macs)

let [res2, out2] = GLib.spawn_sync(null, ['/bin/bash', '-c', `echo -e 'connect ${macs[0]}' | bluetoothctl`], null, 0, null)
log(out2)

log('end')
