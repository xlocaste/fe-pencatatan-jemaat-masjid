/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Create = () => {
  const [nama, setNama] = useState("");
  const [gender, setGender] = useState("");
  const [alamat, setAlamat] = useState("");
  const [telepon, setTelepon] = useState("");
  const [daftarMasjid, setDaftarMasjid] = useState([]);
  const [selectedMasjid, setSelectedMasjid] = useState<
    number | null
  >(null);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/masjid`)
      .then((daftarMasjid) =>
        setDaftarMasjid(daftarMasjid.data.data)
      )
      .catch((error) =>
        console.error("Error fetching Masjid items:", error)
      );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/jemaat", {
        nama,
        gender,
        alamat,
        telepon,
        masjid_id: selectedMasjid,
      });
      router.push("/jemaat");
    } catch (error) {
      console.error("Error creating buku:", error);
    }
  };

//   console.log('daftarMasjid', daftarMasjid);
//   console.log('daftarMasjid lenght', daftarMasjid.length);
  
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Tambah Pengeluaran
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="nama"
              className="block text-gray-700 font-medium mb-1"
            >
              Nama
            </label>
            <input
              id="nama"
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Nama"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block text-gray-700 font-medium mb-1"
            >
              Kelamin
            </label>
            <input
              id="gender"
              type="text"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              placeholder="Kelamin"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="alamat"
              className="block text-gray-700 font-medium mb-1"
            >
              Alamat
            </label>
            <input
              id="alamat"
              type="text"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              placeholder="Catatan"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="telepon"
              className="block text-gray-700 font-medium mb-1"
            >
              Telepon
            </label>
            <input
              id="telepon"
              type="numeric"
              value={telepon}
              onChange={(e) => setTelepon(e.target.value)}
              placeholder="Telepon"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div>
            <select
              value={selectedMasjid || ""}
              onChange={(e) =>
                setSelectedMasjid(Number(e.target.value))
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="">Pilih Masjid</option>
              {daftarMasjid.length > 0 ? (
                daftarMasjid.map((masjid: any) => {
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
                <option value="">Tidak Ada Daftar Masjid</option>
              )}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Tambah
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
