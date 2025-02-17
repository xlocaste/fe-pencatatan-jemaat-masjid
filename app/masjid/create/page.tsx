/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Create = () => {
  const [nama, setNama] = useState("");
  const [rt, setRt] = useState("");
  const [rw, setRw] = useState("");
  const [desa, setDesa] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/masjid", {
        nama,
        rt,
        rw,
        desa,
        kecamatan,
      });
      router.push("/masjid");
    } catch (error) {
      console.error("Error creating buku:", error);
    }
  };

//   console.log('daftarJenisPengeluaran', daftarJenisPengeluaran);
//   console.log('daftarJenisPengeluaran lenght', daftarJenisPengeluaran.length);
  
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
              htmlFor="rt"
              className="block text-gray-700 font-medium mb-1"
            >
              RT
            </label>
            <input
              id="rt"
              type="numeric"
              value={rt}
              onChange={(e) => setRt(e.target.value)}
              placeholder="Tanggal"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="rw"
              className="block text-gray-700 font-medium mb-1"
            >
              RW
            </label>
            <input
                max={3}
              id="rw"
              type="numeric"
              value={rw}
              onChange={(e) => setRw(e.target.value)}
              placeholder="Catatan"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="rw"
              className="block text-gray-700 font-medium mb-1"
            >
              Desa
            </label>
            <input
              id="desa"
              type="text"
              value={desa}
              onChange={(e) => setDesa(e.target.value)}
              placeholder="Desa"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="rw"
              className="block text-gray-700 font-medium mb-1"
            >
              Kecamatan
            </label>
            <input
              id="kecamatan"
              type="text"
              value={kecamatan}
              onChange={(e) => setKecamatan(e.target.value)}
              placeholder="Kecamatan"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
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
