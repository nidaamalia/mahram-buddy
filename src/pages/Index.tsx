import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Search, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: BookOpen,
    title: "Catat",
    description: "Input data ibu susu dan anak yang disusui dengan mudah.",
  },
  {
    icon: Search,
    title: "Hubungkan",
    description: "Temukan siapa saja yang menjadi mahram dari hubungan susuan.",
  },
  {
    icon: Heart,
    title: "Jaga",
    description: "Simpan dan bagikan catatan untuk generasi berikutnya.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" as const },
  }),
};

const Index = () => {
  return (
    <>
      {/* Hero */}
      <section className="mamasi-section relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-secondary/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="mamasi-container relative text-center max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading font-extrabold text-5xl sm:text-6xl lg:text-7xl tracking-tight text-foreground leading-tight"
          >
            Mamasi
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-4 font-heading font-semibold text-xl sm:text-2xl text-foreground/80"
          >
            Catat. Hubungkan. Jaga.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto"
          >
            Bantu keluarga mencatat hubungan mahram sepersusuan agar generasi berikutnya terlindungi.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold text-base px-8 rounded-xl shadow-md">
              <Link to="/catat">Catat Susuan</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-heading font-semibold text-base px-8 rounded-xl border-border hover:bg-muted">
              <Link to="/cek">Cek Mahram</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="mamasi-section bg-muted/40">
        <div className="mamasi-container">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-center text-foreground mb-12">
            Bagaimana Cara Kerjanya?
          </h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                className="mamasi-card text-center flex flex-col items-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-primary" strokeWidth={2} />
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mamasi-section">
        <div className="mamasi-container text-center">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-4">
            Mulai Sekarang
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Tidak perlu daftar akun. Cukup isi data dan catatan mahram sepersusuan langsung tersimpan.
          </p>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold rounded-xl px-8 shadow-md">
            <Link to="/catat">Catat Susuan Sekarang</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Index;
