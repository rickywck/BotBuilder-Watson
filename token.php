<?php
function checkWeixin(){
$signature = $_GET["signature"];
$timestamp = $_GET["timestamp"];
$nonce = $_GET["nonce"];
$echostr = $_GET["echostr"];
$token = "qilipingmgl";
$tmpArr = array($nonce,$token,$timestamp);
sort($tmpArr,SORT_STRING);
$str = implode($tmpArr);
$sign = sha1($str);
if ($sign == $signature) {
echo $echostr;
}
}
checkWeixin();
?>