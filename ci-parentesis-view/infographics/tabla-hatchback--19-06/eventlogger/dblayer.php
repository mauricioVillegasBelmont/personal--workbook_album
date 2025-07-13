<?php

class DBLayer {
    
    static function execute( $sql, $data=array() ) {
        $connection_data = array( "mysql", EL_DB_HOST, EL_DB_NAME, "utf8" );
        $format_string = "%s:host=%s;dbname=%s;charset=%s";
        $connection_string = vsprintf($format_string, $connection_data);
        $options = array(PDO::ATTR_PERSISTENT=>true);
        $pdo = new PDO($connection_string, EL_DB_USER, EL_DB_PASS, $options);
        $query = $pdo->prepare($sql);
        for($i=0; $i<count($data); $i++) $query->bindParam($i+1, $data[$i]);
        $query->execute();

        $errors = $query->errorInfo();
        if( !is_null($errors[1]) ) return false;
        
        $is_insert = (strpos(strtoupper($sql), 'INSERT') === 0);
        $is_select = (strpos(strtoupper($sql), 'SELECT') === 0);
        if($is_insert) {
            return $pdo->lastInsertId();
        } elseif($is_select) {
            return $query->fetchAll(PDO::FETCH_ASSOC);
        }
    }
    
}