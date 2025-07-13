<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

require __DIR__ . '/config.php';
require __DIR__ . '/dblayer.php';
require __DIR__ . '/helpers.php';

$response = array();

$n = filter_var( $_POST[ 'n' ] , FILTER_SANITIZE_STRING );
$v = filter_var( $_POST[ 'v' ] , FILTER_SANITIZE_STRING );
$s = filter_var( $_POST[ 's' ] , FILTER_SANITIZE_STRING );
$l = filter_var( $_POST[ 'l' ] , FILTER_SANITIZE_STRING );
$sid = filter_var( $_POST[ 'sid' ] , FILTER_SANITIZE_STRING );
if( !$sid ) {
    $sid = uniqid( "", true );
    $response[ "sid" ] = $sid;
}
$phpsid = session_id();

$ip = Helpers::get_ip();

$now = new DateTime( "NOW", new DateTimeZone( 'America/Mexico_City' ) );
$mysqltime = $now->format("Y-m-d H:i:s");
        
$t = EL_TABLE_NAME;

$sql = "INSERT INTO $t ( url, php_sid, sid, n, v, s, ip, datetime ) VALUES "
        . "( '$l', '$phpsid', '$sid', '$n', '$v', '$s', '$ip', '$mysqltime' )";

$result = DBLayer::execute( $sql );

$response[ "s" ] = $result;

echo json_encode( $response );

?>