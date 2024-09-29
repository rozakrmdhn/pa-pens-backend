CREATE TABLE "dosen" (
  "id" serial PRIMARY KEY,
  "nip" integer,
  "nama" varchar,
  "jenis_kelamin" varchar,
  "nomor_hp" varchar,
  "alamat" varchar,
  "email" varchar,
  "createdAt" timestamp,
  "updatedAt" timestamp
);

CREATE TABLE "mahasiswa" (
  "id" serial PRIMARY KEY,
  "nrp" integer,
  "nama" varchar,
  "jenis_kelamin" varchar,
  "nomor_hp" varchar,
  "alamat" varchar,
  "jurusan" varchar,
  "email" varchar,
  "createdAt" timestamp,
  "updatedAt" timestamp
);

CREATE TABLE "mitra" (
  "id" serial PRIMARY KEY,
  "nama_mitra" varchar,
  "alamat" varchar,
  "kota" varchar,
  "createdAt" timestamp,
  "updatedAt" timestamp
);

CREATE TABLE "daftar" (
  "id" serial PRIMARY KEY,
  "lama_kp" varchar,
  "tempat_kp" varchar,
  "alamat" varchar,
  "kota" varchar,
  "tanggal_kp" date,
  "status_persetujuan" integer,
  "status_dokumen" integer,
  "catatan_koordinator_kp" varchar,
  "id_mahasiswa" integer,
  "id_dosen" integer,
  "createdAt" timestamp,
  "updatedAt" timestamp
);

CREATE TABLE "anggota" (
  "id" serial PRIMARY KEY,
  "id_mahasiswa" integer,
  "id_daftar" integer,
  "createdAt" timestamp,
  "updatedAt" timestamp
);

CREATE TABLE "logbook" (
  "id" serial PRIMARY KEY,
  "id_anggota" integer,
  "tanggal" date,
  "jam_mulai" time,
  "jam_selesai" time,
  "kegiatan" varchar,
  "kesesuaian_matkul_diajarkan" integer,
  "matkul_diajarkan" varchar,
  "setujui_logbook" integer,
  "lampiran_laporan" varchar,
  "lampiran_foto" varchar,
  "catatan_pembimbing" varchar,
  "createdAt" timestamp,
  "updatedAt" timestamp
);

ALTER TABLE "anggota" ADD FOREIGN KEY ("id_daftar") REFERENCES "daftar" ("id");

ALTER TABLE "anggota" ADD FOREIGN KEY ("id_mahasiswa") REFERENCES "mahasiswa" ("id");

ALTER TABLE "logbook" ADD FOREIGN KEY ("id_anggota") REFERENCES "anggota" ("id");

ALTER TABLE "daftar" ADD FOREIGN KEY ("id_mahasiswa") REFERENCES "mahasiswa" ("id");

ALTER TABLE "daftar" ADD FOREIGN KEY ("id_dosen") REFERENCES "dosen" ("id");
