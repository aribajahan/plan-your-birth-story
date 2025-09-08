import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { colors, typography } from "@/styles/design-tokens";
import { cn } from "@/lib/utils";

interface ResourceCardProps {
  title: string;
  description: string;
  href?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'emergency';
  className?: string;
}

export const ResourceCard = ({ 
  title, 
  description, 
  href, 
  icon, 
  variant = 'default',
  className 
}: ResourceCardProps) => {
  const isExternal = href && href.startsWith('http');
  
  const cardContent = (
    <Card className={cn(
      "h-full transition-all duration-300 hover:scale-105 hover:shadow-lg border-0",
      variant === 'emergency' ? "bg-white/10 border border-white/20" : "bg-white/80 backdrop-blur-sm",
      className
    )}>
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          {icon && (
            <div className={cn(
              "flex-shrink-0 p-2 rounded-lg",
              variant === 'emergency' ? "bg-white/10" : "bg-primary/10"
            )}>
              {icon}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <CardTitle 
              className={cn(
                "text-lg leading-tight",
                variant === 'emergency' ? "text-white" : "text-foreground"
              )}
              style={{ fontFamily: typography.heading.fontFamily }}
            >
              {title}
              {isExternal && (
                <ExternalLink className={cn(
                  "inline-block ml-2 w-4 h-4",
                  variant === 'emergency' ? "text-white/70" : "text-muted-foreground"
                )} />
              )}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription 
          className={cn(
            "text-sm leading-relaxed",
            variant === 'emergency' ? "text-white/80" : "text-muted-foreground"
          )}
          style={{ fontFamily: typography.body.fontFamily }}
        >
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );

  if (href) {
    return (
      <a 
        href={href} 
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="block h-full group"
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
};