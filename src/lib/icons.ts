import {
  Code2,
  Server,
  Brain,
  Palette,
  BookOpen,
  Cpu,
  Database,
  Globe,
  Lightbulb,
  Rocket,
  Shield,
  Zap,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Server,
  Brain,
  Palette,
  BookOpen,
  Cpu,
  Database,
  Globe,
  Lightbulb,
  Rocket,
  Shield,
  Zap,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || BookOpen;
}