import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ContactModal } from "@/components/ContactModal";
import { useState } from "react";
import { Monitor, Smartphone, Megaphone, ArrowRight } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function AdvertisePage() {
  const [contactOpen, setContactOpen] = useState(false);
  const adFormats = [
    {
      icon: Monitor,
      title: "Display Advertising",
      description: "Premium banner placements across our desktop experience",
      sizes: ["300x250", "728x90", "300x600", "970x250"],
    },
    {
      icon: Smartphone,
      title: "Mobile Advertising",
      description: "Reach users on-the-go with mobile-optimized formats",
      sizes: ["320x50", "300x250", "320x480", "Interstitial"],
    },
    {
      icon: Megaphone,
      title: "Native Content",
      description: "Sponsored articles that blend with editorial content",
      sizes: ["Custom", "Editorial Style", "Branded Content"],
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative bg-accent-blue py-24 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
        ></motion.div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              Advertising Solutions
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Reach Millions of <br />
              <span className="text-accent-orange">Engaged Readers</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Connect with our premium audience through targeted advertising
              solutions that deliver real results for your brand.
            </p>
            <Button
              size="lg"
              className="bg-white text-accent-blue gap-2"
              onClick={() => setContactOpen(true)}
              data-testid="button-advertise-contact"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ad Formats</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from a variety of high-impact advertising formats designed
              to maximize engagement and drive results.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {adFormats.map((format) => (
              <motion.div key={format.title} variants={fadeInUp}>
                <Card className="p-6 h-full hover-elevate transition-all duration-300">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-14 h-14 bg-accent-blue rounded-lg flex items-center justify-center mb-4"
                  >
                    <format.icon className="h-7 w-7 text-white" />
                  </motion.div>
                  <h3 className="font-bold text-xl mb-2">{format.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {format.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {format.sizes.map((size) => (
                      <Badge key={size} variant="secondary" className="text-xs">
                        {size}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-r from-accent-blue to-accent-blue/80">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Megaphone className="h-16 w-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Grow Your Brand?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Let's discuss how Umukunzi News can help you reach your marketing goals.
            </p>
            <Button
              size="lg"
              className="bg-white text-accent-blue gap-2"
              onClick={() => setContactOpen(true)}
              data-testid="button-advertise-cta"
            >
              Contact Our Sales Team <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
}
