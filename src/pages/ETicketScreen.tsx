import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useParking } from '@/context/ParkingContext';
import { QRCode } from '@/components/parking/QRCode';
import { RouteGuide } from '@/components/parking/RouteGuide';
import { Button } from '@/components/ui/button';
import { 
  Ticket, 
  MapPin, 
  Building, 
  Tag, 
  Clock, 
  ArrowLeft,
  Share2,
  Download
} from 'lucide-react';

const ETicketScreen: React.FC = () => {
  const { currentTicket, clearTicket } = useParking();

  if (!currentTicket) {
    return <Navigate to="/" replace />;
  }

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'women': return 'Women Only';
      case 'disabled': return 'Disabled Access';
      default: return 'General';
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'women': return 'text-slot-women bg-slot-women/10';
      case 'disabled': return 'text-slot-disabled bg-slot-disabled/10';
      default: return 'text-primary bg-primary/10';
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-lg border-b border-border sticky top-0 z-50">
        <div className="max-w-lg mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <Link to="/" onClick={clearTicket}>
              <Button variant="ghost" size="sm" className="gap-1 -ml-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-1">
              <Ticket className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">E-Ticket</span>
            </div>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Ticket Content */}
      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Main Ticket Card */}
        <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden animate-scale-in">
          {/* Ticket Header */}
          <div className="bg-gradient-to-r from-primary to-accent p-6 text-primary-foreground">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">Assigned Slot</p>
                <p className="text-4xl font-bold font-mono mt-1">{currentTicket.slotId}</p>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-xl p-3">
                <QRCode value={currentTicket.qrCode} size={80} />
              </div>
            </div>
          </div>

          {/* Ticket Details */}
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                  <Ticket className="w-3.5 h-3.5" />
                  Ticket ID
                </div>
                <p className="font-mono text-sm font-medium">{currentTicket.ticketId}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                  <Tag className="w-3.5 h-3.5" />
                  Vehicle Token
                </div>
                <p className="font-mono text-sm font-medium">{currentTicket.vehicleToken}</p>
              </div>
            </div>

            <div className="h-px bg-border" />

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                  <Building className="w-3.5 h-3.5" />
                  Floor
                </div>
                <p className="font-semibold">{currentTicket.floor}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                  <MapPin className="w-3.5 h-3.5" />
                  Zone
                </div>
                <p className="font-semibold">{currentTicket.zone}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  Time
                </div>
                <p className="font-semibold">{formatTime(currentTicket.timestamp)}</p>
              </div>
            </div>

            <div className="h-px bg-border" />

            <div className="flex items-center justify-between">
              <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${getCategoryColor(currentTicket.slotCategory)}`}>
                {getCategoryLabel(currentTicket.slotCategory)}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatDate(currentTicket.timestamp)}
              </span>
            </div>
          </div>

          {/* Dashed Separator */}
          <div className="relative">
            <div className="absolute inset-x-0 border-t-2 border-dashed border-border" />
            <div className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-background" />
            <div className="absolute -right-3 -top-3 w-6 h-6 rounded-full bg-background" />
          </div>

          {/* QR Section */}
          <div className="p-6 flex flex-col items-center space-y-3">
            <QRCode value={currentTicket.qrCode} size={140} />
            <p className="text-xs text-muted-foreground text-center">
              Scan at checkpoints for validation
            </p>
          </div>
        </div>

        {/* Route Guide */}
        <div className="bg-card rounded-2xl border border-border shadow-lg p-6 animate-fade-in">
          <RouteGuide route={currentTicket.route} />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 h-12 gap-2">
            <Download className="w-4 h-4" />
            Save Ticket
          </Button>
          <Button variant="outline" className="flex-1 h-12 gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>

        {/* Info */}
        <p className="text-xs text-center text-muted-foreground px-4">
          This e-ticket is valid for single entry. Please proceed directly to your assigned parking slot.
        </p>
      </main>
    </div>
  );
};

export default ETicketScreen;
