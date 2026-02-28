import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const mahramGroups = [
  {
    title: "1. Ibu Susu dan Seterusnya ke Atas",
    desc: "Ibu susu, nenek susu (ibu dari ibu susu), dan seterusnya ke atas.",
  },
  {
    title: "2. Anak Perempuan Susu dan Seterusnya ke Bawah",
    desc: "Anak perempuan yang disusui, cucu perempuan dari anak susuan, dan seterusnya.",
  },
  {
    title: "3. Saudara Perempuan Sesusuan",
    desc: "Anak-anak lain yang disusui oleh ibu susu yang sama.",
  },
  {
    title: "4. Bibi Sesusuan (Saudara Ibu Susu)",
    desc: "Saudara perempuan dari ibu susu.",
  },
  {
    title: "5. Bibi Sesusuan (Saudara Ayah Susu)",
    desc: "Saudara perempuan dari suami ibu susu (ayah susu).",
  },
  {
    title: "6. Anak Perempuan dari Saudara Laki-laki Sesusuan",
    desc: "Keponakan perempuan dari saudara laki-laki sesusuan.",
  },
  {
    title: "7. Anak Perempuan dari Saudara Perempuan Sesusuan",
    desc: "Keponakan perempuan dari saudara perempuan sesusuan.",
  },
  {
    title: "8. Mertua dan Menantu Sesusuan",
    desc: "Ibu susu dari istri, istri dari anak susuan, dll.",
  },
];

const faqs = [
  {
    q: "Apakah Mamasi resmi dari MUI?",
    a: "Tidak. Mamasi adalah alat bantu pencatatan independen. Untuk keputusan hukum, konsultasikan dengan ulama.",
  },
  {
    q: "Berapa minimal susuan agar menjadi mahram?",
    a: "Menurut Fatwa MUI No. 28/2013, minimal 5 kali susuan yang mengenyangkan dalam usia 2 tahun.",
  },
  {
    q: "Apakah data saya aman?",
    a: "Data tersimpan di database yang aman. NIK tidak pernah ditampilkan di halaman publik.",
  },
  {
    q: "Siapa yang bisa melihat data anak saya?",
    a: "Hanya orang yang memiliki link halaman anak. Link tidak bisa ditebak karena menggunakan ID unik.",
  },
];

export default function Info() {
  return (
    <section className="mamasi-section">
      <div className="mamasi-container max-w-3xl">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-2">
          Tentang Mahram Sepersusuan
        </h1>
        <p className="text-muted-foreground mb-8">
          Pemahaman dasar tentang hubungan mahram yang timbul dari penyusuan menurut syariat Islam.
        </p>

        {/* Pengertian */}
        <div className="mamasi-card mb-8">
          <h2 className="font-heading font-semibold text-lg text-foreground mb-3">Apa itu Mahram Sepersusuan?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Mahram sepersusuan adalah hubungan kekerabatan yang timbul karena penyusuan. Dalam Islam,
            hubungan ini menjadikan orang-orang tertentu haram untuk dinikahi, sama seperti hubungan
            darah (nasab). Ketentuan ini didasarkan pada Al-Quran, Hadits, dan diperjelas dalam
            Fatwa MUI No. 28 Tahun 2013.
          </p>
        </div>

        {/* 5 Syarat */}
        <div className="mamasi-card mb-8">
          <h2 className="font-heading font-semibold text-lg text-foreground mb-4">
            5 Syarat Mahram Susuan (Fatwa MUI No. 28/2013)
          </h2>
          <ol className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="shrink-0 w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center font-heading font-bold text-foreground text-xs">1</span>
              <div><strong className="text-foreground">Usia anak ≤ 2 tahun</strong> saat disusui (belum disapih).</div>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center font-heading font-bold text-foreground text-xs">2</span>
              <div><strong className="text-foreground">Minimal 5 kali susuan</strong> yang terpisah (bukan sekali dua kali).</div>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center font-heading font-bold text-foreground text-xs">3</span>
              <div><strong className="text-foreground">Identitas ibu susu jelas</strong> dan diketahui siapa orangnya.</div>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center font-heading font-bold text-foreground text-xs">4</span>
              <div><strong className="text-foreground">Cara penyusuan</strong> — langsung dari payudara atau melalui perahan.</div>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center font-heading font-bold text-foreground text-xs">5</span>
              <div><strong className="text-foreground">ASI mengenyangkan</strong> — setiap kali susuan harus sampai anak kenyang.</div>
            </li>
          </ol>
        </div>

        {/* 8 Kelompok Mahram */}
        <div className="mb-8">
          <h2 className="font-heading font-semibold text-lg text-foreground mb-4">
            8 Kelompok Mahram Sesusuan
          </h2>
          <Accordion type="single" collapsible className="space-y-2">
            {mahramGroups.map((group, idx) => (
              <AccordionItem key={idx} value={`group-${idx}`} className="mamasi-card border px-0 overflow-hidden">
                <AccordionTrigger className="px-5 py-3 text-sm font-medium text-foreground hover:no-underline">
                  {group.title}
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-4 text-sm text-muted-foreground">
                  {group.desc}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* FAQ */}
        <div className="mb-8">
          <h2 className="font-heading font-semibold text-lg text-foreground mb-4">FAQ</h2>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`} className="mamasi-card border px-0 overflow-hidden">
                <AccordionTrigger className="px-5 py-3 text-sm font-medium text-foreground hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-4 text-sm text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Disclaimer */}
        <div className="mamasi-card bg-muted/50 text-center">
          <p className="text-sm text-muted-foreground">
            Mamasi adalah alat bantu pencatatan. Untuk keputusan hukum, konsultasikan dengan ulama atau ahli fiqh.
          </p>
          <a
            href="https://mui.or.id"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline mt-2 inline-block"
          >
            Download Fatwa MUI No. 28/2013 →
          </a>
        </div>
      </div>
    </section>
  );
}
