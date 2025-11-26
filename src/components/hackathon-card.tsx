import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

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
    <div className="relative flex flex-col gap-5 rounded-2xl bg-transparent p-4 transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start gap-4">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/30 blur-lg" />
          <Avatar className="relative size-14 shadow-lg">
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
                className="rounded-full bg-white/5 text-xs font-medium"
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
    </div>
  );
}
