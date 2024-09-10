'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface JemaatItem {
    id: number;
    nama: string;
    gender: string;
    alamat: string;
    telepon: string;
    masjid_id: string;
    masjid: {
        id:number
        nama:string
        rt:string
        rw:string
        desa:string
        kecamatan:string
        created_at:string
        updated_at:string
    };
}

const Jemaat = () => {

    const [jemaat, setJemaat] = useState<JemaatItem[]>([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/jemaat`)
            .then(response => {
                setJemaat(response.data.data);
            })
            .catch(error => console.error('Error fetching jemaat items:', error));
    }, []);

    const deletePengeluaran = (id: number) => {
        axios.delete(`http://localhost:8000/api/jemaat/${id}`)
            .then(() => setJemaat(jemaat.filter(jemaat => jemaat.id !== id)))
            .catch(error => console.error('Error deleting jemaat:', error));
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Pencatatan Jemaat Masjid</h1>
                    <div className="mb-6">
                        <Link href="/jemaat/create">
                            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Tambah Jemaat</button>
                        </Link>
                    </div>
                    {jemaat.length > 0 ? (
                        <ul>
                            {jemaat.map(item => (
                                <li key={item.id} className="bg-gray-50 p-4 mb-4 rounded-lg shadow-sm flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <h2 className="text-lg font-medium text-gray-900">{item.nama}</h2>
                                        <p className="text-gray-600">RT/RW: {item.masjid.rt}/{item.masjid.rw}</p>
                                        <p className="text-gray-600">Desa: {item.masjid.desa}</p>
                                        <p className="text-gray-600">Kecamatan: {item.masjid.kecamatan}</p>
                                        <p className="text-gray-600">Kelamin: {item.gender}</p>
                                        <p className="text-gray-600">Alamat: {item.alamat}</p>
                                        <p className="text-gray-600">Telepon: {item.telepon}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                    <Link href={`/jemaat/${item.id}/edit`}>
                                        <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">Edit</button>
                                    </Link>
                                        <button
                                            onClick={() => deletePengeluaran(item.id)}
                                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Hapus dari Daftar
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">Daftar Jemaat kosong.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Jemaat;