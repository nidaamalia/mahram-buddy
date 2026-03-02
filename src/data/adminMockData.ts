// Mock data for admin panel

export interface IbuSusuData {
  id: string;
  nama: string;
  nik: string;
  namaSuami: string;
  nikSuami: string;
  noHp: string;
  kota: string;
  jumlahAnak: number;
  createdAt: string;
}

export interface AnakData {
  id: string;
  nama: string;
  nik: string;
  tanggalLahir: string;
  jumlahIbuSusu: number;
  createdAt: string;
  ibuSusuTerkait: { id: string; nama: string }[];
}

export interface SusuanData {
  id: string;
  namaAnak: string;
  anakId: string;
  ibuSusu: string;
  ibuSusuId: string;
  jenis: "kandung" | "susuan";
  status: "verified" | "unverified" | "ditolak";
  jumlahSusuan: number;
  tahunSusuan: number;
  caraSusuan: "langsung" | "perahan" | "tidak_tahu";
  asiMengenyangkan: boolean;
  createdAt: string;
}

export interface DuplikatPair {
  id: string;
  score: number;
  dataA: { nama: string; ibuSusu: string; ttl: string; nik: string; kota: string };
  dataB: { nama: string; ibuSusu: string; ttl: string; nik: string; kota: string };
}

const kota = ["Surabaya", "Jakarta", "Bandung", "Medan", "Makassar", "Yogyakarta"];

export const mockIbuSusu: IbuSusuData[] = [
  { id: "is-1", nama: "Anita Rahmawati", nik: "3578014503880001", namaSuami: "Reza Pratama", nikSuami: "3578014503880010", noHp: "0812-3456-7890", kota: "Surabaya", jumlahAnak: 4, createdAt: "2026-02-28" },
  { id: "is-2", nama: "Dewi Sartika", nik: "3201015612900002", namaSuami: "Ahmad Fauzi", nikSuami: "3201015612900011", noHp: "0813-5678-1234", kota: "Bandung", jumlahAnak: 3, createdAt: "2026-02-25" },
  { id: "is-3", nama: "Siti Nurhaliza", nik: "1271014402850003", namaSuami: "Budi Santoso", nikSuami: "1271014402850012", noHp: "0857-9012-3456", kota: "Medan", jumlahAnak: 2, createdAt: "2026-02-20" },
  { id: "is-4", nama: "Rina Marlina", nik: "7371016708920004", namaSuami: "Hendra Wijaya", nikSuami: "7371016708920013", noHp: "0821-2345-6789", kota: "Makassar", jumlahAnak: 5, createdAt: "2026-02-15" },
  { id: "is-5", nama: "Yuni Astuti", nik: "3471012301870005", namaSuami: "Dodi Kurniawan", nikSuami: "3471012301870014", noHp: "0856-7890-1234", kota: "Yogyakarta", jumlahAnak: 3, createdAt: "2026-02-10" },
  { id: "is-6", nama: "Lestari Handayani", nik: "3174015509910006", namaSuami: "Irfan Hakim", nikSuami: "3174015509910015", noHp: "0878-1234-5678", kota: "Jakarta", jumlahAnak: 2, createdAt: "2026-02-05" },
  { id: "is-7", nama: "Nurul Aini", nik: "3578012204930007", namaSuami: "Fajar Rahman", nikSuami: "3578012204930016", noHp: "0819-3456-7890", kota: "Surabaya", jumlahAnak: 4, createdAt: "2026-01-28" },
  { id: "is-8", nama: "Fitri Wulandari", nik: "3201011806880008", namaSuami: "Galih Permana", nikSuami: "3201011806880017", noHp: "0852-5678-9012", kota: "Bandung", jumlahAnak: 1, createdAt: "2026-01-22" },
  { id: "is-9", nama: "Kartini Susanti", nik: "1271010703960009", namaSuami: "Joko Widodo", nikSuami: "1271010703960018", noHp: "0838-7890-1234", kota: "Medan", jumlahAnak: 3, createdAt: "2026-01-15" },
  { id: "is-10", nama: "Mira Lestari", nik: "7371012909940010", namaSuami: "Lukman Hakim", nikSuami: "7371012909940019", noHp: "0815-1234-5678", kota: "Makassar", jumlahAnak: 2, createdAt: "2026-01-10" },
  { id: "is-11", nama: "Putri Amelia", nik: "3471011205890011", namaSuami: "Naufal Rizki", nikSuami: "3471011205890020", noHp: "0896-3456-7890", kota: "Yogyakarta", jumlahAnak: 6, createdAt: "2026-01-05" },
  { id: "is-12", nama: "Ratna Dewi", nik: "3174010108870012", namaSuami: "Oscar Putra", nikSuami: "3174010108870021", noHp: "0877-5678-1234", kota: "Jakarta", jumlahAnak: 2, createdAt: "2025-12-28" },
  { id: "is-13", nama: "Sari Indah", nik: "3578013006910013", namaSuami: "Pandu Wibowo", nikSuami: "3578013006910022", noHp: "0831-7890-1234", kota: "Surabaya", jumlahAnak: 3, createdAt: "2025-12-20" },
  { id: "is-14", nama: "Tika Permata", nik: "3201012507930014", namaSuami: "Qori Saputra", nikSuami: "3201012507930023", noHp: "0858-9012-3456", kota: "Bandung", jumlahAnak: 1, createdAt: "2025-12-15" },
  { id: "is-15", nama: "Ulfa Hasanah", nik: "1271011104890015", namaSuami: "Rizal Fahmi", nikSuami: "1271011104890024", noHp: "0822-1234-5678", kota: "Medan", jumlahAnak: 4, createdAt: "2025-12-10" },
];

export const mockAnak: AnakData[] = [
  { id: "an-1", nama: "Faiz Pratama", nik: "3578015503180001", tanggalLahir: "2018-03-15", jumlahIbuSusu: 2, createdAt: "2026-02-28", ibuSusuTerkait: [{ id: "is-1", nama: "Anita Rahmawati" }, { id: "is-2", nama: "Dewi Sartika" }] },
  { id: "an-2", nama: "Aisyah Zahra", nik: "3201011912190002", tanggalLahir: "2019-12-19", jumlahIbuSusu: 1, createdAt: "2026-02-25", ibuSusuTerkait: [{ id: "is-1", nama: "Anita Rahmawati" }] },
  { id: "an-3", nama: "Dani Setiawan", nik: "1271010706170003", tanggalLahir: "2017-06-07", jumlahIbuSusu: 1, createdAt: "2026-02-20", ibuSusuTerkait: [{ id: "is-3", nama: "Siti Nurhaliza" }] },
  { id: "an-4", nama: "Budi Rahman", nik: "7371012003200004", tanggalLahir: "2020-03-20", jumlahIbuSusu: 3, createdAt: "2026-02-15", ibuSusuTerkait: [{ id: "is-4", nama: "Rina Marlina" }, { id: "is-5", nama: "Yuni Astuti" }, { id: "is-7", nama: "Nurul Aini" }] },
  { id: "an-5", nama: "Sari Wulandari", nik: "3471011508210005", tanggalLahir: "2021-08-15", jumlahIbuSusu: 1, createdAt: "2026-02-10", ibuSusuTerkait: [{ id: "is-5", nama: "Yuni Astuti" }] },
  { id: "an-6", nama: "Rizki Maulana", nik: "3174010204190006", tanggalLahir: "2019-04-02", jumlahIbuSusu: 2, createdAt: "2026-02-05", ibuSusuTerkait: [{ id: "is-6", nama: "Lestari Handayani" }, { id: "is-12", nama: "Ratna Dewi" }] },
  { id: "an-7", nama: "Nadia Putri", nik: "3578011101200007", tanggalLahir: "2020-01-11", jumlahIbuSusu: 1, createdAt: "2026-01-28", ibuSusuTerkait: [{ id: "is-7", nama: "Nurul Aini" }] },
  { id: "an-8", nama: "Hafiz Abdullah", nik: "3201010907180008", tanggalLahir: "2018-07-09", jumlahIbuSusu: 1, createdAt: "2026-01-22", ibuSusuTerkait: [{ id: "is-8", nama: "Fitri Wulandari" }] },
  { id: "an-9", nama: "Zahra Amira", nik: "1271012605210009", tanggalLahir: "2021-05-26", jumlahIbuSusu: 2, createdAt: "2026-01-15", ibuSusuTerkait: [{ id: "is-9", nama: "Kartini Susanti" }, { id: "is-3", nama: "Siti Nurhaliza" }] },
  { id: "an-10", nama: "Raka Aditya", nik: "7371011712190010", tanggalLahir: "2019-12-17", jumlahIbuSusu: 1, createdAt: "2026-01-10", ibuSusuTerkait: [{ id: "is-10", nama: "Mira Lestari" }] },
  { id: "an-11", nama: "Salma Azzahra", nik: "3471010308200011", tanggalLahir: "2020-08-03", jumlahIbuSusu: 2, createdAt: "2026-01-05", ibuSusuTerkait: [{ id: "is-11", nama: "Putri Amelia" }, { id: "is-5", nama: "Yuni Astuti" }] },
  { id: "an-12", nama: "Farel Hidayat", nik: "3174011406170012", tanggalLahir: "2017-06-14", jumlahIbuSusu: 1, createdAt: "2025-12-28", ibuSusuTerkait: [{ id: "is-12", nama: "Ratna Dewi" }] },
  { id: "an-13", nama: "Keyla Ramadhani", nik: "3578012202210013", tanggalLahir: "2021-02-22", jumlahIbuSusu: 1, createdAt: "2025-12-20", ibuSusuTerkait: [{ id: "is-13", nama: "Sari Indah" }] },
  { id: "an-14", nama: "Alif Firmansyah", nik: "3201010505190014", tanggalLahir: "2019-05-05", jumlahIbuSusu: 1, createdAt: "2025-12-15", ibuSusuTerkait: [{ id: "is-14", nama: "Tika Permata" }] },
  { id: "an-15", nama: "Nabila Safira", nik: "1271011808200015", tanggalLahir: "2020-08-18", jumlahIbuSusu: 2, createdAt: "2025-12-10", ibuSusuTerkait: [{ id: "is-15", nama: "Ulfa Hasanah" }, { id: "is-9", nama: "Kartini Susanti" }] },
];

const statuses: Array<"verified" | "unverified" | "ditolak"> = ["verified", "unverified", "ditolak"];
const jenisList: Array<"kandung" | "susuan"> = ["kandung", "susuan"];
const caraList: Array<"langsung" | "perahan" | "tidak_tahu"> = ["langsung", "perahan", "tidak_tahu"];

export const mockSusuan: SusuanData[] = [
  { id: "su-1", namaAnak: "Faiz Pratama", anakId: "an-1", ibuSusu: "Anita Rahmawati", ibuSusuId: "is-1", jenis: "susuan", status: "verified", jumlahSusuan: 6, tahunSusuan: 2018, caraSusuan: "langsung", asiMengenyangkan: true, createdAt: "2026-02-28" },
  { id: "su-2", namaAnak: "Faiz Pratama", anakId: "an-1", ibuSusu: "Dewi Sartika", ibuSusuId: "is-2", jenis: "susuan", status: "unverified", jumlahSusuan: 3, tahunSusuan: 2018, caraSusuan: "perahan", asiMengenyangkan: false, createdAt: "2026-02-27" },
  { id: "su-3", namaAnak: "Aisyah Zahra", anakId: "an-2", ibuSusu: "Anita Rahmawati", ibuSusuId: "is-1", jenis: "susuan", status: "verified", jumlahSusuan: 8, tahunSusuan: 2020, caraSusuan: "langsung", asiMengenyangkan: true, createdAt: "2026-02-25" },
  { id: "su-4", namaAnak: "Dani Setiawan", anakId: "an-3", ibuSusu: "Siti Nurhaliza", ibuSusuId: "is-3", jenis: "kandung", status: "verified", jumlahSusuan: 0, tahunSusuan: 2017, caraSusuan: "langsung", asiMengenyangkan: true, createdAt: "2026-02-20" },
  { id: "su-5", namaAnak: "Budi Rahman", anakId: "an-4", ibuSusu: "Rina Marlina", ibuSusuId: "is-4", jenis: "susuan", status: "ditolak", jumlahSusuan: 5, tahunSusuan: 2020, caraSusuan: "tidak_tahu", asiMengenyangkan: false, createdAt: "2026-02-15" },
  { id: "su-6", namaAnak: "Budi Rahman", anakId: "an-4", ibuSusu: "Yuni Astuti", ibuSusuId: "is-5", jenis: "susuan", status: "verified", jumlahSusuan: 7, tahunSusuan: 2020, caraSusuan: "langsung", asiMengenyangkan: true, createdAt: "2026-02-14" },
  { id: "su-7", namaAnak: "Budi Rahman", anakId: "an-4", ibuSusu: "Nurul Aini", ibuSusuId: "is-7", jenis: "susuan", status: "unverified", jumlahSusuan: 4, tahunSusuan: 2020, caraSusuan: "perahan", asiMengenyangkan: true, createdAt: "2026-02-13" },
  { id: "su-8", namaAnak: "Sari Wulandari", anakId: "an-5", ibuSusu: "Yuni Astuti", ibuSusuId: "is-5", jenis: "kandung", status: "verified", jumlahSusuan: 0, tahunSusuan: 2021, caraSusuan: "langsung", asiMengenyangkan: true, createdAt: "2026-02-10" },
  { id: "su-9", namaAnak: "Rizki Maulana", anakId: "an-6", ibuSusu: "Lestari Handayani", ibuSusuId: "is-6", jenis: "susuan", status: "verified", jumlahSusuan: 5, tahunSusuan: 2019, caraSusuan: "langsung", asiMengenyangkan: true, createdAt: "2026-02-05" },
  { id: "su-10", namaAnak: "Rizki Maulana", anakId: "an-6", ibuSusu: "Ratna Dewi", ibuSusuId: "is-12", jenis: "susuan", status: "unverified", jumlahSusuan: 6, tahunSusuan: 2019, caraSusuan: "perahan", asiMengenyangkan: false, createdAt: "2026-02-04" },
  { id: "su-11", namaAnak: "Nadia Putri", anakId: "an-7", ibuSusu: "Nurul Aini", ibuSusuId: "is-7", jenis: "susuan", status: "verified", jumlahSusuan: 10, tahunSusuan: 2020, caraSusuan: "langsung", asiMengenyangkan: true, createdAt: "2026-01-28" },
  { id: "su-12", namaAnak: "Hafiz Abdullah", anakId: "an-8", ibuSusu: "Fitri Wulandari", ibuSusuId: "is-8", jenis: "susuan", status: "ditolak", jumlahSusuan: 2, tahunSusuan: 2018, caraSusuan: "tidak_tahu", asiMengenyangkan: false, createdAt: "2026-01-22" },
  { id: "su-13", namaAnak: "Zahra Amira", anakId: "an-9", ibuSusu: "Kartini Susanti", ibuSusuId: "is-9", jenis: "susuan", status: "verified", jumlahSusuan: 5, tahunSusuan: 2021, caraSusuan: "langsung", asiMengenyangkan: true, createdAt: "2026-01-15" },
  { id: "su-14", namaAnak: "Zahra Amira", anakId: "an-9", ibuSusu: "Siti Nurhaliza", ibuSusuId: "is-3", jenis: "susuan", status: "unverified", jumlahSusuan: 3, tahunSusuan: 2021, caraSusuan: "perahan", asiMengenyangkan: true, createdAt: "2026-01-14" },
  { id: "su-15", namaAnak: "Raka Aditya", anakId: "an-10", ibuSusu: "Mira Lestari", ibuSusuId: "is-10", jenis: "susuan", status: "verified", jumlahSusuan: 8, tahunSusuan: 2020, caraSusuan: "langsung", asiMengenyangkan: true, createdAt: "2026-01-10" },
  { id: "su-16", namaAnak: "Salma Azzahra", anakId: "an-11", ibuSusu: "Putri Amelia", ibuSusuId: "is-11", jenis: "susuan", status: "verified", jumlahSusuan: 6, tahunSusuan: 2020, caraSusuan: "langsung", asiMengenyangkan: true, createdAt: "2026-01-05" },
  { id: "su-17", namaAnak: "Salma Azzahra", anakId: "an-11", ibuSusu: "Yuni Astuti", ibuSusuId: "is-5", jenis: "susuan", status: "ditolak", jumlahSusuan: 1, tahunSusuan: 2020, caraSusuan: "tidak_tahu", asiMengenyangkan: false, createdAt: "2026-01-04" },
  { id: "su-18", namaAnak: "Farel Hidayat", anakId: "an-12", ibuSusu: "Ratna Dewi", ibuSusuId: "is-12", jenis: "kandung", status: "verified", jumlahSusuan: 0, tahunSusuan: 2017, caraSusuan: "langsung", asiMengenyangkan: true, createdAt: "2025-12-28" },
  { id: "su-19", namaAnak: "Keyla Ramadhani", anakId: "an-13", ibuSusu: "Sari Indah", ibuSusuId: "is-13", jenis: "susuan", status: "unverified", jumlahSusuan: 5, tahunSusuan: 2021, caraSusuan: "langsung", asiMengenyangkan: true, createdAt: "2025-12-20" },
  { id: "su-20", namaAnak: "Alif Firmansyah", anakId: "an-14", ibuSusu: "Tika Permata", ibuSusuId: "is-14", jenis: "susuan", status: "verified", jumlahSusuan: 7, tahunSusuan: 2019, caraSusuan: "langsung", asiMengenyangkan: true, createdAt: "2025-12-15" },
];

export const mockDuplikat: DuplikatPair[] = [
  { id: "dup-1", score: 85, dataA: { nama: "Faiz Pratama", ibuSusu: "Anita Rahmawati", ttl: "2018", nik: "-", kota: "Surabaya" }, dataB: { nama: "Faiz Pratama", ibuSusu: "Anita Rahmawati", ttl: "2018", nik: "3578015503180001", kota: "-" } },
  { id: "dup-2", score: 78, dataA: { nama: "Aisyah Zahra", ibuSusu: "Anita Rahmawati", ttl: "2019", nik: "3201011912190002", kota: "Bandung" }, dataB: { nama: "Aisya Zahra", ibuSusu: "Anita Rahmawati", ttl: "2019", nik: "-", kota: "Bandung" } },
  { id: "dup-3", score: 92, dataA: { nama: "Budi Rahman", ibuSusu: "Rina Marlina", ttl: "2020", nik: "7371012003200004", kota: "Makassar" }, dataB: { nama: "Budi Rahman", ibuSusu: "Rina Marlina", ttl: "2020", nik: "7371012003200004", kota: "Makassar" } },
  { id: "dup-4", score: 71, dataA: { nama: "Nadia Putri", ibuSusu: "Nurul Aini", ttl: "2020", nik: "-", kota: "Surabaya" }, dataB: { nama: "Nadia Puteri", ibuSusu: "Nurul Aini", ttl: "2020", nik: "3578011101200007", kota: "Surabaya" } },
  { id: "dup-5", score: 75, dataA: { nama: "Zahra Amira", ibuSusu: "Kartini Susanti", ttl: "2021", nik: "1271012605210009", kota: "Medan" }, dataB: { nama: "Zahra Amira", ibuSusu: "Kartini S", ttl: "2021", nik: "-", kota: "Medan" } },
  { id: "dup-6", score: 80, dataA: { nama: "Salma Azzahra", ibuSusu: "Putri Amelia", ttl: "2020", nik: "-", kota: "Yogyakarta" }, dataB: { nama: "Salma Azahra", ibuSusu: "Putri Amelia", ttl: "2020", nik: "3471010308200011", kota: "-" } },
  { id: "dup-7", score: 73, dataA: { nama: "Nabila Safira", ibuSusu: "Ulfa Hasanah", ttl: "2020", nik: "1271011808200015", kota: "Medan" }, dataB: { nama: "Nabila Safira", ibuSusu: "Ulfa H", ttl: "2020", nik: "-", kota: "Medan" } },
];

export const chartData = [
  { month: "Oct", jumlah: 24 },
  { month: "Nov", jumlah: 31 },
  { month: "Dec", jumlah: 19 },
  { month: "Jan", jumlah: 45 },
  { month: "Feb", jumlah: 38 },
  { month: "Mar", jumlah: 52 },
];
