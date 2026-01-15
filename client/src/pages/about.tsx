import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Users, Target, Award, Globe, Heart, Zap } from "lucide-react";
import { Languages } from "@/components/Languages";

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

export default function AboutPage() {
  const values = [
    { icon: Target, title: "Accuracy", description: "We verify every story before publishing to ensure our readers get reliable information." },
    { icon: Globe, title: "Global Reach", description: "Our network of journalists covers stories from every corner of the world." },
    { icon: Heart, title: "Integrity", description: "We maintain the highest ethical standards in all our reporting." },
    { icon: Zap, title: "Speed", description: "Breaking news delivered to you the moment it happens." },
  ];

  const stats = [
    { number: "10M+", label: "Monthly Readers" },
    { number: "500+", label: "Journalists Worldwide" },
    { number: "50+", label: "Countries Covered" },
    { number: "24/7", label: "News Coverage" },
  ];

  const team = [
    { name: "Sarah Johnson", role: "Editor-in-Chief", initial: "SJ" },
    { name: "Michael Chen", role: "Head of Investigations", initial: "MC" },
    { name: "Emily Rodriguez", role: "Technology Editor", initial: "ER" },
    { name: "David Kim", role: "International Correspondent", initial: "DK" },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-accent-blue via-accent-blue/90 to-accent-blue/80 py-24 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          initial={{ backgroundPosition: "0% 0%" }}
          animate={{ backgroundPosition: "100% 100%" }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              About <span className="text-accent-yellow">Umukunzi News</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              For over two decades, we've been committed to delivering accurate, unbiased news
              that empowers our readers to understand and engage with the world around them.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
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
                <motion.span
                  className="text-4xl md:text-5xl font-bold text-accent-blue block mb-2"
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                >
                  {stat.number}
                </motion.span>
                <span className="text-muted-foreground">{stat.label}</span>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Story</h2>
            <div className="w-24 h-1 bg-accent-blue mx-auto rounded-full" />
          </motion.div>
          <Languages />

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-lg text-muted-foreground mb-6">
                Founded in 2003, Umukunzi News began as a small digital publication with a simple mission:
                to provide readers with news they can trust. What started with a team of five passionate
                journalists has grown into a global news organization.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Today, we operate bureaus in over 30 countries, employing hundreds of dedicated
                professionals who work around the clock to bring you the stories that matter most.
              </p>
              <p className="text-lg text-muted-foreground">
                Our commitment to journalistic integrity, combined with our embrace of digital innovation,
                has made us one of the most trusted news sources in the world.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-accent-blue/20 to-accent-yellow/20 rounded-lg p-8 border border-border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-accent-blue rounded-lg">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Award-Winning Journalism</h3>
                    <p className="text-muted-foreground">Recognized globally for excellence</p>
                  </div>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent-blue rounded-full" />
                    5x Pulitzer Prize Winner
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent-blue rounded-full" />
                    Digital News Innovation Award 2023
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent-blue rounded-full" />
                    Best Breaking News Coverage 2024
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <div className="w-24 h-1 bg-accent-blue mx-auto rounded-full" />
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
              >
                <Card className="p-6 h-full hover-elevate transition-all duration-300">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-14 h-14 bg-accent-blue/10 rounded-lg flex items-center justify-center mb-4"
                  >
                    <value.icon className="h-7 w-7 text-accent-blue" />
                  </motion.div>
                  <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </Card>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Leadership Team</h2>
            <div className="w-24 h-1 bg-accent-blue mx-auto rounded-full" />
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                variants={fadeInUp}
              >
                <Card className="p-6 text-center hover-elevate transition-all duration-300">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-24 h-24 bg-gradient-to-br from-accent-blue to-accent-blue/70 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <span className="text-2xl font-bold text-white">{member.initial}</span>
                  </motion.div>
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-muted-foreground text-sm">{member.role}</p>
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
            <Users className="h-16 w-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join Our Community
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Stay informed with the latest news and become part of a community
              that values truth and transparency.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
