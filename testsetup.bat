netsh advfirewall firewall add rule name="ExpoDevPorts" ^
  dir=in action=allow protocol=TCP localport=19000,19001,19002,19006 ^
  profile=private enable=yes


netsh advfirewall firewall add rule name="NodeJS_Private" ^
  dir=in action=allow program="C:\Program Files\nodejs\node.exe" ^
  profile=private enable=yes

netsh advfirewall firewall add rule name="ExpoDevPorts_Outbound" ^
  dir=out action=allow protocol=TCP localport=19000,19001,19002,19006 ^
  profile=private enable=yes
