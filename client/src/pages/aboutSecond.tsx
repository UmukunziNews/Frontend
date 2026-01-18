import { motion, useScroll, useTransform } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
    Newspaper,
    Target,
    Award,
    Globe,
    Heart,
    Zap,
    Users,
    TrendingUp,
    Shield,
    Sparkles,
    Eye,
    CheckCircle2
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Floating particles component for background effect
const FloatingParticles = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-accent-yellow/30 rounded-full"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                    }}
                    animate={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                    }}
                    transition={{
                        duration: Math.random() * 20 + 10,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                />
            ))}
        </div>
    );
};

// Animated counter component
const AnimatedCounter = ({ end, duration = 2 }: { end: number; duration?: number }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let startTime: number | null = null;
                    const animate = (currentTime: number) => {
                        if (!startTime) startTime = currentTime;
                        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
                        setCount(Math.floor(progress * end));
                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [end, duration, hasAnimated]);

    return <span ref={ref}>{count}</span>;
};

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
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

    const values = [
        {
            icon: Target,
            title: "Accuracy First",
            description: "Every story is thoroughly verified and fact-checked before publication to ensure our readers receive only reliable, trustworthy information."
        },
        {
            icon: Globe,
            title: "Global Coverage",
            description: "Our worldwide network of experienced journalists brings you comprehensive coverage from every corner of the globe, 24/7."
        },
        {
            icon: Heart,
            title: "Ethical Integrity",
            description: "We uphold the highest journalistic standards, maintaining independence and transparency in all our reporting."
        },
        {
            icon: Zap,
            title: "Breaking Speed",
            description: "Lightning-fast news delivery ensures you're always first to know about important events as they unfold worldwide."
        },
    ];

    const stats = [
        { number: 10, suffix: "M+", label: "Monthly Readers", icon: Users },
        { number: 500, suffix: "+", label: "Expert Journalists", icon: Newspaper },
        { number: 50, suffix: "+", label: "Countries Covered", icon: Globe },
        { number: 24, suffix: "/7", label: "News Coverage", icon: TrendingUp },
    ];

    const achievements = [
        { icon: Award, text: "5x Pulitzer Prize Winner" },
        { icon: Shield, text: "Trusted by Millions Worldwide" },
        { icon: Sparkles, text: "Digital Innovation Leader 2024" },
        { icon: Eye, text: "Most Transparent News Source" },
    ];

    const team = [
        { name: "Sarah Johnson", role: "Editor-in-Chief", initial: "SJ" },
        { name: "Michael Chen", role: "Head of Investigations", initial: "MC" },
        { name: "Emily Rodriguez", role: "Technology Editor", initial: "ER" },
        { name: "David Kim", role: "International Correspondent", initial: "DK" },
    ];

    return (
        <div className="min-h-screen overflow-hidden" ref={containerRef}>
            {/* Hero Section with Parallax */}
            <motion.section
                style={{ opacity, scale }}
                className="relative bg-gradient-to-br from-accent-blue via-accent-blue/90 to-accent-blue/80 py-32 overflow-hidden"
            >
                <FloatingParticles />

                {/* Animated gradient orbs */}
                <motion.div
                    className="absolute top-20 left-20 w-96 h-96 bg-accent-yellow/30 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                />
                <motion.div
                    className="absolute bottom-20 right-20 w-96 h-96 bg-accent-yellow/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                />

                <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="inline-block mb-6"
                        >
                            <div className="p-4 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
                                <Newspaper className="h-16 w-16 text-accent-yellow" />
                            </div>
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                            About <span className="text-accent-yellow">Umukunzi News</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                            Empowering the world with accurate, unbiased journalism since 2003.
                            Your trusted source for news that matters.
                        </p>
                    </motion.div>
                </div>
            </motion.section>

            {/* Animated Stats Section */}
            <section className="py-20 bg-background relative">
                <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                <div className="max-w-7xl mx-auto px-4 relative z-10">
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
                                className="relative group"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="text-center p-6 rounded-2xl bg-gradient-to-br from-accent-blue/10 to-accent-yellow/10 border border-accent-blue/20 backdrop-blur-sm"
                                >
                                    <stat.icon className="h-8 w-8 text-accent-blue mx-auto mb-4" />
                                    <motion.div
                                        className="text-4xl md:text-5xl font-bold text-accent-blue mb-2"
                                    >
                                        <AnimatedCounter end={stat.number} />
                                        {stat.suffix}
                                    </motion.div>
                                    <div className="text-muted-foreground font-medium">{stat.label}</div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Newsroom Image Section */}
            <section className="py-20 bg-muted/30 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Our <span className="text-accent-blue">Newsroom</span>
                        </h2>
                        <div className="w-24 h-1.5 bg-accent-blue mx-auto rounded-full" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <img
                            src="/Users/devfabien/.gemini/antigravity/brain/4e846a28-1151-4656-be8e-269db7fa40bc/newsroom_workspace_1768738231188.png"
                            alt="Modern Umukunzi News newsroom with journalists at work"
                            className="w-full h-auto"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    </motion.div>
                </div>
            </section>

            {/* Our Story Section with Glassmorphism */}
            <section className="py-20 bg-background relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Our <span className="text-accent-blue">Story</span>
                        </h2>
                        <div className="w-24 h-1.5 bg-accent-blue mx-auto rounded-full" />
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Founded in 2003, <span className="font-semibold text-foreground">Umukunzi News</span> began as a small digital publication with a bold vision:
                                to provide readers with news they can trust in an increasingly complex world. What started with five passionate
                                journalists has evolved into a global news powerhouse.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Today, we operate bureaus in over 30 countries, employing hundreds of dedicated
                                professionals who work tirelessly around the clock to bring you the stories that shape our world.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Our unwavering commitment to journalistic integrity, combined with cutting-edge digital innovation,
                                has established us as one of the most trusted and respected news sources globally.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-4"
                        >
                            {achievements.map((achievement, index) => (
                                <motion.div
                                    key={achievement.text}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.02, x: 10 }}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-card backdrop-blur-lg border border-card-border shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="p-3 bg-accent-blue rounded-lg">
                                        <achievement.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <span className="font-semibold text-foreground">{achievement.text}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Global Network Image Section */}
            <section className="py-20 bg-muted/30">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="text-accent-blue">Global</span> Network
                        </h2>
                        <div className="w-24 h-1.5 bg-accent-blue mx-auto rounded-full mb-6" />
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Connected across continents, our network of correspondents brings you news from every corner of the world.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <img
                            src="/Users/devfabien/.gemini/antigravity/brain/4e846a28-1151-4656-be8e-269db7fa40bc/global_network_1768738251313.png"
                            alt="Global news network visualization showing worldwide coverage"
                            className="w-full h-auto"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Values Section with Hover Effects */}
            <section className="py-20 bg-background">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Our Core <span className="text-accent-blue">Values</span>
                        </h2>
                        <div className="w-24 h-1.5 bg-accent-blue mx-auto rounded-full" />
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
                                <motion.div
                                    whileHover={{ y: -10, scale: 1.02 }}
                                    className="h-full"
                                >
                                    <Card className="p-6 h-full relative overflow-hidden group border-2 border-transparent hover:border-accent-blue/50 transition-all duration-300">
                                        {/* Gradient background on hover */}
                                        <div className="absolute inset-0 bg-accent-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        <motion.div
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            className="w-16 h-16 bg-accent-blue rounded-xl flex items-center justify-center mb-4 shadow-lg relative z-10"
                                        >
                                            <value.icon className="h-8 w-8 text-white" />
                                        </motion.div>
                                        <h3 className="font-bold text-xl mb-3 relative z-10">{value.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed relative z-10">{value.description}</p>
                                    </Card>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Team Collaboration Image Section */}
            <section className="py-20 bg-muted/30">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Our <span className="text-accent-blue">Team</span>
                        </h2>
                        <div className="w-24 h-1.5 bg-accent-blue mx-auto rounded-full mb-6" />
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Dedicated professionals working together to deliver the news that matters most to you.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative rounded-2xl overflow-hidden shadow-2xl mb-16"
                    >
                        <img
                            src="/Users/devfabien/.gemini/antigravity/brain/4e846a28-1151-4656-be8e-269db7fa40bc/journalism_team_1768738269580.png"
                            alt="Umukunzi News journalism team collaborating on stories"
                            className="w-full h-auto"
                        />
                    </motion.div>

                    {/* Leadership Team Cards */}
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
                                <motion.div
                                    whileHover={{ y: -10 }}
                                    className="text-center"
                                >
                                    <Card className="p-6 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-accent-blue/30">
                                        <motion.div
                                            whileHover={{ scale: 1.1, rotate: 360 }}
                                            transition={{ duration: 0.6 }}
                                            className="w-28 h-28 bg-gradient-to-br from-accent-blue to-accent-blue/70 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl"
                                        >
                                            <span className="text-3xl font-bold text-white">{member.initial}</span>
                                        </motion.div>
                                        <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                                        <p className="text-muted-foreground text-sm">{member.role}</p>
                                    </Card>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-accent-blue to-accent-blue/80 relative overflow-hidden">
                <motion.div
                    className="absolute inset-0 opacity-20"
                    animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                    style={{
                        backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.4\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
                    }}
                />

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <CheckCircle2 className="h-20 w-20 text-accent-yellow mx-auto mb-6" />
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Join Our Community
                        </h2>
                        <p className="text-xl text-white/90 mb-8 leading-relaxed">
                            Stay informed with breaking news, in-depth analysis, and exclusive stories.
                            Become part of a community that values truth, transparency, and quality journalism.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-accent-yellow text-gray-900 font-bold rounded-full text-lg shadow-2xl hover:shadow-accent-yellow/50 transition-all duration-300"
                        >
                            Subscribe Now
                        </motion.button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
