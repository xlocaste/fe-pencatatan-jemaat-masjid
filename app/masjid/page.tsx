'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface MasjidId {
    id: number;
    nama: string;
    rt: string;
    rw: string;
    desa: string;
    kecamatan: string;
}

const Masjid = () => {

    const [masjid, setMasjid] = useState<MasjidId[]>([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/masjid`)
            .then(response => {
                setMasjid(response.data.data);
            })
            .catch(error => console.error('Error fetching masjid items:', error));
    }, []);

    const deleteMasjid = (id: number) => {
        axios.delete(`http://localhost:8000/api/masjid/${id}`)
            .then(() => setMasjid(masjid.filter(masjid => masjid.id !== id)))
            .catch(error => console.error('Error deleting masjid:', error));
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Pencatatan Jemaat Masjid</h1>
                    <div className="mb-6">
                        <Link href="/masjid/create">
                            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Tambah Masjid</button>
                        </Link>
                    </div>
                    {masjid.length > 0 ? (
                        <ul>
                            {masjid.map(item => (
                                <li key={item.id} className="bg-gray-50 p-4 mb-4 rounded-lg shadow-sm flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <h2 className="text-lg font-medium text-gray-900">{item.nama}</h2>
                                        <p className="text-gray-600">RT/RW: {item.rt}/{item.rw}</p>
                                        <p className="text-gray-600">Desa: {item.desa}</p>
                                        <p className="text-gray-600">Kecamatan: {item.kecamatan}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                    <Link href={`/masjid/${item.id}/edit`}>
                                        <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">Edit</button>
                                    </Link>
                                        <button
                                            onClick={() => deleteMasjid(item.id)}
                                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Hapus dari Daftar
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">Daftar kosong.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Masjid;