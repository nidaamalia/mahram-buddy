import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, AlertTriangle } from "lucide-react";

// Mock search results
const mockResults = [
  { id: "1", nama: "Faiz", ibuSusu: "Anita", kota: "Surabaya", tahunLahir: 2018 },
  { id: "2", nama: "Faiz", ibuSusu: "Dewi", kota: "Bandung", tahunLahir: 2019, duplikat: true },
];

export default function Cek() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState<typeof mockResults>([]);

  const handleSearch = () => {
    if (!query.trim()) return;
    setSearched(true);
    // Mock: filter by name
    const filtered = mockResults.filter((r) =>
      r.nama.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <section className="mamasi-section">
      <div className="mamasi-container max-w-2xl">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-2">
          Cek Mahram
        </h1>
        <p className="text-muted-foreground mb-8">
          Cari data mahram sepersusuan berdasarkan nama anak.
        </p>

        <div className="flex gap-2 mb-8">
          <div className="flex-1">
            <Label className="sr-only">Nama Anak</Label>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Masukkan nama anak..."
              className="h-12 text-base"
            />
          </div>
          <Button
            onClick={handleSearch}
            className="h-12 bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-6"
          >
            <Search className="w-4 h-4" /> Cari
          </Button>
        </div>

        {searched && results.length === 0 && (
          <div className="mamasi-card text-center py-12">
            <p className="text-muted-foreground mb-2">
              Tidak ada data tercatat untuk "{query}".
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Bukan berarti tidak ada mahram susuan — mungkin belum dicatat.
            </p>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/catat">Catat Susuan Baru</Link>
            </Button>
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-3">
            {results.map((r) => (
              <Link
                key={r.id}
                to={`/anak/${r.id}`}
                className="mamasi-card flex items-center justify-between group hover:shadow-md hover:border-primary/30 transition-all"
              >
                <div>
                  <p className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                    👦 {r.nama}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Ibu Susu: {r.ibuSusu} | Kota: {r.kota} | Lahir: {r.tahunLahir}
                  </p>
                  {r.duplikat && (
                    <div className="flex items-center gap-1 mt-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-warning" />
                      <span className="text-xs text-warning-foreground font-medium">Data ini mungkin duplikat</span>
                    </div>
                  )}
                </div>
                <span className="text-muted-foreground group-hover:text-primary transition-colors">→</span>
              </Link>
            ))}
          </div>
        )}

        {!searched && (
          <div className="text-center py-12 text-muted-foreground text-sm">
            Masukkan nama anak untuk mulai mencari.
          </div>
        )}
      </div>
    </section>
  );
}
