'use client'
import axios from "axios";
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation";

const Edit = () => {
    const [nama, setNama] = useState('');
    const [rt, setRt] = useState('');
    const [rw, setRw] = useState('');
    const [desa, setDesa] = useState('');
    const [kecamatan, setKecamatan] = useState('');
    const params = useParams();
    const router = useRouter();
    const id = params.id;

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8000/api/masjid/${id}`)
                .then(response => {
                    const masjid = response.data.data;
                    setNama(masjid.nama);
                    setRt(masjid.rt);
                    setRw(masjid.rw);
                    setDesa(masjid.desa);
                    setKecamatan(masjid.kecamatan);
                })
                .catch(error => console.error('Error fetching Masjid:', error));
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const id = params.id;
        if (id) {
            try {
                await axios.put(`http://localhost:8000/api/masjid/${id}`, { nama, rt, rw, desa, kecamatan});
                router.push('/masjid');
            } catch (error) {
                console.error('Error updating jMasjid:', error);
            }
        }
    };

    // console.log('daftarJenisPengeluaran', daftarJenisPengeluaran);
    // console.log('daftarJenisPengeluaran lenght', daftarJenisPengeluaran.length);

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Edit Masjid</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="nama">Nama</label>
                            <input
                                id="nama"
                                type="text"
                                value={nama}
                                onChange={e => setNama(e.target.value)}
                                placeholder="Nama"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="quantity">RT</label>
                            <input
                                id="rt"
                                type="numeric"
                                value={rt}
                                onChange={e => setRt(e.target.value)}
                                placeholder="RT"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="quantity">RW</label>
                            <input
                                id="rw"
                                type="numeric"
                                value={rw}
                                onChange={e => setRw(e.target.value)}
                                placeholder="RW"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="quantity">Desa</label>
                            <input
                                id="desa"
                                type="text"
                                value={desa}
                                onChange={e => setDesa(e.target.value)}
                                placeholder="Desa"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="quantity">Kecamatan</label>
                            <input
                                id="kecamatan"
                                type="text"
                                value={kecamatan}
                                onChange={e => setKecamatan(e.target.value)}
                                placeholder="Kecamatan"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Edit;