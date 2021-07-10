<?php
  header('Access-Control-Allow-Origin: *');

  $name = $_POST['name'];
  $company = $_POST['company'];
  $phone = $_POST['phone'];
  $email = $_POST['email'];

  $to      = 'biwifog375@ovooovo.com';
  $subject = 'New request from site';
  $message = $name.' '.$company.' '.$phone.' '.$email;

  mail($to, $subject, $message);

  echo 'ok';
