import { motion } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ContactModal } from "@/components/ContactModal";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Heart, 
  Coffee, 
  Plane, 
  GraduationCap,
  DollarSign,
  Users,
  ArrowRight,
  Building,
  ChevronDown,
  ChevronUp
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

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

export default function CareersPage() {
  const [contactOpen, setContactOpen] = useState(false);
  const [expandedJob, setExpandedJob] = useState<number | null>(null);

  const benefits = [
    { icon: Heart, title: "Health & Wellness", description: "Comprehensive medical, dental, and vision insurance" },
    { icon: Coffee, title: "Work-Life Balance", description: "Flexible hours and remote work options" },
    { icon: Plane, title: "Paid Time Off", description: "Generous vacation policy plus paid holidays" },
    { icon: GraduationCap, title: "Learning & Development", description: "Professional development budget and courses" },
    { icon: DollarSign, title: "Competitive Pay", description: "Industry-leading salaries and equity options" },
    { icon: Users, title: "Great Culture", description: "Collaborative, inclusive, and innovative environment" },
  ];

  const jobs: Job[] = [
    {
      id: 1,
      title: "Senior Investigative Journalist",
      department: "Editorial",
      location: "New York, NY",
      type: "Full-time",
      description: "Join our award-winning investigations team to uncover stories that matter. You'll work on long-form pieces that drive public discourse and hold power accountable.",
      requirements: [
        "7+ years of journalism experience",
        "Track record of investigative reporting",
        "Excellent writing and research skills",
        "Ability to work independently on complex stories",
      ],
    },
    {
      id: 2,
      title: "Frontend Engineer",
      department: "Technology",
      location: "Remote",
      type: "Full-time",
      description: "Help us build the future of digital journalism. You'll work on our reader-facing products, creating fast, accessible, and beautiful user experiences.",
      requirements: [
        "4+ years of frontend development experience",
        "Proficiency in React, TypeScript, and modern CSS",
        "Experience with performance optimization",
        "Passion for great user experiences",
      ],
    },
    {
      id: 3,
      title: "Video Producer",
      department: "Multimedia",
      location: "Los Angeles, CA",
      type: "Full-time",
      description: "Create compelling video content that brings stories to life. From breaking news to documentaries, you'll shape how millions of viewers experience our journalism.",
      requirements: [
        "3+ years of video production experience",
        "Proficiency in Adobe Premiere Pro and After Effects",
        "Strong storytelling abilities",
        "Experience with live broadcasts a plus",
      ],
    },
    {
      id: 4,
      title: "Data Analyst",
      department: "Business",
      location: "New York, NY",
      type: "Full-time",
      description: "Drive data-informed decisions across the organization. You'll analyze reader engagement, subscription metrics, and help optimize our digital products.",
      requirements: [
        "3+ years of data analysis experience",
        "Proficiency in SQL and Python",
        "Experience with visualization tools",
        "Strong communication skills",
      ],
    },
    {
      id: 5,
      title: "Social Media Manager",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      description: "Lead our social media presence across platforms. You'll craft engaging content, grow our audience, and represent NewsHub in the digital conversation.",
      requirements: [
        "3+ years of social media management",
        "Experience growing engaged communities",
        "Strong copywriting skills",
        "News industry experience preferred",
      ],
    },
  ];

  const departments = ["All", ...new Set(jobs.map(j => j.department))];
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const filteredJobs = selectedDepartment === "All" 
    ? jobs 
    : jobs.filter(j => j.department === selectedDepartment);

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-accent-blue via-accent-blue/90 to-accent-blue/80 py-24 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          style={{
            backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 50%)",
            backgroundSize: "100% 100%",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              We're Hiring
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Shape the Future of <br />
              <span className="text-accent-yellow">Journalism</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Join a team of passionate storytellers, innovators, and truth-seekers. 
              Together, we inform millions of readers around the world.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-4 flex-wrap"
            >
              <div className="flex items-center gap-2 text-white/80">
                <Building className="h-5 w-5" />
                <span>30+ Global Offices</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Users className="h-5 w-5" />
                <span>500+ Team Members</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Heart className="h-5 w-5" />
                <span>Great Benefits</span>
              </div>
            </motion.div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why NewsHub?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer competitive compensation and benefits designed to support 
              your well-being and professional growth.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                variants={fadeInUp}
              >
                <Card className="p-6 h-full hover-elevate transition-all duration-300">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-14 h-14 bg-accent-blue/10 rounded-lg flex items-center justify-center mb-4"
                  >
                    <benefit.icon className="h-7 w-7 text-accent-blue" />
                  </motion.div>
                  <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
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
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Open Positions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Find your next opportunity and become part of our story.
            </p>
            
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {departments.map((dept) => (
                <Button
                  key={dept}
                  variant={selectedDepartment === dept ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDepartment(dept)}
                  data-testid={`button-filter-${dept.toLowerCase()}`}
                >
                  {dept}
                </Button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-4"
          >
            {filteredJobs.map((job) => (
              <motion.div key={job.id} variants={fadeInUp}>
                <Card className="overflow-hidden">
                  <div 
                    className="p-6 cursor-pointer hover-elevate"
                    onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                    data-testid={`card-job-${job.id}`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-lg">{job.title}</h3>
                          <Badge variant="secondary">{job.department}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {job.type}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        {expandedJob === job.id ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedJob === job.id ? "auto" : 0,
                      opacity: expandedJob === job.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 border-t pt-4">
                      <p className="text-muted-foreground mb-4">{job.description}</p>
                      <h4 className="font-semibold mb-2">Requirements:</h4>
                      <ul className="space-y-2 mb-6">
                        {job.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 bg-accent-blue rounded-full flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className="gap-2"
                        onClick={() => setContactOpen(true)}
                        data-testid={`button-apply-${job.id}`}
                      >
                        Apply Now <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Culture
              </h2>
              <p className="text-muted-foreground mb-6">
                At NewsHub, we believe great journalism comes from great teams. We foster an 
                environment where diverse perspectives are valued, innovation is encouraged, 
                and everyone has the opportunity to make an impact.
              </p>
              <p className="text-muted-foreground mb-6">
                Whether you're in our newsroom in New York, working remotely from across the 
                globe, or stationed in one of our international bureaus, you'll be part of a 
                community committed to excellence and truth.
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <Badge className="bg-accent-blue/10 text-accent-blue border-accent-blue/20">
                  Diverse & Inclusive
                </Badge>
                <Badge className="bg-accent-blue/10 text-accent-blue border-accent-blue/20">
                  Innovation-Driven
                </Badge>
                <Badge className="bg-accent-blue/10 text-accent-blue border-accent-blue/20">
                  Collaborative
                </Badge>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { number: "4.8/5", label: "Employee Rating" },
                { number: "92%", label: "Would Recommend" },
                { number: "85%", label: "Work-Life Balance" },
                { number: "3.2 yrs", label: "Avg. Tenure" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 text-center">
                    <span className="text-2xl font-bold text-accent-blue block mb-1">
                      {stat.number}
                    </span>
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                  </Card>
                </motion.div>
              ))}
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
            <Briefcase className="h-16 w-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Don't See the Right Role?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              We're always looking for talented individuals. Send us your resume 
              and we'll keep you in mind for future opportunities.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-accent-blue gap-2"
              onClick={() => setContactOpen(true)}
              data-testid="button-careers-general"
            >
              Get in Touch <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
}
