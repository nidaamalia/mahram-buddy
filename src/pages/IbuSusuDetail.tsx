import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Copy, Plus } from "lucide-react";
import { toast } from "sonner";

// Mock data
const mockIbuSusu = {
  nama: "Anita",
  namaSuami: "Reza",
  kota: "Surabaya",
  anakKandung: [
    { id: "ak1", nama: "Dani", tahunLahir: 2015 },
    { id: "ak2", nama: "Sari", tahunLahir: 2019 },
  ],
  anakSusuan: [
    { id: "as1", nama: "Faiz", status: "verified" },
    { id: "as2", nama: "Budi", status: "verified" },
    { id: "as3", nama: "Lina", status: "unverified" },
  ],
};

export default function IbuSusuDetail() {
  const { id } = useParams();
  const data = mockIbuSusu;

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link disalin!");
  };

  return (
    <section className="mamasi-section">
      <div className="mamasi-container max-w-3xl">
        <div className="text-xs text-muted-foreground bg-muted/50 rounded-lg px-4 py-2 mb-6">
          Halaman ini dapat diakses siapapun yang memiliki link. Bagikan dengan bijak.
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
              {data.nama}
            </h1>
            {data.namaSuami && (
              <p className="text-sm text-muted-foreground mt-1">Suami: {data.namaSuami}</p>
            )}
            {data.kota && (
              <p className="text-sm text-muted-foreground">Kota: {data.kota}</p>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={copyLink} className="gap-2 text-sm">
              <Copy className="w-4 h-4" /> Bagikan
            </Button>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-sm">
              <Link to={`/catat?ibu_susu_id=${id}`}>
                <Plus className="w-4 h-4" /> Tambah Anak Susuan
              </Link>
            </Button>
          </div>
        </div>

        {/* Anak Kandung */}
        {data.anakKandung.length > 0 && (
          <div className="mamasi-card mb-4">
            <h2 className="font-heading font-semibold text-foreground mb-3">Anak Kandung</h2>
            <div className="space-y-2">
              {data.anakKandung.map((anak) => (
                <div key={anak.id} className="flex items-center gap-2 text-sm">
                  <span>👶</span>
                  <span className="font-medium text-foreground">{anak.nama}</span>
                  <span className="text-muted-foreground text-xs">lahir {anak.tahunLahir}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Anak Susuan */}
        <div className="mamasi-card">
          <h2 className="font-heading font-semibold text-foreground mb-3">Anak Susuan</h2>
          {data.anakSusuan.length === 0 ? (
            <p className="text-sm text-muted-foreground">Belum ada data anak susuan tercatat.</p>
          ) : (
            <div className="space-y-2">
              {data.anakSusuan.map((anak) => (
                <Link
                  key={anak.id}
                  to={`/anak/${anak.id}`}
                  className="flex items-center gap-2 text-sm group"
                >
                  <span>👦</span>
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">{anak.nama}</span>
                  {anak.status === "verified" ? (
                    <span className="mamasi-badge-verified text-[10px]">✅ Terverifikasi</span>
                  ) : (
                    <span className="mamasi-badge-unverified text-[10px]">⏳ Menunggu</span>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground mt-8">
          Hasil ini berdasarkan data yang tercatat. Tidak ditemukannya data bukan berarti tidak ada hubungan mahram.
        </p>
      </div>
    </section>
  );
}
