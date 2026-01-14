import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Eye, Share2, Link2, Mail } from "lucide-react";
import { SiX, SiFacebook, SiLinkedin, SiWhatsapp, SiTiktok, SiInstagram } from "react-icons/si";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SocialShareProps {
  title: string;
  url: string;
  viewCount: number;
}

export function SocialShare({ title, url, viewCount }: SocialShareProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const fullUrl = typeof window !== "undefined" ? `${window.location.origin}${url}` : url;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(fullUrl);

  const shareLinks = [
    {
      name: "X",
      icon: SiX,
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "hover:text-foreground",
    },
    {
      name: "Facebook",
      icon: SiFacebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:text-blue-600",
    },
    {
      name: "LinkedIn",
      icon: SiLinkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:text-blue-700",
    },
    {
      name: "WhatsApp",
      icon: SiWhatsapp,
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: "hover:text-green-500",
    },
    {
      name: "Email",
      icon: Mail,
      url: `mailto:?subject=${encodedTitle}&body=Check out this article: ${encodedUrl}`,
      color: "hover:text-accent-blue",
    },
    {
      name: "Ticktok",
      icon: SiTiktok,
      url: `https://www.tiktok.com/share/video/${encodedUrl}`,
      color: "hover:text-red-600"
    },
    {
      name: "Instagram",
      icon: SiInstagram,
      url: `https://www.instagram.com/share/video/${encodedUrl}`,
      color: "hover:text-red-600"
    }
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      toast({
        title: "Link copied",
        description: "Article link has been copied to clipboard",
      });
      setIsOpen(false);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually",
        variant: "destructive",
      });
    }
  };

  const handleShareClick = (shareUrl: string) => {
    window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=400");
    setIsOpen(false);
  };

  // const formatViewCount = (count: number): string => {
  //   if (count >= 1000000) {
  //     return `${(count / 1000000).toFixed(1)}M`;
  //   }
  //   if (count >= 1000) {
  //     return `${(count / 1000).toFixed(1)}K`;
  //   }
  //   return count.toString();
  // };

  return (
    <div className="flex items-center gap-4 flex-wrap">
      {/* <div className="flex items-center gap-2 text-muted-foreground" data-testid="article-view-count">
        <Eye className="h-4 w-4" />
        <span className="text-sm font-medium">{formatViewCount(viewCount)} views</span>
      </div> */}

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" data-testid="button-share">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3" align="start">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-muted-foreground mb-1">Share this article</p>
            <div className="flex items-center gap-1">
              {shareLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="ghost"
                  size="icon"
                  className={`${link.color} cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground`}
                  onClick={() => handleShareClick(link.url)}
                  data-testid={`button-share-${link.name.toLowerCase()}`}
                >
                  <link.icon className="h-5 w-5" />
                </Button>
              ))}
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-accent-blue transition-colors cursor-pointer hover:bg-accent hover:text-accent-foreground"
                onClick={handleCopyLink}
                data-testid="button-copy-link"
              >
                <Link2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
