import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Users, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container relative mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            January Sprint: Serverless is Live!
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Build, Learn & Grow with{' '}
            <span className="gradient-text">AWS Community</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our vibrant community of cloud enthusiasts. Participate in skill sprints, 
            earn badges, and accelerate your cloud journey together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-base">
              <Link to="/signup">
                Join the Community
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base">
              <Link to="/skill-sprint">
                Explore Skill Sprints
              </Link>
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold">500+</p>
              <p className="text-sm text-muted-foreground">Members</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Sprints</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold">50+</p>
              <p className="text-sm text-muted-foreground">Events</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
