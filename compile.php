#!/usr/bin/env php
<?php

$css = trim(shell_exec('recess --compress ./Source/style.less'));
$logo = base64_encode(file_get_contents('./Source/logo.png'));
$css = str_replace('url(logo.png)', 'url(data:image/png;base64,'.$logo.')', $css);
$script = trim(shell_exec('coffee -p -c ./Source/script.coffee  | uglifyjs -nc'));
$script = str_replace('<!--%css%-->', $css, $script);
echo $script;