import React, { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import { BsChevronDown, BsCurrencyDollar } from 'react-icons/bs';
import { MdOutlineDashboardCustomize, MdOutlineSchool } from 'react-icons/md';
import { FaSchool, FaRegMoneyBillAlt } from 'react-icons/fa';
import { RiUserSettingsLine } from 'react-icons/ri';
import { Link } from '@inertiajs/react';

const Sidebar = ({ children, active }) => {
    const [open, setOpen] = useState(true);
    const [submenuOpen, setSubmenuOpen] = useState(false);
    const [targetActive, setTargetActive] = useState(false);
    const sidebarRef = useRef();

    useEffect(() => {
        setTargetActive(active);
    }, [active]);

    const adminMenu = [
        {
            title: 'Dashboard',
            active: 'dashboard',
            submenu: true,
            submenuItems: [
                { title: 'Menu Utama', link: '/dashboard', active: 'menu utama' },
                { title: 'Profil', link: '', active: 'profil' },
            ],
        },
        { title: 'Data Pembayaran', link: '/dashboard/pembayaran', spacing: true, active: 'pembayaran' },
        { title: 'Data Siswa', link: '/dashboard/siswa', active: 'siswa' },
        { title: 'Data Kelas', link: '/dashboard/kelas', active: 'kelas' },
        { title: 'Data Spp', link: '/dashboard/spp', active: 'spp' },
        { title: 'Data Petugas', link: '/dashboard/petugas', active: 'petugas' },
    ];

    return (
        <div>
            <Navbar setOpen={setOpen} open={open} sidebarRef={sidebarRef} />
            <div className='pt-10'>
                <div className="flex flex-row">
                    <div ref={sidebarRef} className={` drop-shadow-md md:pt-10 pt-14 bg-gray-200 md:h-screen bottom-0 top-0 md:relative absolute duration-500  ${open ? 'md:relative absolute md:w-1/4 w-1/2 bottom-0' : 'w-12 relative h-screen'}`}>
                        {adminMenu.map((menu, index) => (
                            <div key={index}>
                                {menu?.spacing && (
                                    <h2 className={`${menu?.spacing && 'mt-5 mb-3'} font-semibold md:text-xl text-md mx-3 text-slate-900 duration-300 ${!open && 'scale-0 scale-x-0 mx-0 mt-0 mb-0'}`}>Kelola Data
                                    </h2>
                                )}
                                <div className={` hover:bg-gray-300  pb-1 hover:text-purple-700 text-gray-900`}>
                                    <Link
                                        onClick={() => setOpen(prev => prev = true)}
                                        href={menu?.link}
                                    >
                                        <li
                                            className={`duration-200 text-sm flex items-center ${targetActive === menu.active && 'bg-gray-300 text-purple-700'} gap-x-4 cursor-pointer p-2 hover:bg-light-with rounded-md mt-2`}
                                            onClick={(e) => { menu.submenu ? e.preventDefault() : ''; menu.submenu ? setSubmenuOpen(!submenuOpen) : ''; }}
                                        >
                                            <span className='md:text-2xl text-base block float-left bg-purple-700 p-1 rounded-md text-white text-center'>
                                                <>
                                                    {menu?.title === "Dashboard" ? (
                                                        <MdOutlineDashboardCustomize />
                                                    ) : null}

                                                    {menu?.title === "Data Pembayaran" ? (
                                                        <BsCurrencyDollar />
                                                    ) : null}

                                                    {menu?.title === "Data Siswa" ? (
                                                        <MdOutlineSchool />
                                                    ) : null}

                                                    {menu?.title === "Data Kelas" ? (
                                                        <FaSchool />
                                                    ) : null}

                                                    {menu?.title === "Data Spp" ? (
                                                        <FaRegMoneyBillAlt />
                                                    ) : null}

                                                    {menu?.title === "Data Petugas" ? (
                                                        <RiUserSettingsLine />
                                                    ) : null}

                                                </>
                                            </span>
                                            <span className={`md:text-base text-xs md:font-semibold font-medium flex-1 duration-200 ${!open && 'hidden'}`}>{menu?.title}
                                            </span>
                                            {menu?.submenu && open && (
                                                <BsChevronDown className={`duration-300 ${!submenuOpen && 'rotate-180'}`} />
                                            )}
                                        </li>
                                    </Link>

                                    {menu.submenu && submenuOpen && open && (
                                        <ul className='my-2 space-y-1 flex flex-col'>
                                            {menu.submenuItems.map((submenu, index) => (
                                                <Link href={submenu?.link} key={index} className=''>
                                                    <li className={`hover:text-purple-700 text-sm flex ${targetActive === submenu.active && 'bg-gray-300'} items-center  cursor-pointer p-2 hover:bg-light-with rounded-md md:mx-14 mx-3 duration-300`}
                                                        onClick={() => setOpen(prev => prev = true)}
                                                    >
                                                        {submenu.title}
                                                    </li>
                                                </Link>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        ))
                        }
                    </div>
                    <div className={`duration-300 ${open ? 'w-full' : 'w-full'}`}>
                        <div className='md:p-6 md:mt-3 p-3 md:text-base text-xs'>
                            <main className=''>
                                {children}
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar