'use client'
import axios from "axios";
import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation";

const Edit = () => {
    const [nama, setNama] = useState('');
    const [gender, setGender] = useState('');
    const [alamat, setAlamat] = useState('');
    const [telepon, setTelepon] = useState('');
    const [daftarMasjid, setDaftarMasjid] = useState([]);
    const [selectedMasjid, setSelectedMasjid] = useState<
    number | null
  >(null);
    const params = useParams();
    const router = useRouter();

    useEffect(() => {
        axios
          .get(`http://localhost:8000/api/masjid`)
          .then((daftarMasjid) =>
            setDaftarMasjid(daftarMasjid.data.data)
          )
          .catch((error) =>
            console.error("Error fetching jemaat items:", error)
          );
      },[]);

    useEffect(() => {
        const id = params.id;
        if (id) {
            axios.get(`http://localhost:8000/api/jemaat/${id}`)
                .then(response => {
                    const jemaat = response.data.data;
                    setNama(jemaat.nama);
                    setGender(jemaat.gender);
                    setAlamat(jemaat.alamat);
                    setTelepon(jemaat.telepon);
                })
                .catch(error => console.error('Error fetching Jemaat:', error));
        }
    }, [params.id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const id = params.id;
        if (id) {
            try {
                await axios.put(`http://localhost:8000/api/jemaat/${id}`, { nama, gender, alamat, telepon, masjid_id:selectedMasjid});
                router.push('/jemaat');
            } catch (error) {
                console.error('Error updating jemaat:', error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Edit Jemaat</h1>
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
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="quantity">Kelamin</label>
                            <select id="gender" value={gender} onChange={(e => setGender(e.target.value))}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                >
                                <option>
                                    Laki-Laki
                                </option>
                                <option>
                                    Perempuan
                                </option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="quantity">Alamat</label>
                            <input
                                id="alamat"
                                type="text"
                                value={alamat}
                                onChange={e => setAlamat(e.target.value)}
                                placeholder="Alamat"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            />
                        </div>
                        <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="quantity">Masjid</label>
                            <select
                            value={selectedMasjid || ""}
                            onChange={(e) =>
                                setSelectedMasjid(Number(e.target.value))
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            >
                            <option value="">Pilih Masjid</option>
                            {daftarMasjid.length > 0 ? (
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                daftarMasjid.filter((daftarMasjid, idx) => idx < 2).map((masjid: any) => {
                                //   console.log("masjid", masjid);

                                return (
                                    <option
                                    key={masjid.id}
                                    value={masjid.id}
                                    >
                                    {masjid.nama}
                                    </option>
                                );
                                })
                            ) : (
                                <option value="">Tidak Ada Masjid</option>
                            )}
                            </select>
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