import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Award, Users, BookOpen, Calendar, CheckCircle, ArrowRight } from 'lucide-react';

const certifications = [
  {
    name: 'Cloud Practitioner',
    level: 'Foundational',
    color: 'bg-green-500/10 text-green-600 border-green-500/30',
    members: 45,
  },
  {
    name: 'Solutions Architect Associate',
    level: 'Associate',
    color: 'bg-blue-500/10 text-blue-600 border-blue-500/30',
    members: 32,
  },
  {
    name: 'Developer Associate',
    level: 'Associate',
    color: 'bg-blue-500/10 text-blue-600 border-blue-500/30',
    members: 28,
  },
  {
    name: 'SysOps Administrator',
    level: 'Associate',
    color: 'bg-blue-500/10 text-blue-600 border-blue-500/30',
    members: 18,
  },
  {
    name: 'Solutions Architect Professional',
    level: 'Professional',
    color: 'bg-purple-500/10 text-purple-600 border-purple-500/30',
    members: 12,
  },
  {
    name: 'DevOps Engineer Professional',
    level: 'Professional',
    color: 'bg-purple-500/10 text-purple-600 border-purple-500/30',
    members: 8,
  },
];

export default function CertificationCircle() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-amber-500/10 via-background to-background">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-600 text-sm font-medium mb-4">
              <Award className="h-4 w-4" />
              Study Groups
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Certification Circle</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Join our study groups to prepare for AWS certifications together. 
              Share resources, discuss concepts, and ace your exams.
            </p>
            <Button size="lg">
              Find Your Study Group
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Study Groups */}
        <section className="py-16 container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Active Study Groups</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <Card key={cert.name} className="glass-card hover-lift">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={cert.color}>{cert.level}</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {cert.members}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{cert.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Join Group
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">What You Get</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
              {[
                { icon: BookOpen, text: 'Curated study materials' },
                { icon: Users, text: 'Weekly group discussions' },
                { icon: CheckCircle, text: 'Practice exam questions' },
                { icon: Calendar, text: 'Study schedule templates' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
