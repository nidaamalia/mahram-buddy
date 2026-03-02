import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { mockSusuan, type SusuanData } from "@/data/adminMockData";

export default function SusuanAdmin() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [jenisFilter, setJenisFilter] = useState("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selected, setSelected] = useState<SusuanData | null>(null);
  const [editForm, setEditForm] = useState<Partial<SusuanData>>({});
  const { toast } = useToast();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const filtered = mockSusuan.filter((d) => {
    const matchSearch =
      d.namaAnak.toLowerCase().includes(search.toLowerCase()) ||
      d.ibuSusu.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || d.status === statusFilter;
    const matchJenis = jenisFilter === "all" || d.jenis === jenisFilter;
    return matchSearch && matchStatus && matchJenis;
  });

  const openEdit = (item: SusuanData) => {
    setSelected(item);
    setEditForm({ ...item });
    setDrawerOpen(true);
  };

  const handleSave = () => {
    toast({ title: "Data disimpan", description: "Data susuan berhasil diperbarui." });
    setDrawerOpen(false);
  };

  const setStatus = (status: "verified" | "unverified" | "ditolak") => {
    setEditForm({ ...editForm, status });
    toast({ title: "Status diubah", description: `Status diubah menjadi ${status}.` });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-96 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Cari nama anak atau ibu susu..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Semua Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="unverified">Unverified</SelectItem>
            <SelectItem value="ditolak">Ditolak</SelectItem>
          </SelectContent>
        </Select>
        <Select value={jenisFilter} onValueChange={setJenisFilter}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Semua Jenis" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Jenis</SelectItem>
            <SelectItem value="kandung">Kandung</SelectItem>
            <SelectItem value="susuan">Susuan</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Anak</TableHead>
              <TableHead>Ibu Susu</TableHead>
              <TableHead className="hidden sm:table-cell">Jenis</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell text-center">Susuan</TableHead>
              <TableHead className="hidden lg:table-cell">Tahun</TableHead>
              <TableHead className="hidden sm:table-cell">Tanggal</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">Tidak ada data ditemukan.</TableCell>
              </TableRow>
            ) : (
              filtered.map((d, i) => (
                <TableRow key={d.id} className={i % 2 !== 0 ? "bg-muted/30" : ""} onClick={() => openEdit(d)} role="button">
                  <TableCell className="font-medium">{d.namaAnak}</TableCell>
                  <TableCell>{d.ibuSusu}</TableCell>
                  <TableCell className="hidden sm:table-cell capitalize text-sm">{d.jenis}</TableCell>
                  <TableCell>
                    <span className={
                      d.status === "verified" ? "mamasi-badge-verified" :
                      d.status === "unverified" ? "mamasi-badge-unverified" :
                      "mamasi-badge-rejected"
                    }>
                      {d.status === "verified" ? "✅" : d.status === "unverified" ? "⚠️" : "❌"} {d.status}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-center">{d.jumlahSusuan}</TableCell>
                  <TableCell className="hidden lg:table-cell text-sm">{d.tahunSusuan}</TableCell>
                  <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">{d.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); openEdit(d); }}>Edit</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Drawer */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="font-heading">Edit Data Susuan</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label>Jumlah Susuan</Label>
              <Input type="number" value={editForm.jumlahSusuan ?? ""} onChange={(e) => setEditForm({ ...editForm, jumlahSusuan: Number(e.target.value) })} />
            </div>
            <div className="space-y-1.5">
              <Label>Tahun Disusui</Label>
              <Input type="number" value={editForm.tahunSusuan ?? ""} onChange={(e) => setEditForm({ ...editForm, tahunSusuan: Number(e.target.value) })} />
            </div>
            <div className="space-y-1.5">
              <Label>Cara Susuan</Label>
              <Select value={editForm.caraSusuan || ""} onValueChange={(v) => setEditForm({ ...editForm, caraSusuan: v as any })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="langsung">Langsung</SelectItem>
                  <SelectItem value="perahan">Perahan</SelectItem>
                  <SelectItem value="tidak_tahu">Tidak Tahu</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label>ASI Mengenyangkan</Label>
              <Switch checked={editForm.asiMengenyangkan ?? false} onCheckedChange={(v) => setEditForm({ ...editForm, asiMengenyangkan: v })} />
            </div>

            {/* Status Override */}
            <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-3">
              <Label className="text-sm font-medium">Status Verifikasi</Label>
              <div className="flex gap-2">
                {(["verified", "unverified", "ditolak"] as const).map((s) => (
                  <Button
                    key={s}
                    size="sm"
                    variant={editForm.status === s ? "default" : "outline"}
                    onClick={() => setStatus(s)}
                    className={editForm.status === s ? (
                      s === "verified" ? "bg-success text-success-foreground hover:bg-success/90" :
                      s === "ditolak" ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" :
                      ""
                    ) : ""}
                  >
                    {s === "verified" ? "✅ Verified" : s === "unverified" ? "⚠️ Unverified" : "❌ Ditolak"}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">Mengubah status secara manual tanpa perlu konfirmasi dari Ibu Susu</p>
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={handleSave} className="flex-1">Simpan</Button>
              <Button variant="outline" onClick={() => setDrawerOpen(false)} className="flex-1">Batal</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
