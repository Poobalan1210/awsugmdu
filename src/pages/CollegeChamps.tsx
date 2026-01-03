import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Users, Calendar, BookOpen, Award, ArrowRight } from 'lucide-react';

export default function CollegeChamps() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-blue-500/10 via-background to-background">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 text-sm font-medium mb-4">
              <GraduationCap className="h-4 w-4" />
              Student Program
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">College Champs</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Empowering the next generation of cloud professionals. Join our student program 
              for exclusive workshops, mentorship, and certification support.
            </p>
            <Button size="lg">
              Join as a Student
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="glass-card">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle>Workshop Series</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Monthly hands-on workshops covering AWS fundamentals, architecture patterns, 
                  and real-world project building.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-purple-500" />
                </div>
                <CardTitle>Mentorship Program</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get paired with experienced AWS professionals who guide you through 
                  your cloud learning journey.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-amber-500" />
                </div>
                <CardTitle>Certification Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Study groups, practice exams, and voucher discounts to help you 
                  get AWS certified.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Coming Soon */}
        <section className="py-16 container mx-auto px-4">
          <Card className="glass-card max-w-2xl mx-auto text-center p-8">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
            <p className="text-muted-foreground mb-6">
              We're working on exciting new features for the College Champs program. 
              Stay tuned for updates!
            </p>
            <Button variant="outline">Get Notified</Button>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}
