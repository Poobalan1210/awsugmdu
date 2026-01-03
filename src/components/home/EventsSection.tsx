import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockEvents } from '@/data/mockData';
import { format, parseISO, isPast } from 'date-fns';

const getEventTypeBadge = (type: string) => {
  switch (type) {
    case 'virtual':
      return <Badge variant="secondary">Virtual</Badge>;
    case 'in-person':
      return <Badge className="bg-green-500/10 text-green-600 border-green-500/30">In-Person</Badge>;
    case 'hybrid':
      return <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/30">Hybrid</Badge>;
    default:
      return null;
  }
};

const getCategoryBadge = (category: string) => {
  const styles: Record<string, string> = {
    sprint: 'bg-primary/10 text-primary border-primary/30',
    workshop: 'bg-blue-500/10 text-blue-600 border-blue-500/30',
    meetup: 'bg-teal-500/10 text-teal-600 border-teal-500/30',
    certification: 'bg-amber-500/10 text-amber-600 border-amber-500/30',
  };
  return (
    <Badge className={styles[category] || ''}>
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </Badge>
  );
};

function EventCard({ event }: { event: typeof mockEvents[0] }) {
  const eventDate = parseISO(event.date);
  const isUpcoming = !isPast(eventDate);

  return (
    <Card className="glass-card hover-lift">
      <CardContent className="p-5">
        <div className="flex flex-wrap gap-2 mb-3">
          {getEventTypeBadge(event.type)}
          {getCategoryBadge(event.category)}
        </div>
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{event.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {event.description}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {format(eventDate, 'MMM d, yyyy')}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {event.attendees}
          </div>
        </div>
        {isUpcoming && (
          <Button className="w-full mt-4" size="sm">
            Register Now
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export function EventsSection() {
  const now = new Date();
  const upcomingEvents = mockEvents.filter((e) => !isPast(parseISO(e.date)));
  const pastEvents = mockEvents.filter((e) => isPast(parseISO(e.date)));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Calendar className="h-6 w-6 text-primary" />
          Events
        </h2>
        <Button variant="ghost" asChild>
          <Link to="/events" className="flex items-center gap-1">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-xs mb-6">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          {upcomingEvents.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.slice(0, 3).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <Card className="glass-card">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No upcoming events scheduled.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="past">
          {pastEvents.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pastEvents.slice(0, 3).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <Card className="glass-card">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No past events yet.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
