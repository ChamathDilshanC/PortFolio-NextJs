import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface Props {
  title: string;
  description: string;
  dates: string;
  location: string;
  image?: string;
  links?: readonly {
    icon: React.ReactNode;
    title: string;
    href: string;
  }[];
}

export function HackathonCard({
  title,
  description,
  dates,
  location,
  image,
  links,
}: Props) {
  return (
    <div className="relative flex flex-col gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-background/60 via-background/30 to-background/5 p-6 shadow-lg ring-1 ring-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:shadow-2xl">
      <div className="flex items-start gap-4">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/30 blur-lg" />
          <Avatar className="relative size-14 border border-white/20 shadow-lg">
            <AvatarImage src={image} alt={title} className="object-contain" />
            <AvatarFallback>{title[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-lg font-semibold leading-none">{title}</h2>
            {dates && (
              <Badge
                variant="outline"
                className="rounded-full border-white/20 bg-white/5 text-xs font-medium"
              >
                {dates}
              </Badge>
            )}
          </div>
          {location && (
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
              {location}
            </p>
          )}
          {description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>

      {links && links.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {links?.map((link, idx) => (
            <Link href={link.href} key={idx}>
              <Badge
                variant="outline"
                title={link.title}
                className="flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold !border-foreground/15 !bg-foreground/5 !text-foreground hover:!border-foreground/40 hover:!bg-foreground/10 dark:!border-white/15 dark:!bg-white/10 dark:!text-white dark:hover:!border-white/40 dark:hover:!bg-white/20"
              >
                {link.icon}
                {link.title}
              </Badge>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
