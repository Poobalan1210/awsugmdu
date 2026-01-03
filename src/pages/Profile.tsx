import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Trophy, Calendar, Target, FileText, Medal, Zap } from 'lucide-react';
import { currentUser, mockSprints, mockBadges } from '@/data/mockData';
import { format, parseISO } from 'date-fns';

const activitySummary = {
  sprintsCompleted: 3,
  totalPoints: currentUser.points,
  submissions: 5,
  blogsWritten: 2,
  eventsAttended: 8,
};

export default function Profile() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="glass-card mb-8">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-primary">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback className="text-3xl">{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{currentUser.name}</h1>
                <p className="text-muted-foreground mb-4">{currentUser.bio}</p>
                
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="flex items-center gap-2 text-sm">
                    <Trophy className="h-4 w-4 text-primary" />
                    <span className="font-semibold">{currentUser.points.toLocaleString()}</span>
                    <span className="text-muted-foreground">points</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Medal className="h-4 w-4 text-amber-500" />
                    <span className="font-semibold">Rank #{currentUser.rank}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Joined {format(parseISO(currentUser.joinedDate), 'MMMM yyyy')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-4xl font-bold text-primary">{currentUser.badges.length}</div>
                <div className="text-sm text-muted-foreground">Badges Earned</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="badges" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
          </TabsList>

          {/* Badges Tab */}
          <TabsContent value="badges">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Medal className="h-5 w-5 text-primary" />
                  Your Badges
                </CardTitle>
                <CardDescription>
                  Badges earned through your contributions and achievements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {currentUser.badges.map((badge) => (
                    <Card key={badge.id} className="border-2 hover:border-primary/50 transition-colors">
                      <CardContent className="p-4 flex items-start gap-4">
                        <div className="text-4xl">{badge.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{badge.name}</h3>
                          <p className="text-sm text-muted-foreground">{badge.description}</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Earned {format(parseISO(badge.earnedDate), 'MMM d, yyyy')}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Locked Badges */}
                <div className="mt-8">
                  <h3 className="font-semibold text-muted-foreground mb-4">Badges to Unlock</h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {mockBadges
                      .filter((b) => !currentUser.badges.find((cb) => cb.id === b.id))
                      .map((badge) => (
                        <Card key={badge.id} className="border-dashed opacity-60">
                          <CardContent className="p-4 flex items-start gap-4">
                            <div className="text-4xl grayscale">{badge.icon}</div>
                            <div className="flex-1">
                              <h3 className="font-semibold">{badge.name}</h3>
                              <p className="text-sm text-muted-foreground">{badge.description}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Activity Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Sprints Completed</span>
                      <span className="font-semibold">{activitySummary.sprintsCompleted}/12</span>
                    </div>
                    <Progress value={(activitySummary.sprintsCompleted / 12) * 100} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-muted/50 text-center">
                      <div className="text-2xl font-bold text-primary">{activitySummary.submissions}</div>
                      <div className="text-sm text-muted-foreground">Submissions</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50 text-center">
                      <div className="text-2xl font-bold text-primary">{activitySummary.blogsWritten}</div>
                      <div className="text-sm text-muted-foreground">Blogs Written</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50 text-center">
                      <div className="text-2xl font-bold text-primary">{activitySummary.eventsAttended}</div>
                      <div className="text-sm text-muted-foreground">Events Attended</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50 text-center">
                      <div className="text-2xl font-bold text-primary">{currentUser.badges.length}</div>
                      <div className="text-sm text-muted-foreground">Badges</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Sprint Participation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockSprints.slice(0, 3).map((sprint) => (
                      <div key={sprint.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                        <div className={`w-3 h-3 rounded-full ${
                          sprint.status === 'active' ? 'bg-green-500' :
                          sprint.status === 'completed' ? 'bg-primary' : 'bg-muted-foreground'
                        }`} />
                        <div className="flex-1">
                          <p className="font-medium">{sprint.title}</p>
                          <p className="text-sm text-muted-foreground">{sprint.theme}</p>
                        </div>
                        <Badge variant={sprint.status === 'completed' ? 'default' : 'secondary'}>
                          {sprint.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Submissions Tab */}
          <TabsContent value="submissions">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Your Submissions
                </CardTitle>
                <CardDescription>
                  All your sprint submissions and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSprints
                    .flatMap((s) => s.submissions.filter((sub) => sub.userId === '1'))
                    .map((submission) => (
                      <Card key={submission.id} className="border">
                        <CardContent className="p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant={
                                  submission.status === 'approved' ? 'default' :
                                  submission.status === 'pending' ? 'secondary' : 'destructive'
                                }>
                                  {submission.status}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  {format(parseISO(submission.submittedAt), 'MMM d, yyyy')}
                                </span>
                              </div>
                              {submission.blogUrl && (
                                <a href={submission.blogUrl} className="text-sm text-primary hover:underline block">
                                  📝 {submission.blogUrl}
                                </a>
                              )}
                              {submission.repoUrl && (
                                <a href={submission.repoUrl} className="text-sm text-primary hover:underline block">
                                  💻 {submission.repoUrl}
                                </a>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-primary">+{submission.points}</div>
                              <div className="text-sm text-muted-foreground">points</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
