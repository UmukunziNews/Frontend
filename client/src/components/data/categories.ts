import { categories } from "@shared/schema";

export const footerSections = [
    {
        title: "Categories",
        links: categories.map((c) => ({
            label: c,
            href: `/${c.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`,
        })),
    },
    {
        title: "Company",
        links: [
            { label: "About Us", href: "/about" },
            { label: "Contact", action: "contact" },
            { label: "Careers", href: "/careers" },
            { label: "Advertise Here", href: "/advertise" },
        ],
    },
];

export const footerPolicies = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
];
