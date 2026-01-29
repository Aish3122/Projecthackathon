import React from 'react';
import { RouteStep } from '@/types/parking';
import { ArrowUp, ArrowLeft, ArrowRight, MapPin, CheckCircle2, AlertTriangle } from 'lucide-react';
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

  const getTrafficColor = (trafficLevel?: string) => {
    switch (trafficLevel) {
      case 'clear':
        return 'bg-slot-available text-white';
      case 'moderate':
        return 'bg-amber-500 text-black';
      case 'heavy':
        return 'bg-slot-occupied text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTrafficLabel = (trafficLevel?: string) => {
    switch (trafficLevel) {
      case 'clear':
        return 'Clear';
      case 'moderate':
        return 'Moderate';
      case 'heavy':
        return 'Heavy';
      default:
        return '';
    }
  };

  const getTrafficLineColor = (trafficLevel?: string) => {
    switch (trafficLevel) {
      case 'clear':
        return 'bg-slot-available';
      case 'moderate':
        return 'bg-amber-500';
      case 'heavy':
        return 'bg-slot-occupied';
      default:
        return 'bg-border';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          Route to Your Slot
        </h4>
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-slot-available" />
            <span className="text-muted-foreground">Clear</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-muted-foreground">Moderate</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-slot-occupied" />
            <span className="text-muted-foreground">Heavy</span>
          </div>
        </div>
      </div>
      
      <div className="relative">
        {/* Dynamic connecting line based on traffic */}
        <div className="absolute left-4 top-6 bottom-6 w-0.5 flex flex-col">
          {route.slice(0, -1).map((step, index) => (
            <div 
              key={index}
              className={cn('flex-1', getTrafficLineColor(step.trafficLevel))}
            />
          ))}
        </div>
        
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

              <div className="flex items-center gap-2">
                {step.trafficLevel && step.trafficLevel !== 'clear' && index !== route.length - 1 && (
                  <span className={cn(
                    'text-xs px-2 py-0.5 rounded-full flex items-center gap-1',
                    getTrafficColor(step.trafficLevel)
                  )}>
                    {step.trafficLevel === 'heavy' && <AlertTriangle className="w-3 h-3" />}
                    {getTrafficLabel(step.trafficLevel)}
                  </span>
                )}
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  {index + 1}/{route.length}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
