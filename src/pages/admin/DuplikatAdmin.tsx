import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { mockDuplikat, type DuplikatPair } from "@/data/adminMockData";
import { CheckCircle } from "lucide-react";

export default function DuplikatAdmin() {
  const [loading, setLoading] = useState(true);
  const [pairs, setPairs] = useState<DuplikatPair[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const t = setTimeout(() => {
      setPairs(mockDuplikat);
      setLoading(false);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  const handleMerge = (id: string, side: "A" | "B") => {
    setPairs((p) => p.filter((d) => d.id !== id));
    toast({ title: "Data di-merge", description: `Data ${side} dipertahankan.` });
  };

  const handleDismiss = (id: string) => {
    setPairs((p) => p.filter((d) => d.id !== id));
    toast({ title: "Ditandai bukan duplikat" });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-48 rounded-xl" />
        ))}
      </div>
    );
  }

  if (pairs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <CheckCircle className="w-16 h-16 text-success mb-4" style={{ color: "hsl(107 23% 55%)" }} />
        <h2 className="font-heading text-xl font-bold mb-2">Tidak ada duplikat yang perlu ditinjau 🎉</h2>
        <p className="text-muted-foreground text-sm">Semua data telah diproses.</p>
      </div>
    );
  }

  const fields: Array<{ key: keyof DuplikatPair["dataA"]; label: string }> = [
    { key: "nama", label: "Nama" },
    { key: "ibuSusu", label: "Ibu Susu" },
    { key: "ttl", label: "TTL" },
    { key: "nik", label: "NIK" },
    { key: "kota", label: "Kota" },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-heading text-lg font-bold">Duplikat Terdeteksi</h2>
        <p className="text-sm text-muted-foreground">
          {pairs.length} pasangan data yang terdeteksi mirip. Tinjau dan tentukan tindakan.
        </p>
      </div>

      {pairs.map((pair) => (
        <Card key={pair.id} className="shadow-sm overflow-hidden">
          <div className="px-4 py-2.5 bg-muted/40 border-b border-border flex items-center justify-between">
            <span className="text-sm font-medium">Kemungkinan Duplikat</span>
            <span className="mamasi-badge-unverified">Skor: {pair.score}%</span>
          </div>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Data A */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Data A</p>
                {fields.map((f) => {
                  const isDiff = pair.dataA[f.key] !== pair.dataB[f.key];
                  return (
                    <div
                      key={f.key}
                      className={`flex justify-between text-sm py-1 px-2 rounded ${isDiff ? "bg-warning/15" : ""}`}
                    >
                      <span className="text-muted-foreground">{f.label}</span>
                      <span className="font-medium">{pair.dataA[f.key] || "-"}</span>
                    </div>
                  );
                })}
              </div>

              {/* Data B */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Data B</p>
                {fields.map((f) => {
                  const isDiff = pair.dataA[f.key] !== pair.dataB[f.key];
                  return (
                    <div
                      key={f.key}
                      className={`flex justify-between text-sm py-1 px-2 rounded ${isDiff ? "bg-warning/15" : ""}`}
                    >
                      <span className="text-muted-foreground">{f.label}</span>
                      <span className="font-medium">{pair.dataB[f.key] || "-"}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-border">
              <Button size="sm" onClick={() => handleMerge(pair.id, "A")}>Gunakan Data A</Button>
              <Button size="sm" variant="secondary" onClick={() => handleMerge(pair.id, "B")}>Gunakan Data B</Button>
              <Button size="sm" variant="outline" onClick={() => handleDismiss(pair.id)}>Bukan Duplikat</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
