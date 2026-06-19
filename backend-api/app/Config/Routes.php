<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */
$routes->get('/', 'Home::index');

// --- Rute untuk Login ---
$routes->post('api/login', 'Api\Auth::login');
$routes->options('api/login', 'Api\Auth::login'); // <-- Buka pintu Preflight Login

// --- Rute Pengaduan ---
$routes->get('api/pengaduan', 'Api\Pengaduan::index');

// Rute Pengaduan yang DIGEMBOK TOKEN (Wajib Login)
$routes->post('api/pengaduan', 'Api\Pengaduan::create', ['filter' => 'apiauth']);
$routes->put('api/pengaduan/(:segment)', 'Api\Pengaduan::update/$1', ['filter' => 'apiauth']);
$routes->delete('api/pengaduan/(:segment)', 'Api\Pengaduan::delete/$1', ['filter' => 'apiauth']);

// <-- Buka pintu Preflight Pengaduan
$routes->options('api/pengaduan', 'Api\Pengaduan::index');
$routes->options('api/pengaduan/(:segment)', 'Api\Pengaduan::index');