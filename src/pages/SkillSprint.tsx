import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Rocket, Calendar, Users, Github, MessageSquare, 
  Video, Send, ThumbsUp, Clock, ExternalLink,
  ChevronRight
} from 'lucide-react';
import { mockSprints, mockForumPosts, Sprint } from '@/data/mockData';
import { format, parseISO } from 'date-fns';

const getStatusBadge = (status: Sprint['status']) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-500/10 text-green-600 border-green-500/30">Active</Badge>;
    case 'upcoming':
      return <Badge variant="secondary">Upcoming</Badge>;
    case 'completed':
      return <Badge variant="outline">Completed</Badge>;
  }
};

function SprintCard({ sprint, onSelect }: { sprint: Sprint; onSelect: () => void }) {
  return (
    <Card className="glass-card hover-lift cursor-pointer" onClick={onSelect}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          {getStatusBadge(sprint.status)}
          <span className="text-sm text-muted-foreground">
            {format(parseISO(sprint.startDate), 'MMM yyyy')}
          </span>
        </div>
        
        <h3 className="text-xl font-bold mb-2">{sprint.title}</h3>
        <Badge variant="outline" className="mb-4">{sprint.theme}</Badge>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {sprint.description}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {sprint.participants}
          </div>
          <div className="flex items-center gap-1">
            <Video className="h-4 w-4" />
            {sprint.sessions.length} sessions
          </div>
        </div>
        
        <Button className="w-full mt-4" variant={sprint.status === 'active' ? 'default' : 'outline'}>
          {sprint.status === 'active' ? 'Join Sprint' : 'View Details'}
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
}

function SprintDetail({ sprint, onBack }: { sprint: Sprint; onBack: () => void }) {
  const forumPosts = mockForumPosts.filter((p) => p.sprintId === sprint.id);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>← Back</Button>
      </div>

      <div className="glass-card p-6 md:p-8 rounded-lg">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          {getStatusBadge(sprint.status)}
          <Badge variant="outline" className="text-base">{sprint.theme}</Badge>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">{sprint.title}</h1>
        <p className="text-muted-foreground mb-6">{sprint.description}</p>
        
        <div className="flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span>
              {format(parseISO(sprint.startDate), 'MMM d')} - {format(parseISO(sprint.endDate), 'MMM d, yyyy')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <span>{sprint.participants} participants</span>
          </div>
          {sprint.githubRepo && (
            <a 
              href={sprint.githubRepo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:underline"
            >
              <Github className="h-4 w-4" />
              Starter Code
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>

        {sprint.status === 'active' && (
          <Button className="mt-6" size="lg">
            <Rocket className="h-4 w-4 mr-2" />
            Join This Sprint
          </Button>
        )}
      </div>

      <Tabs defaultValue="sessions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="forum">Discussion</TabsTrigger>
          <TabsTrigger value="submit">Submit</TabsTrigger>
        </TabsList>

        {/* Sessions Tab */}
        <TabsContent value="sessions">
          <div className="grid gap-4">
            {sprint.sessions.map((session) => (
              <Card key={session.id} className="glass-card">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{session.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{session.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {format(parseISO(session.date), 'EEEE, MMMM d')}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {session.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          Speaker: {session.speaker}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline">
                      <Video className="h-4 w-4 mr-2" />
                      Join Session
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Forum Tab */}
        <TabsContent value="forum">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Sprint Discussion Forum
              </CardTitle>
              <CardDescription>
                Ask questions, share learnings, and help fellow participants
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* New Post Form */}
              <div className="mb-6 p-4 rounded-lg bg-muted/50">
                <div className="flex gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" />
                    <AvatarFallback>Y</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <Input placeholder="Post title..." />
                    <Textarea placeholder="Share your thoughts or ask a question..." rows={3} />
                    <Button size="sm">
                      <Send className="h-4 w-4 mr-2" />
                      Post
                    </Button>
                  </div>
                </div>
              </div>

              {/* Posts */}
              <div className="space-y-4">
                {forumPosts.map((post) => (
                  <Card key={post.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={post.userAvatar} />
                          <AvatarFallback>{post.userName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{post.userName}</span>
                            <span className="text-sm text-muted-foreground">
                              · {format(parseISO(post.createdAt), 'MMM d')}
                            </span>
                          </div>
                          <h4 className="font-medium mb-2">{post.title}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{post.content}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <button className="flex items-center gap-1 hover:text-primary transition-colors">
                              <ThumbsUp className="h-4 w-4" />
                              {post.likes}
                            </button>
                            <button className="flex items-center gap-1 hover:text-primary transition-colors">
                              <MessageSquare className="h-4 w-4" />
                              {post.replies} replies
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Submit Tab */}
        <TabsContent value="submit">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5 text-primary" />
                Submit Your Work
              </CardTitle>
              <CardDescription>
                Share your blog post or project repository to earn points
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="blog-url">Blog Post URL (Optional)</Label>
                  <Input 
                    id="blog-url" 
                    type="url" 
                    placeholder="https://dev.to/your-post" 
                  />
                  <p className="text-xs text-muted-foreground">
                    Share your learning journey through a blog post
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="repo-url">Repository URL (Optional)</Label>
                  <Input 
                    id="repo-url" 
                    type="url" 
                    placeholder="https://github.com/username/project" 
                  />
                  <p className="text-xs text-muted-foreground">
                    Link to your project repository
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Tell us about what you built and learned..."
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Submit for Review
                </Button>
              </form>

              {/* Past Submissions */}
              {sprint.submissions.length > 0 && (
                <div className="mt-8 pt-8 border-t">
                  <h3 className="font-semibold mb-4">Community Submissions</h3>
                  <div className="space-y-3">
                    {sprint.submissions.map((sub) => (
                      <div key={sub.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${sub.userName}`} />
                            <AvatarFallback>{sub.userName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{sub.userName}</p>
                            <p className="text-xs text-muted-foreground">
                              {format(parseISO(sub.submittedAt), 'MMM d, yyyy')}
                            </p>
                          </div>
                        </div>
                        <Badge variant={sub.status === 'approved' ? 'default' : 'secondary'}>
                          +{sub.points} pts
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function SkillSprint() {
  const [selectedSprint, setSelectedSprint] = useState<Sprint | null>(null);

  const activeSprints = mockSprints.filter((s) => s.status === 'active');
  const upcomingSprints = mockSprints.filter((s) => s.status === 'upcoming');
  const completedSprints = mockSprints.filter((s) => s.status === 'completed');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {selectedSprint ? (
          <SprintDetail sprint={selectedSprint} onBack={() => setSelectedSprint(null)} />
        ) : (
          <>
            {/* Hero */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Rocket className="h-4 w-4" />
                Monthly Hands-on Challenges
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Builders Skill Sprint</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Each month, dive into a specific AWS theme with virtual sessions, hands-on challenges, 
                and a supportive community. Build real projects and earn points!
              </p>
            </div>

            {/* Active Sprints */}
            {activeSprints.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  Active Sprint
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {activeSprints.map((sprint) => (
                    <SprintCard 
                      key={sprint.id} 
                      sprint={sprint} 
                      onSelect={() => setSelectedSprint(sprint)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Upcoming Sprints */}
            {upcomingSprints.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Upcoming Sprints</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {upcomingSprints.map((sprint) => (
                    <SprintCard 
                      key={sprint.id} 
                      sprint={sprint} 
                      onSelect={() => setSelectedSprint(sprint)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Completed Sprints */}
            {completedSprints.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6">Past Sprints</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {completedSprints.map((sprint) => (
                    <SprintCard 
                      key={sprint.id} 
                      sprint={sprint} 
                      onSelect={() => setSelectedSprint(sprint)}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
