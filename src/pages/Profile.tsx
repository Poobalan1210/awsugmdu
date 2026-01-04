import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, Calendar, Target, FileText, Medal, Zap, 
  Linkedin, Github, Twitter, ExternalLink, Building, User
} from 'lucide-react';
import { currentUser, mockSprints, mockBadges, getUserById, mockUsers } from '@/data/mockData';
import { format, parseISO } from 'date-fns';

export default function Profile() {
  const { userId } = useParams();
  
  // If userId is provided, get that user, otherwise show current user
  const user = userId ? getUserById(userId) : currentUser;
  const isOwnProfile = !userId || userId === currentUser.id;
  
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <Card className="glass-card max-w-md">
            <CardContent className="p-8 text-center">
              <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-bold mb-2">User Not Found</h2>
              <p className="text-muted-foreground">The user you're looking for doesn't exist.</p>
              <Button asChild className="mt-4">
                <Link to="/">Go Home</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // Calculate activity summary for this user
  const userSubmissions = mockSprints.flatMap(s => 
    s.submissions.filter(sub => sub.userId === user.id)
  );
  
  const userSprintsParticipated = mockSprints.filter(s => 
    s.registeredUsers.includes(user.id)
  );

  const activitySummary = {
    sprintsCompleted: userSprintsParticipated.filter(s => s.status === 'completed').length,
    totalPoints: user.points,
    submissions: userSubmissions.length,
    blogsWritten: userSubmissions.filter(s => s.blogUrl).length,
    eventsAttended: userSprintsParticipated.length,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glass-card mb-8">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-primary">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-3xl">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </motion.div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold">{user.name}</h1>
                    <Badge variant="outline" className="capitalize">{user.role}</Badge>
                  </div>
                  
                  {user.designation && (
                    <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground mb-2">
                      <Building className="h-4 w-4" />
                      <span>{user.designation}</span>
                      {user.company && <span>at {user.company}</span>}
                    </div>
                  )}
                  
                  <p className="text-muted-foreground mb-4 max-w-2xl">{user.bio}</p>
                  
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Trophy className="h-4 w-4 text-primary" />
                      <span className="font-semibold">{user.points.toLocaleString()}</span>
                      <span className="text-muted-foreground">points</span>
                    </div>
                    {user.rank > 0 && (
                      <div className="flex items-center gap-2 text-sm">
                        <Medal className="h-4 w-4 text-amber-500" />
                        <span className="font-semibold">Rank #{user.rank}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Joined {format(parseISO(user.joinedDate), 'MMMM yyyy')}
                      </span>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    {user.linkedIn && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={user.linkedIn} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4 mr-2" />
                          LinkedIn
                        </a>
                      </Button>
                    )}
                    {user.github && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={user.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                    )}
                    {user.twitter && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={user.twitter} target="_blank" rel="noopener noreferrer">
                          <Twitter className="h-4 w-4 mr-2" />
                          Twitter
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                <div className="text-center">
                  <motion.div 
                    className="text-4xl font-bold text-primary"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                  >
                    {user.badges.length}
                  </motion.div>
                  <div className="text-sm text-muted-foreground">Badges Earned</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Tabs defaultValue="badges" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
          </TabsList>

          {/* Badges Tab */}
          <TabsContent value="badges">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Medal className="h-5 w-5 text-primary" />
                    {isOwnProfile ? 'Your Badges' : `${user.name.split(' ')[0]}'s Badges`}
                  </CardTitle>
                  <CardDescription>
                    Badges earned through contributions and achievements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {user.badges.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {user.badges.map((badge, index) => (
                        <motion.div
                          key={badge.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="border-2 hover:border-primary/50 transition-colors">
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
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Medal className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No badges earned yet.</p>
                    </div>
                  )}

                  {/* Locked Badges - only show on own profile */}
                  {isOwnProfile && (
                    <div className="mt-8">
                      <h3 className="font-semibold text-muted-foreground mb-4">Badges to Unlock</h3>
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {mockBadges
                          .filter((b) => !user.badges.find((cb) => cb.id === b.id))
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
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid gap-6 md:grid-cols-2"
            >
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
                      <div className="text-2xl font-bold text-primary">{user.badges.length}</div>
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
                    {userSprintsParticipated.length > 0 ? (
                      userSprintsParticipated.map((sprint) => (
                        <Link 
                          key={sprint.id} 
                          to={`/skill-sprint?id=${sprint.id}`}
                          className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
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
                        </Link>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No sprint participation yet.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Submissions Tab */}
          <TabsContent value="submissions">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    {isOwnProfile ? 'Your Submissions' : `${user.name.split(' ')[0]}'s Submissions`}
                  </CardTitle>
                  <CardDescription>
                    All sprint submissions and their status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {userSubmissions.length > 0 ? (
                    <div className="space-y-4">
                      {userSubmissions.map((submission, index) => {
                        const sprint = mockSprints.find(s => s.id === submission.sprintId);
                        return (
                          <motion.div
                            key={submission.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Card className="border">
                              <CardContent className="p-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                  <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                      <Badge variant={
                                        submission.status === 'approved' ? 'default' :
                                        submission.status === 'pending' ? 'secondary' : 'destructive'
                                      }>
                                        {submission.status}
                                      </Badge>
                                      {sprint && (
                                        <Badge variant="outline">{sprint.title}</Badge>
                                      )}
                                      <span className="text-sm text-muted-foreground">
                                        {format(parseISO(submission.submittedAt), 'MMM d, yyyy')}
                                      </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">
                                      {submission.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                      {submission.blogUrl && (
                                        <a 
                                          href={submission.blogUrl} 
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-sm text-primary hover:underline flex items-center gap-1"
                                        >
                                          📝 Blog
                                          <ExternalLink className="h-3 w-3" />
                                        </a>
                                      )}
                                      {submission.repoUrl && (
                                        <a 
                                          href={submission.repoUrl} 
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-sm text-primary hover:underline flex items-center gap-1"
                                        >
                                          💻 Repository
                                          <ExternalLink className="h-3 w-3" />
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                  {submission.status === 'approved' && submission.points > 0 && (
                                    <div className="text-right">
                                      <div className="text-2xl font-bold text-primary">+{submission.points}</div>
                                      <div className="text-sm text-muted-foreground">points</div>
                                    </div>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No submissions yet.</p>
                      {isOwnProfile && (
                        <Button asChild className="mt-4">
                          <Link to="/skill-sprint">Join a Sprint</Link>
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
