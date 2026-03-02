import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Baby, Heart, Copy } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { chartData, mockSusuan } from "@/data/adminMockData";

const stats = [
  { label: "Total Ibu Susu", value: 142, icon: Users, color: "text-foreground" },
  { label: "Total Anak", value: 389, icon: Baby, color: "text-foreground" },
  { label: "Total Susuan", value: 412, icon: Heart, color: "text-foreground" },
  { label: "Duplikat Belum Diproses", value: 7, icon: Copy, warn: true },
];

const recentEntries = mockSusuan.slice(0, 10);

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-72 rounded-xl" />
        <Skeleton className="h-80 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${s.warn ? "bg-warning/20" : "bg-primary/15"}`}>
                <s.icon className={`w-5 h-5 ${s.warn ? "text-warning-foreground" : "text-primary-foreground"}`} style={{ color: s.warn ? "hsl(41 60% 40%)" : undefined }} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className={`text-2xl font-heading font-bold ${s.warn ? "" : ""}`} style={s.warn ? { color: "hsl(41 60% 40%)" } : undefined}>
                  {s.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Data Masuk per Bulan</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(30 25% 88%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(0 7% 40%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(0 7% 40%)" />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(30 25% 88%)", fontSize: 13 }} />
              <Bar dataKey="jumlah" fill="hsl(355 52% 81%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">10 Entri Terbaru</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Anak</TableHead>
                <TableHead>Ibu Susu</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Tanggal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentEntries.map((e, i) => (
                <TableRow key={e.id} className={i % 2 === 0 ? "" : "bg-muted/30"}>
                  <TableCell className="font-medium">{e.namaAnak}</TableCell>
                  <TableCell>{e.ibuSusu}</TableCell>
                  <TableCell>
                    <span className={
                      e.status === "verified" ? "mamasi-badge-verified" :
                      e.status === "unverified" ? "mamasi-badge-unverified" :
                      "mamasi-badge-rejected"
                    }>
                      {e.status === "verified" ? "✅ Verified" : e.status === "unverified" ? "⚠️ Unverified" : "❌ Ditolak"}
                    </span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground text-xs">{e.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Verified", count: 12, cls: "mamasi-badge-verified" },
          { label: "Unverified", count: 5, cls: "mamasi-badge-unverified" },
          { label: "Ditolak", count: 3, cls: "mamasi-badge-rejected" },
        ].map((b) => (
          <Card key={b.label} className="shadow-sm">
            <CardContent className="p-5 flex items-center justify-between">
              <span className={b.cls}>{b.label}</span>
              <span className="text-xl font-heading font-bold">{b.count}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
