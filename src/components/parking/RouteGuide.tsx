import React from 'react';
import { RouteStep } from '@/types/parking';
import { ArrowUp, ArrowLeft, ArrowRight, MapPin, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RouteGuideProps {
  route: RouteStep[];
}

export const RouteGuide: React.FC<RouteGuideProps> = ({ route }) => {
  const getDirectionIcon = (direction: RouteStep['direction']) => {
    switch (direction) {
      case 'left':
        return <ArrowLeft className="w-5 h-5" />;
      case 'right':
        return <ArrowRight className="w-5 h-5" />;
      case 'arrive':
        return <CheckCircle2 className="w-5 h-5" />;
      default:
        return <ArrowUp className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
        <MapPin className="w-4 h-4 text-primary" />
        Route to Your Slot
      </h4>
      
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-4 top-6 bottom-6 w-0.5 bg-border" />
        
        <div className="space-y-2">
          {route.map((step, index) => (
            <div
              key={index}
              className={cn(
                'relative flex items-start gap-3 p-3 rounded-lg transition-all',
                'bg-muted/30 hover:bg-muted/50',
                index === route.length - 1 && 'bg-primary/10 border border-primary/20'
              )}
            >
              <div
                className={cn(
                  'relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                  'bg-card border-2 border-border',
                  index === route.length - 1 && 'bg-primary text-primary-foreground border-primary'
                )}
              >
                {getDirectionIcon(step.direction)}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className={cn(
                  'font-medium text-sm',
                  index === route.length - 1 ? 'text-primary' : 'text-foreground'
                )}>
                  {step.instruction}
                </p>
                {step.landmark && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Look for: {step.landmark}
                  </p>
                )}
              </div>

              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                {index + 1}/{route.length}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
