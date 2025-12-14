import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { categories } from "@shared/schema";
import { SiFacebook, SiX, SiInstagram, SiYoutube, SiLinkedin } from "react-icons/si";
import { ArrowUp } from "lucide-react";
import { ContactModal } from "@/components/ContactModal";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });
    setEmail("");
    setIsSubscribing(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socialLinks = [
    { icon: SiFacebook, href: "https://facebook.com", label: "Facebook" },
    { icon: SiX, href: "https://x.com", label: "X" },
    { icon: SiInstagram, href: "https://instagram.com", label: "Instagram" },
    { icon: SiYoutube, href: "https://youtube.com", label: "YouTube" },
    { icon: SiLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-card border-t border-border mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-end mb-6">
          <Button
            onClick={scrollToTop}
            variant="outline"
            size="sm"
            className="gap-2"
            data-testid="button-back-to-top"
          >
            <ArrowUp className="h-4 w-4" />
            Back to Top
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div>
            <Link href="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold text-accent-blue">News</span>
              <span className="text-2xl font-bold text-accent-yellow">Hub</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your trusted source for breaking news, in-depth investigations, 
              and multimedia stories from around the world.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Categories</h4>
            <ul className="flex flex-col gap-2">
              {categories.map((category) => {
                const categorySlug = category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");
                return (
                  <li key={category}>
                    <Link
                      href={`/${categorySlug}`}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={`footer-link-${categorySlug}`}
                    >
                      {category}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="footer-link-about"
                >
                  About Us
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setContactOpen(true)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                  data-testid="footer-link-contact"
                >
                  Contact
                </button>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="footer-link-careers"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/advertise"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="footer-link-advertise"
                >
                  Advertise Here
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Newsletter</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Get the latest news delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-testid="input-newsletter-email"
              />
              <Button 
                type="submit" 
                disabled={isSubscribing}
                data-testid="button-subscribe"
              >
                {isSubscribing ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>

          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Stay connected on social media.
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                >
                  <Button variant="outline" size="icon">
                    <social.icon className="h-4 w-4" />
                  </Button>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} NewsHub. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </footer>
  );
}
