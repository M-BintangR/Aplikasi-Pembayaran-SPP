import Sidebar from '@/Layouts/Sidebar'
import HardTitle from '@/Components/HardTitle'
import { Inertia } from '@inertiajs/inertia';
import React, { useEffect, useState } from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi';
import swal from 'sweetalert';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useForm } from '@inertiajs/react';
import { CrudModal } from '@/Components/CrudModal';
import axios from 'axios';
import { DataCreate, DataEdit } from './DataInput';



const Home = ({ items }) => {
    const [record, setRecord] = useState();
    const [loading, setLoading] = useState(false);

    // keperluan modal
    const [onCreteModal, setOnCreateModal] = useState(false);
    const [onEditModal, setOnEditModal] = useState(false);
    const [idSpp, setIdSpp] = useState();

    const trTbl = [
        { title: 'No' },
        { title: 'Nominal' },
        { title: 'Tahun' },
        { title: 'Action' },
    ];

    useEffect(() => {
        setRecord(items?.data);
    }, [items]);

    const handleShortData = (e) => {
        setLoading(true);
        setTimeout(() => {
            setRecord(items?.data);
            setRecord(prev => prev.slice(0, e));
            setLoading(false);
        }, 2000);
    }

    const handleSearchData = (target) => {
        if (target !== "") {
            setRecord(record.filter(item => {
                return item.nominal.toString().toLowerCase().includes(target.toLowerCase()) ||
                    item.tahun.toString().toLowerCase().includes(target.toLowerCase());
            }));
        } else {
            setRecord(items?.data);
        }
    }

    const handleDelete = async (id) => {
        await swal({
            title: "Apakah Anda Yakin?",
            text: "Jika data di hapus, maka data tidak akan bisa di kembalikan!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    Inertia.delete(`/dashboard/spp/${id}`);
                    setRecord(record.filter(record => record.id !== id));
                    swal("Data berhasil di hapus!", {
                        icon: "success",
                    });
                } else {
                    swal("Data batal di hapus");
                }
            });
    }

    // keperluan modal

    const { data, setData, post, processing, errors, put } = useForm({
        nominal: '',
        tahun: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    }

    const clearData = () => {
        setData({ nominal: '', tahun: '' });
    }


    const onHandleSubmit = (e) => {
        e.preventDefault();
        post(route('spp.store'), {
            onSuccess: () => {
                setRecord(items?.data);
                setOnCreateModal(false);
                clearData();
                swal({
                    title: "Berhasil!",
                    text: "Data di tambahkan",
                    icon: "success",
                    button: "Ok",
                });
            }
        });
    }

    const onHandleSubmitEdit = (e) => {
        e.preventDefault();
        put(route('spp.update', idSpp), {
            onSuccess: () => {
                setRecord(items?.data);
                setOnEditModal(false);
                clearData();
                swal({
                    title: "Berhasil!",
                    text: "Data di ubah",
                    icon: "success",
                    button: "Ok",
                });
            }
        });
    }

    const onHandleModal = () => {
        setOnCreateModal(false);
        setOnEditModal(false);
        clearData();
    }

    const onHandleEdit = (id) => {
        try {
            axios.get(route('spp.edit', id))
                .then(res => res.data.item)
                .then(res => {
                    setData({ nominal: res.nominal, tahun: res.tahun });
                    setOnEditModal(true);
                    setIdSpp(res.id)
                });
        } catch (e) {
            console.error(e)
        }

    }


    return (
        <Sidebar active={'spp'}>
            <div className={`absolute bg-yellow-500 text-white duration-1000 left-[47%] right-[46%] ${loading ? 'opacity-100 top-28' : 'opacity-0 top-0'} py-2 px-3 rounded-md shadow-xl`}>
                Memuat...
            </div>
            <HardTitle title={'Data SPP'} subTitle={'Kelola Data SPP'} />
            <div className='text-base font-semibold'>
                <select
                    onChange={(e) => handleShortData(e.target.value)}
                    defaultValue={10}
                    name="short" id="short" className='md:px-7 md:py-1 md:text-sm text-xs px-6 py-0 rounded-sm border-gray-300 focus:outline-none bg-slate-100 focus:bg-white focus:ring-1 focus:ring-purple-700 mr-2'>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                </select>

                <input
                    onInput={(e) => handleSearchData(e.target.value)}
                    className='md:p-1 py-[1px] rounded-sm border shadow-sm border-gray-300 md:text-sm text-xs w-[100px] md:w-[150px] bg-slate-100 focus:bg-white focus:outline-none focus:ring-1 focus:ring-purple-700'
                    type="text"
                    placeholder='Search'
                />

                <button
                    onClick={() => setOnCreateModal(prev => prev = true)}
                    className='bg-purple-700 md:rounded-md md:text-base text-xs rounded-sm px-2 py-[3px] md:px-3 md:py-1 text-white inline float-right'>
                    Tambah Data +
                </button>
            </div>

            {/* table md */}
            <div className="overflow-x-auto mt-2 sm:block hidden">
                <table className='w-full border-2 border-spacing-3'>
                    <thead className='bg-white text-slate-900 border-2 border-gray-300 py-1'>
                        <tr className='border-2 border-gray-300'>
                            {trTbl.map((row, index) => (
                                <th
                                    key={index}
                                    className={`p-3 text-sm font-normal md:font-semibold tracking-wide text-left border-x-2 border-gray-300 `}
                                >{row.title}</th>
                            ))}

                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-100  '>
                        {record?.map((row, index) => (
                            < tr
                                key={index}
                                className={` border-x-2 border-gray-300 odd:bg-gray-200`} >
                                <>
                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300'>{index + 1}</td>
                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300'>{row?.nominal}</td>
                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300'>{row?.tahun}</td>
                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300'>
                                        <button
                                            onClick={() => onHandleEdit(row?.id)}
                                            className='duration-100 text-sm md:text-xl text-black mr-1 font-medium md:font-semibold py-1 px-3 hover:text-amber-400'
                                        >
                                            <BiEdit className='inline' />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(row?.id)}
                                            className='duration-100 text-sm md:text-xl text-black mr-1 font-medium md:font-semibold py-1 px-3 hover:text-red-400'
                                        >
                                            <BiTrash className='inline' />
                                        </button>
                                    </td>
                                </>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='flex justify-end text-purple-700 font-bold mt-3'>
                    <div className="flex bg-white rounded-lg">
                        <button className='border-2 border-gray-400 duration-300 hover:border-purple-400 hover:bg-purple-700 hover:text-white py-1 px-2 rounded-l-md'>
                            <MdKeyboardArrowLeft />
                        </button>
                        <button className='border-2 mx-1 py-1 px-3 border-gray-400 duration-300 hover:border-purple-400 rounded-sm hover:bg-purple-700 hover:text-white'>21</button>
                        <button className='border-2 border-gray-400 duration-300 hover:border-purple-400 py-1 px-2 rounded-r-md hover:bg-purple-700 hover:text-white'>
                            <MdKeyboardArrowRight />
                        </button>
                    </div>
                </div>
            </div>

            {/* table sm */}

            <div className='sm:hidden flex-col gap-y-3 my-3'>
                {record?.map((row, index) => (
                    <div key={index} className='flex flex-row odd:bg-gray-100 p-2 rounded-md'>
                        <ul className='inline-block mr-auto float-left'>
                            {trTbl.map((head, index) => (
                                <li
                                    key={index}
                                    className='mb-1 border-b-2 '>{head?.title}
                                </li>
                            ))}
                        </ul>
                        <ul className='inline-block '>
                            <li className='mb-1 border-b-2'>{index + 1}</li>
                            <li className='mb-1 border-b-2'>{row?.nominal}</li>
                            <li className='mb-1 border-b-2'>{row?.tahun}</li>
                            <li className='my-2'>
                                <button
                                    onClick={() => handleDelete(row?.id)}
                                    className='mr-2 font-semibold text-white bg-red-600 px-1 py-[2px] rounded-sm'>Hapus</button>
                                <button
                                    onClick={() => onHandleEdit(row?.id)}
                                    className='font-semibold text-white bg-amber-600 px-1 py-[2px] rounded-sm'>Edit
                                </button>
                            </li>
                        </ul>
                    </div>
                ))}
            </div>

            <CrudModal
                isVisible={onCreteModal}
                onClose={() => setOnCreateModal(false)}
                title={'Tambah Data'}
            >
                <DataCreate
                    onHandleChange={onHandleChange}
                    errors={errors}
                    data={data}
                    onHandleSubmit={onHandleSubmit}
                    processing={processing}
                    onHandleModal={onHandleModal}
                />
            </CrudModal>

            <CrudModal
                isVisible={onEditModal}
                onClose={() => setOnEditModal(false)}
                title={'Edit Data'}
            >
                <DataEdit
                    onHandleChange={onHandleChange}
                    errors={errors}
                    data={data}
                    onHandleSubmit={onHandleSubmitEdit}
                    processing={processing}
                    onHandleModal={onHandleModal}
                />
            </CrudModal>

        </Sidebar>
    )
}

export default Home
