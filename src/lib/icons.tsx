import {
  Banknote,
  Briefcase,
  Building2,
  Coins,
  Fingerprint,
  Globe,
  HandCoins,
  Heart,
  HeartHandshake,
  Landmark,
  MailWarning,
  Mails,
  MonitorSmartphone,
  Share2,
  ShoppingBag,
  Smartphone,
  Ticket,
  TrendingUp,
  UserRoundX,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export const ICONS: Record<string, LucideIcon> = {
  landmark: Landmark,
  trending: TrendingUp,
  coins: Coins,
  smartphone: Smartphone,
  shopping: ShoppingBag,
  heart: Heart,
  briefcase: Briefcase,
  mail: MailWarning,
  fingerprint: Fingerprint,
  impersonation: UserRoundX,
  building: Building2,
  banknote: Banknote,
  ticket: Ticket,
  loan: HandCoins,
  share: Share2,
  charity: HeartHandshake,
  monitor: MonitorSmartphone,
  wallet: Wallet,
  mails: Mails,
  globe: Globe,
};

export function CategoryIcon({ name, size = 22 }: { name: string; size?: number }) {
  const Icon = ICONS[name] ?? Globe;
  return <Icon size={size} strokeWidth={1.5} aria-hidden="true" />;
}
