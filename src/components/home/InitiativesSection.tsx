import { Link } from 'react-router-dom';
import { Rocket, GraduationCap, Award, ShoppingBag, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const initiatives = [
  {
    title: 'Builders Skill Sprint',
    description: 'Monthly themed challenges with hands-on projects. Learn by building real applications with AWS services.',
    icon: Rocket,
    path: '/skill-sprint',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    title: 'College Champs',
    description: 'Empowering students with cloud skills through workshops, mentorship, and certification support.',
    icon: GraduationCap,
    path: '/college-champs',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    title: 'Certification Circle',
    description: 'Study groups and resources to help you prepare for and pass AWS certifications.',
    icon: Award,
    path: '/certification-circle',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
  {
    title: 'Community Store',
    description: 'Exclusive merchandise and swag for our community members. Redeem your points for rewards.',
    icon: ShoppingBag,
    path: '/store',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
];

export function InitiativesSection() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Initiatives</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our programs designed to help you learn, grow, and connect with the AWS community.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {initiatives.map((initiative) => (
          <Card key={initiative.title} className="glass-card hover-lift group">
            <CardHeader>
              <div className={`w-12 h-12 rounded-lg ${initiative.bgColor} flex items-center justify-center mb-4`}>
                <initiative.icon className={`h-6 w-6 ${initiative.color}`} />
              </div>
              <CardTitle className="text-xl">{initiative.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4 min-h-[60px]">
                {initiative.description}
              </CardDescription>
              <Button variant="ghost" asChild className="p-0 h-auto group-hover:text-primary">
                <Link to={initiative.path} className="flex items-center gap-1">
                  Learn more 
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
