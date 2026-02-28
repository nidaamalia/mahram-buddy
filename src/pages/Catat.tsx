import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronLeft, ChevronRight, Check, Baby, User, AlertTriangle, Copy, MessageCircle } from "lucide-react";
import { toast } from "sonner";

type Role = "ibu_susu" | "orang_tua" | null;

interface IbuSusuData {
  nik: string;
  nama: string;
  namaSuami: string;
  noHp: string;
  kota: string;
}

interface AnakData {
  nama: string;
  nik: string;
  tanggalLahir: string;
  jenis: "kandung" | "susuan";
  jumlahSusuan: string;
  tahunSusuan: string;
  caraSusuan: "langsung" | "perahan" | "tidak_tahu" | "";
  asiMengenyangkan: "ya" | "tidak" | "tidak_tahu" | "";
}

const emptyAnak: AnakData = {
  nama: "",
  nik: "",
  tanggalLahir: "",
  jenis: "susuan",
  jumlahSusuan: "",
  tahunSusuan: "",
  caraSusuan: "",
  asiMengenyangkan: "",
};

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

export default function Catat() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [role, setRole] = useState<Role>(null);
  const [ibuSusu, setIbuSusu] = useState<IbuSusuData>({ nik: "", nama: "", namaSuami: "", noHp: "", kota: "" });
  const [anakList, setAnakList] = useState<AnakData[]>([{ ...emptyAnak }]);
  const [showOptionalIbu, setShowOptionalIbu] = useState(false);
  const [showOptionalAnak, setShowOptionalAnak] = useState<boolean[]>([false]);
  const [saved, setSaved] = useState(false);

  const go = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  const canNextStep1 = role === "ibu_susu"
    ? ibuSusu.nik.trim() && ibuSusu.nama.trim()
    : ibuSusu.nama.trim();

  const canNextStep2 = anakList.every((a) => a.nama.trim());

  const updateAnak = (idx: number, field: keyof AnakData, value: string) => {
    setAnakList((prev) => prev.map((a, i) => (i === idx ? { ...a, [field]: value } : a)));
  };

  const addAnak = () => {
    setAnakList((prev) => [...prev, { ...emptyAnak }]);
    setShowOptionalAnak((prev) => [...prev, false]);
  };

  const handleSave = () => {
    // Mock save — will integrate with Supabase later
    setSaved(true);
    go(4);
    toast.success("Data berhasil dicatat!");
  };

  const getWarnings = (anak: AnakData) => {
    const warnings: string[] = [];
    if (anak.jumlahSusuan && parseInt(anak.jumlahSusuan) < 5) {
      warnings.push("Jumlah susuan kurang dari 5 kali");
    }
    if (anak.tanggalLahir && anak.tahunSusuan) {
      const birthYear = new Date(anak.tanggalLahir).getFullYear();
      const susuanYear = parseInt(anak.tahunSusuan);
      if (susuanYear - birthYear > 2) {
        warnings.push("Usia saat disusui melebihi 2 tahun");
      }
    }
    return warnings;
  };

  const mockAnakId = "mock-anak-123";

  return (
    <section className="mamasi-section">
      <div className="mamasi-container max-w-2xl">
        {/* Progress */}
        {step < 4 && (
          <div className="flex items-center gap-2 mb-8">
            {[0, 1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  s <= step ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>
        )}

        <AnimatePresence mode="wait" custom={direction}>
          {/* Step 0: Role */}
          {step === 0 && (
            <motion.div
              key="step0"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-2">
                Catat Susuan
              </h1>
              <p className="text-muted-foreground mb-8">Anda mencatat sebagai siapa?</p>

              <div className="grid sm:grid-cols-2 gap-4">
                <button
                  onClick={() => { setRole("ibu_susu"); go(1); }}
                  className={`mamasi-card flex flex-col items-center gap-3 py-8 cursor-pointer transition-all hover:shadow-md hover:border-primary/40 ${
                    role === "ibu_susu" ? "border-primary ring-2 ring-primary/20" : ""
                  }`}
                >
                  <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center">
                    <Baby className="w-7 h-7 text-primary" />
                  </div>
                  <span className="font-heading font-semibold text-foreground">Saya Ibu Susu</span>
                  <span className="text-xs text-muted-foreground">Saya menyusui anak orang lain</span>
                </button>

                <button
                  onClick={() => { setRole("orang_tua"); go(1); }}
                  className={`mamasi-card flex flex-col items-center gap-3 py-8 cursor-pointer transition-all hover:shadow-md hover:border-primary/40 ${
                    role === "orang_tua" ? "border-primary ring-2 ring-primary/20" : ""
                  }`}
                >
                  <div className="w-16 h-16 rounded-full bg-secondary/60 flex items-center justify-center">
                    <User className="w-7 h-7 text-foreground/70" />
                  </div>
                  <span className="font-heading font-semibold text-foreground">Saya Orang Tua Anak</span>
                  <span className="text-xs text-muted-foreground">Anak saya disusui orang lain</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 1: Ibu Susu */}
          {step === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-foreground mb-1">
                Data Ibu Susu
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                {role === "ibu_susu" ? "Lengkapi data Anda sebagai ibu susu." : "Siapa ibu susu yang menyusui anak Anda?"}
              </p>

              <div className="space-y-4">
                <div>
                  <Label className="font-medium">
                    Nama Ibu Susu <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    value={ibuSusu.nama}
                    onChange={(e) => setIbuSusu({ ...ibuSusu, nama: e.target.value })}
                    placeholder="Masukkan nama lengkap"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label className="font-medium">
                    NIK Ibu Susu {role === "ibu_susu" && <span className="text-destructive">*</span>}
                  </Label>
                  <Input
                    value={ibuSusu.nik}
                    onChange={(e) => setIbuSusu({ ...ibuSusu, nik: e.target.value })}
                    placeholder="16 digit NIK"
                    maxLength={16}
                    className="mt-1.5"
                  />
                  {role === "orang_tua" && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Mengisi NIK membantu memastikan data terhubung ke ibu susu yang tepat
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setShowOptionalIbu(!showOptionalIbu)}
                  className="text-sm text-primary font-medium hover:underline"
                >
                  {showOptionalIbu ? "Sembunyikan" : "Tambah info lainnya ▸"}
                </button>

                {showOptionalIbu && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="space-y-4"
                  >
                    <div>
                      <Label>Nama Suami</Label>
                      <Input
                        value={ibuSusu.namaSuami}
                        onChange={(e) => setIbuSusu({ ...ibuSusu, namaSuami: e.target.value })}
                        placeholder="Opsional"
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label>No. HP</Label>
                      <Input
                        value={ibuSusu.noHp}
                        onChange={(e) => setIbuSusu({ ...ibuSusu, noHp: e.target.value })}
                        placeholder="Opsional"
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label>Kota</Label>
                      <Input
                        value={ibuSusu.kota}
                        onChange={(e) => setIbuSusu({ ...ibuSusu, kota: e.target.value })}
                        placeholder="Opsional"
                        className="mt-1.5"
                      />
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="ghost" onClick={() => go(0)} className="gap-1">
                  <ChevronLeft className="w-4 h-4" /> Kembali
                </Button>
                <Button
                  onClick={() => go(2)}
                  disabled={!canNextStep1}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1"
                >
                  Lanjutkan <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Anak */}
          {step === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-foreground mb-1">
                Data Anak
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Masukkan data anak yang disusui.
              </p>

              {anakList.map((anak, idx) => (
                <div key={idx} className="mamasi-card mb-4">
                  <h3 className="font-heading font-semibold text-foreground mb-4">
                    Anak {anakList.length > 1 ? `#${idx + 1}` : ""}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <Label className="font-medium">
                        Nama Anak <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        value={anak.nama}
                        onChange={(e) => updateAnak(idx, "nama", e.target.value)}
                        placeholder="Masukkan nama anak"
                        className="mt-1.5"
                      />
                    </div>

                    <div>
                      <Label className="font-medium text-sm">Jenis</Label>
                      <RadioGroup
                        value={anak.jenis}
                        onValueChange={(v) => updateAnak(idx, "jenis", v)}
                        className="flex gap-4 mt-1.5"
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="susuan" id={`jenis-susuan-${idx}`} />
                          <Label htmlFor={`jenis-susuan-${idx}`} className="text-sm cursor-pointer">Anak Susuan</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="kandung" id={`jenis-kandung-${idx}`} />
                          <Label htmlFor={`jenis-kandung-${idx}`} className="text-sm cursor-pointer">Anak Kandung</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setShowOptionalAnak((prev) => prev.map((v, i) => (i === idx ? !v : v)));
                      }}
                      className="text-sm text-primary font-medium hover:underline"
                    >
                      {showOptionalAnak[idx] ? "Sembunyikan" : "Tambah info lainnya ▸"}
                    </button>

                    {showOptionalAnak[idx] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className="space-y-4"
                      >
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <Label>NIK Anak</Label>
                            <Input
                              value={anak.nik}
                              onChange={(e) => updateAnak(idx, "nik", e.target.value)}
                              placeholder="Opsional"
                              maxLength={16}
                              className="mt-1.5"
                            />
                          </div>
                          <div>
                            <Label>Tanggal Lahir</Label>
                            <Input
                              type="date"
                              value={anak.tanggalLahir}
                              onChange={(e) => updateAnak(idx, "tanggalLahir", e.target.value)}
                              className="mt-1.5"
                            />
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <Label>Jumlah Susuan</Label>
                            <Input
                              type="number"
                              value={anak.jumlahSusuan}
                              onChange={(e) => updateAnak(idx, "jumlahSusuan", e.target.value)}
                              placeholder="Contoh: 5"
                              className="mt-1.5"
                            />
                          </div>
                          <div>
                            <Label>Tahun Disusui</Label>
                            <Input
                              type="number"
                              value={anak.tahunSusuan}
                              onChange={(e) => updateAnak(idx, "tahunSusuan", e.target.value)}
                              placeholder="Contoh: 2020"
                              className="mt-1.5"
                            />
                          </div>
                        </div>

                        <div>
                          <Label className="font-medium text-sm">Cara Susuan</Label>
                          <RadioGroup
                            value={anak.caraSusuan}
                            onValueChange={(v) => updateAnak(idx, "caraSusuan", v)}
                            className="flex flex-wrap gap-4 mt-1.5"
                          >
                            {[
                              { value: "langsung", label: "Langsung" },
                              { value: "perahan", label: "Perahan" },
                              { value: "tidak_tahu", label: "Tidak Tahu" },
                            ].map((opt) => (
                              <div key={opt.value} className="flex items-center gap-2">
                                <RadioGroupItem value={opt.value} id={`cara-${opt.value}-${idx}`} />
                                <Label htmlFor={`cara-${opt.value}-${idx}`} className="text-sm cursor-pointer">{opt.label}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>

                        <div>
                          <Label className="font-medium text-sm">ASI Mengenyangkan?</Label>
                          <RadioGroup
                            value={anak.asiMengenyangkan}
                            onValueChange={(v) => updateAnak(idx, "asiMengenyangkan", v)}
                            className="flex flex-wrap gap-4 mt-1.5"
                          >
                            {[
                              { value: "ya", label: "Ya" },
                              { value: "tidak", label: "Tidak" },
                              { value: "tidak_tahu", label: "Tidak Tahu" },
                            ].map((opt) => (
                              <div key={opt.value} className="flex items-center gap-2">
                                <RadioGroupItem value={opt.value} id={`asi-${opt.value}-${idx}`} />
                                <Label htmlFor={`asi-${opt.value}-${idx}`} className="text-sm cursor-pointer">{opt.label}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>

                        {/* Warnings */}
                        {getWarnings(anak).map((w, wi) => (
                          <div key={wi} className="flex items-start gap-2 p-3 rounded-lg bg-warning/15 text-warning-foreground">
                            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-warning" />
                            <span className="text-sm">{w}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addAnak}
                className="text-sm text-primary font-medium hover:underline"
              >
                + Tambah Anak Lagi
              </button>

              <div className="flex justify-between mt-8">
                <Button variant="ghost" onClick={() => go(1)} className="gap-1">
                  <ChevronLeft className="w-4 h-4" /> Kembali
                </Button>
                <Button
                  onClick={() => go(3)}
                  disabled={!canNextStep2}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1"
                >
                  Lanjutkan <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <motion.div
              key="step3"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-foreground mb-1">
                Ringkasan Data
              </h2>
              <p className="text-sm text-muted-foreground mb-6">Periksa data sebelum menyimpan.</p>

              <div className="mamasi-card mb-4">
                <h3 className="font-heading font-semibold text-foreground mb-3">Ibu Susu</h3>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <dt className="text-muted-foreground">Nama</dt>
                  <dd className="text-foreground">{ibuSusu.nama}</dd>
                  {ibuSusu.nik && <>
                    <dt className="text-muted-foreground">NIK</dt>
                    <dd className="text-foreground">{ibuSusu.nik}</dd>
                  </>}
                  {ibuSusu.namaSuami && <>
                    <dt className="text-muted-foreground">Suami</dt>
                    <dd className="text-foreground">{ibuSusu.namaSuami}</dd>
                  </>}
                  {ibuSusu.kota && <>
                    <dt className="text-muted-foreground">Kota</dt>
                    <dd className="text-foreground">{ibuSusu.kota}</dd>
                  </>}
                </dl>
              </div>

              {anakList.map((anak, idx) => (
                <div key={idx} className="mamasi-card mb-4">
                  <h3 className="font-heading font-semibold text-foreground mb-3">
                    Anak {anakList.length > 1 ? `#${idx + 1}` : ""}: {anak.nama}
                  </h3>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <dt className="text-muted-foreground">Jenis</dt>
                    <dd className="text-foreground capitalize">{anak.jenis}</dd>
                    {anak.tanggalLahir && <>
                      <dt className="text-muted-foreground">Tanggal Lahir</dt>
                      <dd className="text-foreground">{anak.tanggalLahir}</dd>
                    </>}
                    {anak.jumlahSusuan && <>
                      <dt className="text-muted-foreground">Jumlah Susuan</dt>
                      <dd className="text-foreground">{anak.jumlahSusuan}x</dd>
                    </>}
                    {anak.caraSusuan && <>
                      <dt className="text-muted-foreground">Cara Susuan</dt>
                      <dd className="text-foreground capitalize">{anak.caraSusuan.replace("_", " ")}</dd>
                    </>}
                  </dl>
                  {getWarnings(anak).length > 0 && (
                    <div className="mt-3 space-y-2">
                      {getWarnings(anak).map((w, wi) => (
                        <div key={wi} className="flex items-start gap-2 p-2 rounded-lg bg-warning/15 text-sm">
                          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-warning" />
                          <span>{w}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="flex justify-between mt-8">
                <Button variant="ghost" onClick={() => go(2)} className="gap-1">
                  <ChevronLeft className="w-4 h-4" /> Kembali
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1"
                >
                  <Check className="w-4 h-4" /> Simpan
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <motion.div
              key="step4"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
              className="text-center py-8"
            >
              <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-success" />
              </div>
              <h2 className="font-heading font-bold text-2xl text-foreground mb-2">
                Data Berhasil Dicatat!
              </h2>
              <div className="mamasi-badge-unverified inline-flex mb-4">
                ⚠️ Menunggu konfirmasi Ibu Susu
              </div>
              <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
                Bagikan link verifikasi ke ibu susu untuk mengkonfirmasi data.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {ibuSusu.noHp && (
                  <Button
                    onClick={() => {
                      const url = `${window.location.origin}/verif/mock-token`;
                      const text = `Assalamu'alaikum, mohon konfirmasi data susuan di Mamasi: ${url}`;
                      window.open(`https://wa.me/${ibuSusu.noHp.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`, "_blank");
                    }}
                    className="bg-success text-success-foreground hover:bg-success/90 gap-2"
                  >
                    <MessageCircle className="w-4 h-4" /> Minta Konfirmasi via WhatsApp
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/verif/mock-token`);
                    toast.success("Link disalin!");
                  }}
                  className="gap-2"
                >
                  <Copy className="w-4 h-4" /> Salin Link Verifikasi
                </Button>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <a href={`/anak/${mockAnakId}`}>
                    Lihat & Bagikan Mahram {anakList[0]?.nama}
                  </a>
                </Button>
                <Button variant="ghost" onClick={() => { setStep(1); setAnakList([{ ...emptyAnak }]); setShowOptionalAnak([false]); setSaved(false); }}>
                  Tambah Ibu Susu Lain
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
