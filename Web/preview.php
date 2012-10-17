<?php

$code = '<a class="qiita-timeline" href="https://qiita.com/users/__username__" data-qiita-username="__username__">__username__のtips</a><script src="widget.js"></script>';
$username = @$_GET['username'];

if ( $username ) {
	echo str_replace('__username__', $username, $code);
} else {
	header('HTTP', true, 400);
	echo 'Bad Request';
}