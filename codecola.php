<?php
/*
 *@Author: zhouqicf@gmail.com
 *@Site: http://www.zhouqicf.com
 */
//Cross domain: http://www.w3.org/TR/cors/#access-control-allow-origin-response-hea
//It's very dangerous, anyone can send any content to your server, make sure only someone you trust have access to visit this action page.
header("Access-Control-Allow-Headers: Content-type, x-requested-with");
header("Access-Control-Allow-Origin: *");
header("Content-type: text/html; charset: utf-8");


//Users can visit modified pages through this address.
$path = "http://dev/save/";
//set filename
$fileName = time();


//create resulte
$fileName = $fileName.".html";
$html = $_POST["html"];
$encode = $_POST["charset"]?$_POST["charset"]:"UTF-8";
if($encode != "UTF-8"){
		$html = iconv("UTF-8",$encode."//IGNORE",$html);
}
$url = $path.$fileName;
$success = '{"code":"200","url":"'.$url.'","message":"success"}';
$fail = '{"code":"900","message":"Server Error."}';
$fp=file_put_contents($fileName,$html);
if(!$fp){
	$message = $fail;
}else{
	$message = $success;
}

echo $message;
?>