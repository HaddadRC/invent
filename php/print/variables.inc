<?php
/****************************************
 *
 *
 *
 ****************************************/

$libPath = "../../../lib/mpdf/mpdf.php";
require_once "../connect.inc";

//==================  protection  ==================================
$protection = array('print');
//==================  header  ==================================
//$header = array (
//    'odd' => array (
//        'L' => array (
//            'content' => '<img src="../../resources/images/label-yellow.png" alt="" width="42" height="42">',
//            'font-size' => 10,
//            'font-style' => 'B',
//            'font-family' => 'serif',
//            'color'=>'#000000'
//        ),
//        'C' => array (
//            'content' => '',
//            'font-size' => 10,
//            'font-style' => 'B',
//            'font-family' => 'serif',
//            'color'=>'#000000'
//        ),
//        'R' => array (
//            'content' => 'My document',
//            'font-size' => 10,
//            'font-style' => 'B',
//            'font-family' => 'serif',
//            'color'=>'#000000'
//        ),
//        'line' => 1,
//    ),
//    'even' => array (
//        'L' => array (
//            'content' => '',
//            'font-size' => 10,
//            'font-style' => 'B',
//            'font-family' => 'serif',
//            'color'=>'#000000'
//        ),
//        'C' => array (
//            'content' => '',
//            'font-size' => 10,
//            'font-style' => 'B',
//            'font-family' => 'serif',
//            'color'=>'#000000'
//        ),
//        'R' => array (
//            'content' => 'My document',
//            'font-size' => 10,
//            'font-style' => 'B',
//            'font-family' => 'serif',
//            'color'=>'#000000'
//        ),
//        'line' => 1,
//    )
//);
//==================  footer  ==================================
$footer = array(
    'odd' =>
        array(
            'L' =>
                array(
                    'content' => 'Compagny',
                    'font-size' => 8,
                ),
            'C' =>
                array(
                    'content' => '- {PAGENO}/{nbpg}-',
                    'font-size' => 8,
                ),
            'R' =>
                array(
                    'content' => '{DATE d-m-Y}',
                    'font-size' => 8,
                ),
            'line' => 1,
        ),
    'even' =>
        array(
            'L' =>
                array(
                    'content' => 'Compagny',
                    'font-size' => 8,
                ),
            'C' =>
                array(
                    'content' => '- {PAGENO} -',
                    'font-size' => 8,
                ),
            'R' =>
                array(
                    'content' => '{DATE d-m-Y}',
                    'font-size' => 8,
                ),
            'line' => 1,
        ),
);
