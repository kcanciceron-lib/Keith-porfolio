import { Code2, Heart } from 'lucide-react';
import { 
  LinkedInPixelIcon, 
  GitHubPixelIcon, 
  MailPixelIcon,
  FacebookPixelIcon,
  InstagramPixelIcon,
  TikTokPixelIcon,
  PhonePixelIcon
} from './PixelIcons';

const socialOutlets = [
  { name: 'Facebook', href: 'https://www.facebook.com/keith.ciceron', icon: FacebookPixelIcon },
  { name: 'Instagram', href: 'https://www.instagram.com/mon.czii', icon: InstagramPixelIcon },
  { name: 'TikTok', href: 'https://www.tiktok.com/@keith_ciceron', icon: TikTokPixelIcon },
  { name: 'Gmail', href: 'mailto:ciceronkeith4@gmail.com', icon: MailPixelIcon },
  { name: 'GitHub', href: 'https://github.com/keith-ciceron', icon: GitHubPixelIcon },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/keith-ciceron', icon: LinkedInPixelIcon },
  { name: 'Phone', href: 'tel:+639682544293', icon: PhonePixelIcon },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-white/5 py-6 relative overflow-hidden">
      <div className="container-max px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-sm bg-crimson-DEFAULT flex items-center justify-center">
              <Code2 size={12} className="text-white" />
            </div>
            <span className="text-neutral-500 text-xs font-pixel">Keith Ciceron</span>
          </div>

          {/* Social Icons grid (7 platforms) */}
          <div className="grid grid-cols-4 sm:flex gap-3.5 items-center my-3 sm:my-0">
            {socialOutlets.map((social) => (
              <a 
                key={social.name}
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:scale-115 transition-transform flex items-center justify-center"
                title={social.name}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          <div className="flex flex-col items-center sm:items-end gap-1">
            <p className="text-neutral-600 text-[10px] flex items-center gap-1">
              Built with <Heart size={10} className="text-crimson-400 fill-crimson-400" /> React & ✨ pixel vibes
            </p>
            <p className="text-neutral-700 text-[10px]">
              &copy; {currentYear} Keith Czimonne Anderson Ciceron
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
