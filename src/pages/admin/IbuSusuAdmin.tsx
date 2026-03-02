import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Pencil, Trash2, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { mockIbuSusu, type IbuSusuData } from "@/data/adminMockData";

export default function IbuSusuAdmin() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState<IbuSusuData | null>(null);
  const [editForm, setEditForm] = useState<Partial<IbuSusuData>>({});
  const { toast } = useToast();
  const perPage = 6;

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const filtered = mockIbuSusu.filter(
    (d) =>
      d.nama.toLowerCase().includes(search.toLowerCase()) ||
      d.nik.includes(search)
  );
  const totalPages = Math.ceil(filtered.length / perPage);
  const pageData = filtered.slice((page - 1) * perPage, page * perPage);

  const openEdit = (item: IbuSusuData) => {
    setSelected(item);
    setEditForm({ ...item });
    setDrawerOpen(true);
  };

  const handleSave = () => {
    toast({ title: "Data disimpan", description: `Data ${editForm.nama} berhasil diperbarui.` });
    setDrawerOpen(false);
  };

  const handleDelete = () => {
    toast({ title: "Data dihapus", description: `${selected?.nama} telah dihapus.`, variant: "destructive" });
    setDeleteOpen(false);
    setDrawerOpen(false);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full max-w-sm rounded-lg" />
        <Skeleton className="h-96 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Cari nama atau NIK..."
          className="pl-9"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
      </div>

      <div className="rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead className="hidden md:table-cell">NIK</TableHead>
              <TableHead className="hidden sm:table-cell">No HP</TableHead>
              <TableHead className="hidden lg:table-cell">Kota</TableHead>
              <TableHead className="text-center">Anak</TableHead>
              <TableHead className="hidden sm:table-cell">Tanggal</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                  Tidak ada data ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              pageData.map((d, i) => (
                <TableRow key={d.id} className={i % 2 !== 0 ? "bg-muted/30" : ""}>
                  <TableCell className="font-medium">{d.nama}</TableCell>
                  <TableCell className="hidden md:table-cell text-xs font-mono text-muted-foreground">{d.nik}</TableCell>
                  <TableCell className="hidden sm:table-cell text-sm">{d.noHp}</TableCell>
                  <TableCell className="hidden lg:table-cell text-sm">{d.kota}</TableCell>
                  <TableCell className="text-center">{d.jumlahAnak}</TableCell>
                  <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">{d.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(d)} title="Edit">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => { setSelected(d); setDeleteOpen(true); }} title="Hapus">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                      <Button variant="ghost" size="icon" asChild title="Lihat Halaman Publik">
                        <Link to={`/ibu-susu/${d.id}`} target="_blank"><ExternalLink className="w-4 h-4" /></Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              variant={page === i + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      )}

      {/* Edit Drawer */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="font-heading">Edit Data Ibu Susu</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            {([
              ["nama", "Nama"],
              ["nik", "NIK"],
              ["namaSuami", "Nama Suami"],
              ["nikSuami", "NIK Suami"],
              ["noHp", "No HP"],
              ["kota", "Kota"],
            ] as [keyof IbuSusuData, string][]).map(([key, label]) => (
              <div key={key} className="space-y-1.5">
                <Label>{label}</Label>
                <Input
                  value={(editForm as any)[key] || ""}
                  onChange={(e) => setEditForm({ ...editForm, [key]: e.target.value })}
                />
              </div>
            ))}

            <div className="flex gap-2 pt-2">
              <Button onClick={handleSave} className="flex-1">Simpan</Button>
              <Button variant="outline" onClick={() => setDrawerOpen(false)} className="flex-1">Batal</Button>
            </div>

            <div className="mt-8 pt-4 border-t border-destructive/30">
              <p className="text-sm font-medium text-destructive mb-1">Hapus Ibu Susu ini</p>
              <p className="text-xs text-muted-foreground mb-3">
                Semua data anak susuan terkait akan ikut terhapus.
              </p>
              <Button variant="destructive" size="sm" onClick={() => setDeleteOpen(true)}>
                Hapus Ibu Susu
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-heading">Konfirmasi Hapus</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Apakah Anda yakin ingin menghapus <strong>{selected?.nama}</strong>? Semua data susuan terkait akan ikut terhapus. Tindakan ini tidak dapat dibatalkan.
          </p>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>Batal</Button>
            <Button variant="destructive" onClick={handleDelete}>Ya, Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
