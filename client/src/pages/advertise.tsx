import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ContactModal } from "@/components/ContactModal";
import { useState } from "react";
import { 
  BarChart3, 
  Users, 
  Globe, 
  Zap, 
  TrendingUp, 
  Target,
  Monitor,
  Smartphone,
  Megaphone,
  Check,
  ArrowRight
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function AdvertisePage() {
  const [contactOpen, setContactOpen] = useState(false);

  const stats = [
    { icon: Users, value: "10M+", label: "Monthly Unique Visitors" },
    { icon: Globe, value: "180+", label: "Countries Reached" },
    { icon: TrendingUp, value: "85%", label: "Engagement Rate" },
    { icon: Zap, value: "2.5M", label: "Daily Page Views" },
  ];

  const adFormats = [
    { 
      icon: Monitor, 
      title: "Display Advertising", 
      description: "Premium banner placements across our desktop experience",
      sizes: ["300x250", "728x90", "300x600", "970x250"]
    },
    { 
      icon: Smartphone, 
      title: "Mobile Advertising", 
      description: "Reach users on-the-go with mobile-optimized formats",
      sizes: ["320x50", "300x250", "320x480", "Interstitial"]
    },
    { 
      icon: Megaphone, 
      title: "Native Content", 
      description: "Sponsored articles that blend with editorial content",
      sizes: ["Custom", "Editorial Style", "Branded Content"]
    },
  ];

  const packages = [
    {
      name: "Starter",
      price: "$2,500",
      period: "/month",
      description: "Perfect for small businesses and local campaigns",
      features: [
        "100,000 impressions",
        "Standard banner placements",
        "Monthly performance report",
        "Email support",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "$7,500",
      period: "/month",
      description: "Ideal for growing brands seeking wider reach",
      features: [
        "500,000 impressions",
        "Premium placements",
        "Weekly performance reports",
        "Dedicated account manager",
        "A/B testing support",
        "Custom targeting options",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Tailored solutions for large-scale campaigns",
      features: [
        "Unlimited impressions",
        "All premium placements",
        "Real-time analytics dashboard",
        "Priority support",
        "Branded content creation",
        "Multi-platform campaigns",
        "Custom integrations",
      ],
      popular: false,
    },
  ];

  const audience = [
    { label: "Age 25-34", percentage: 35 },
    { label: "Age 35-44", percentage: 28 },
    { label: "Age 45-54", percentage: 22 },
    { label: "Other", percentage: 15 },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-accent-blue via-accent-blue/90 to-accent-yellow/30 py-24 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-yellow rounded-full blur-3xl" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              Advertising Solutions
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Reach Millions of <br />
              <span className="text-accent-yellow">Engaged Readers</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Connect with our premium audience through targeted advertising solutions 
              that deliver real results for your brand.
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

      <section className="py-16 bg-background border-b">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-accent-blue/10 rounded-xl flex items-center justify-center mx-auto mb-4"
                >
                  <stat.icon className="h-8 w-8 text-accent-blue" />
                </motion.div>
                <motion.span
                  className="text-3xl md:text-4xl font-bold text-foreground block mb-1"
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                >
                  {stat.value}
                </motion.span>
                <span className="text-muted-foreground text-sm">{stat.label}</span>
              </motion.div>
            ))}
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
              Choose from a variety of high-impact advertising formats designed to 
              maximize engagement and drive results.
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
                  <p className="text-muted-foreground mb-4">{format.description}</p>
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

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Advertising Packages</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select the package that best fits your marketing goals and budget.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {packages.map((pkg, index) => (
              <motion.div 
                key={pkg.name} 
                variants={fadeInUp}
                className={pkg.popular ? "md:-mt-4" : ""}
              >
                <Card className={`p-8 h-full relative overflow-hidden ${pkg.popular ? "border-accent-blue border-2" : ""}`}>
                  {pkg.popular && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-accent-blue text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                        MOST POPULAR
                      </div>
                    </div>
                  )}
                  <h3 className="font-bold text-2xl mb-2">{pkg.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{pkg.price}</span>
                    <span className="text-muted-foreground">{pkg.period}</span>
                  </div>
                  <p className="text-muted-foreground mb-6">{pkg.description}</p>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-accent-blue flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={pkg.popular ? "default" : "outline"}
                    onClick={() => setContactOpen(true)}
                    data-testid={`button-package-${pkg.name.toLowerCase()}`}
                  >
                    {pkg.price === "Custom" ? "Contact Sales" : "Get Started"}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Know Your Audience
              </h2>
              <p className="text-muted-foreground mb-8">
                Our readers are highly educated, affluent professionals who value 
                quality journalism. With detailed demographic and behavioral data, 
                you can target your ideal customers with precision.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-accent-blue" />
                  <span className="text-sm">Precise Targeting</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-accent-blue" />
                  <span className="text-sm">Real-time Analytics</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-6">
                <h3 className="font-bold mb-6">Audience Demographics</h3>
                <div className="space-y-4">
                  {audience.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                    >
                      <div className="flex justify-between text-sm mb-1">
                        <span>{item.label}</span>
                        <span className="font-medium">{item.percentage}%</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-accent-blue rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
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
              Let's discuss how NewsHub can help you reach your marketing goals.
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
