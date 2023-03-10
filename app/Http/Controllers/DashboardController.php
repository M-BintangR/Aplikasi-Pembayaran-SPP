<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use App\Models\Pembayaran;
use App\Models\Siswa;
use App\Models\Spp;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {

        $items = [
            'kelas' => Kelas::count(),
            'siswa' => Siswa::count(),
            'petugas' => User::count(),
            'spp' => Spp::count(),
            'pembayaran' => Pembayaran::count(),
        ];

        $data_spp = Spp::with(['pembayaran', 'siswa'])->get();

        return Inertia::render('Dashboard/PanelAdmin', [
            'items' => $items,
            'data_spp' => $data_spp,
            'user' => auth()->user(),
        ]);
    }

    public function profile()
    {
        return Inertia::render('Dashboard/Profile', [
            'user' => auth()->user(),
        ]);
    }
}
