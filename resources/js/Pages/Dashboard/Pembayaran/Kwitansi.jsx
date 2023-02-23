import React from 'react'

const Kwitansi = ({ user, siswa, pembayaran, kelas, kwitansi }) => {
    setTimeout(() => {
        window.print();
    }, 1000);

    return (
        <div className='bg-white my-5 mx-10'>
            <h1 className='text-center text-2xl uppercase font-bold'>Kwitansi Pembayaran Spp</h1>
            <p className='text-center text-sm lowercase'>Laporan pembayaran spp siswa</p>
            <div class="border border-x-0 border-t-0 text-center mt-2 border-b-2 border-b-black text-sm">
                Jl. Goa Ria/Pa’bongkayya Laikang | Sudiang | Kel. Laikang | Kec. Biringkanaya | admin@mutiarailmu.sch.id
            </div>
            <div className='my-3 border-2 border-slate-200 bg-slate-100 p-4'>
                <table>
                    <tr className='my-10'>
                        <td width={'5%'}>Sudah Terima Dari</td>
                        <td width={'2%'}>:</td>
                        <td width={'20%'}>{siswa?.nis} / {siswa?.nama} / {kelas?.nama_kelas}</td>
                    </tr>
                    <tr className='my-10'>
                        <td width={'5%'}>Untuk Pembayaran</td>
                        <td width={'2%'}>:</td>
                        <td width={'20%'}><span className='font-bold'>Spp Bulan</span> : <span className='capitalize'>{kwitansi?.bulan}</span></td>
                    </tr>
                    <tr className='my-10'>
                        <td width={'5%'}>Jumlah Pembayaran</td>
                        <td width={'2%'}>:</td>
                        <td width={'20%'}>Rp. {pembayaran.toLocaleString()},-</td>
                    </tr>
                    <tr className='my-10'>
                        <td width={'5%'}>Terbilang</td>
                        <td width={'2%'}>:</td>
                        <td width={'20%'}>Empat Ratus Ribu Rupiah</td>
                    </tr>
                </table>
            </div>
            <div className='float-right my-3'>
                <table>
                    <tr>
                        <td className="text-center">Petugas : {user?.nama_pengguna}</td>
                    </tr>
                    <tr className='h-20'>

                    </tr>
                    <tr>
                        <td className='text-center'>Tanggal : {kwitansi?.tanggal}</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Kwitansi