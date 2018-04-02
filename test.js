const GLib = imports.gi.GLib;
const Gio   = imports.gi.Gio;
const Lang  = imports.lang;

let command = ['/bin/bash', '-c', 'bluetoothctl']
let [res, pid, stdin, stdout, stderr] = GLib.spawn_async_with_pipes(null, command, null, GLib.SpawnFlags.SEARCH_PATH, null);
let readStream = new Gio.DataInputStream({ base_stream : new Gio.UnixInputStream({ fd : stdout }) });
//let writeStream = new Gio.UnixOutputStream({ fd: stdin });
let writeStream = new Gio.DataOutputStream({ base_stream: new Gio.UnixOutputStream({ fd: stdin }) });

let out
let size

let count = 0

while(true)
{
  count++;
  log(count);
  if (count == 3) {
    log('hearr')
    writeStream.write('paired-devices', null)
  }
  [out, size] = readStream.read_line(null)
  log(out);
}
