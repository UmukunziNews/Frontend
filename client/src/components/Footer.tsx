import { Link } from "wouter";
import { categories } from "@shared/schema";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold text-accent-blue">News</span>
              <span className="text-2xl font-bold text-accent-yellow">Hub</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              Your trusted source for breaking news, in-depth investigations, 
              and multimedia stories from around the world. Stay informed with 
              the latest updates across all categories.
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
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Advertise
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} NewsHub. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
    </footer>
  );
}
