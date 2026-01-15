import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { categories } from "@shared/schema";

import { ContactModal } from "@/components/ContactModal";
import { companyLinks } from "./data/companyLinks";
import { footerPolicies } from "./data/footerPolicies";

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


  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-accent-blue to-accent-blue/80 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">U</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-bold text-accent-blue tracking-tight">Umukunzi</span>
                <span className="text-xs font-semibold text-accent-yellow uppercase tracking-widest">News</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your trusted source for breaking news, in-depth investigations, and multimedia stories from around the world.
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
              {companyLinks.map((link) => (
                <li key={link.label}>
                  {link.action === "contact" ? (
                    <button
                      onClick={() => setContactOpen(true)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                      data-testid={link.testId}
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      href={link.href!}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={link.testId}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
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
            <h4 className="font-bold mb-4">Company</h4>

            <ul className="flex flex-col gap-2">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  {link.action === "contact" ? (
                    <button
                      onClick={() => setContactOpen(true)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                      data-testid={link.testId}
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      href={link.href!}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={link.testId}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} Umukunzi News. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
            {footerPolicies.map((policy) => (
              <Link
                key={policy.label}
                href={policy.href}
                className="hover:text-foreground transition-colors"
              >
                {policy.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </footer>
  );
}