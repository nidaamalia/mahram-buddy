import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Copy, Plus, Check, AlertTriangle, Clock } from "lucide-react";
import { toast } from "sonner";

// Mock data
const mockAnakData = {
  nama: "Faiz",
  ibuSusuList: [
    {
      id: "ibu1",
      nama: "Anita",
      namaSuami: "Reza",
      status: "verified" as const,
      jumlahSusuan: 6,
      caraSusuan: "langsung",
      anakKandung: [
        { nama: "Dani", tahunLahir: 2015, gender: "L" },
        { nama: "Sari", tahunLahir: 2019, gender: "P" },
      ],
      anakSusuan: [
        { nama: "Budi", status: "verified" },
        { nama: "Lina", status: "unverified" },
      ],
    },
    {
      id: "ibu2",
      nama: "Dewi",
      namaSuami: "Ahmad",
      status: "unverified" as const,
      jumlahSusuan: 3,
      caraSusuan: "perahan",
      anakKandung: [
        { nama: "Rina", tahunLahir: 2017, gender: "P" },
      ],
      anakSusuan: [],
    },
  ],
};

function StatusBadge({ status }: { status: string }) {
  if (status === "verified") return <span className="mamasi-badge-verified"><Check className="w-3 h-3" /> Terverifikasi</span>;
  if (status === "ditolak") return <span className="mamasi-badge-rejected">❌ Tidak dikonfirmasi</span>;
  return <span className="mamasi-badge-unverified"><Clock className="w-3 h-3" /> Menunggu konfirmasi</span>;
}

export default function AnakDetail() {
  const { id } = useParams();
  const data = mockAnakData;

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link disalin!");
  };

  const totalMahram = data.ibuSusuList.reduce(
    (sum, ibu) => sum + 2 + ibu.anakKandung.length + ibu.anakSusuan.length,
    0
  );

  return (
    <section className="mamasi-section">
      <div className="mamasi-container max-w-3xl">
        {/* Privacy disclaimer */}
        <div className="text-xs text-muted-foreground bg-muted/50 rounded-lg px-4 py-2 mb-6">
          Halaman ini dapat diakses siapapun yang memiliki link. Bagikan dengan bijak.
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
              Mahram {data.nama}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {totalMahram} orang mahram dari {data.ibuSusuList.length} ibu susu
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={copyLink} className="gap-2 text-sm">
              <Copy className="w-4 h-4" /> Bagikan
            </Button>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-sm">
              <Link to={`/catat?anak_id=${id}`}>
                <Plus className="w-4 h-4" /> Tambah Ibu Susu
              </Link>
            </Button>
          </div>
        </div>

        {/* Accordion per ibu susu */}
        <Accordion type="single" collapsible defaultValue="ibu-0" className="space-y-3">
          {data.ibuSusuList.map((ibu, idx) => {
            const memberCount = 2 + ibu.anakKandung.length + ibu.anakSusuan.length;
            return (
              <AccordionItem key={ibu.id} value={`ibu-${idx}`} className="mamasi-card border overflow-hidden px-0">
                <AccordionTrigger className="px-5 py-4 hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <span className="font-heading font-semibold text-foreground">
                      Dari Ibu Susu: {ibu.nama}
                    </span>
                    <span className="text-xs text-muted-foreground">({memberCount} orang)</span>
                    <StatusBadge status={ibu.status} />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5">
                  {/* Syarat check */}
                  <div className="flex flex-wrap gap-2 mb-5 text-xs">
                    <span className="mamasi-badge-verified">
                      <Check className="w-3 h-3" /> {ibu.jumlahSusuan}x Susuan
                    </span>
                    <span className="mamasi-badge-verified">
                      <Check className="w-3 h-3" /> {ibu.caraSusuan === "langsung" ? "Langsung" : "Perahan"}
                    </span>
                  </div>

                  {/* Ibu & Ayah Susu */}
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Ibu & Ayah Susu</h4>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-sm">
                        <span>👩</span>
                        <Link to={`/ibu-susu/${ibu.id}`} className="font-medium text-foreground hover:text-primary transition-colors">{ibu.nama}</Link>
                        <span className="text-muted-foreground text-xs">Ibu Susu</span>
                      </div>
                      {ibu.namaSuami && (
                        <div className="flex items-center gap-2 text-sm">
                          <span>👨</span>
                          <span className="font-medium text-foreground">{ibu.namaSuami}</span>
                          <span className="text-muted-foreground text-xs">Ayah Susu</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Anak Kandung */}
                  {ibu.anakKandung.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Anak Kandung</h4>
                      <div className="space-y-1.5">
                        {ibu.anakKandung.map((ak, ai) => (
                          <div key={ai} className="flex items-center gap-2 text-sm">
                            <span>{ak.gender === "L" ? "👦" : "👧"}</span>
                            <span className="font-medium text-foreground">{ak.nama}</span>
                            <span className="text-muted-foreground text-xs">
                              {ak.tahunLahir < 2018 ? "Kakak" : "Adik"} Susuan (lahir {ak.tahunLahir})
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Saudara Susuan */}
                  {ibu.anakSusuan.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Saudara Susuan</h4>
                      <div className="space-y-1.5">
                        {ibu.anakSusuan.map((as2, ai) => (
                          <div key={ai} className="flex items-center gap-2 text-sm">
                            <span>👦</span>
                            <span className="font-medium text-foreground">{as2.nama}</span>
                            <span className="text-muted-foreground text-xs">Saudara Susuan</span>
                            {as2.status === "unverified" && (
                              <span className="mamasi-badge-unverified text-[10px]">
                                <Clock className="w-2.5 h-2.5" /> belum terverifikasi
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        {/* Footer */}
        <div className="mt-8 space-y-4">
          <p className="text-sm text-muted-foreground">
            Hubungan mahram sebenarnya lebih luas (nenek susu, bibi susu, dst).{" "}
            <Link to="/info" className="text-primary hover:underline">Pelajari selengkapnya →</Link>
          </p>
          <p className="text-xs text-muted-foreground">
            Hasil ini berdasarkan data yang tercatat. Tidak ditemukannya data bukan berarti tidak ada hubungan mahram.
          </p>
        </div>
      </div>
    </section>
  );
}
