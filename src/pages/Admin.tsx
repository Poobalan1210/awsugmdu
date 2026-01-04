import { useState } from 'react';
import { motion } from 'framer-motion';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, Calendar, Users, CheckCircle, XCircle, Clock,
  Rocket, ExternalLink, MessageSquare, Award
} from 'lucide-react';
import { mockSprints, mockMeetups, currentUser, Submission } from '@/data/mockData';
import { format, parseISO } from 'date-fns';

// Get all submissions across sprints
const allSubmissions = mockSprints.flatMap(s => 
  s.submissions.map(sub => ({ ...sub, sprintTitle: s.title, sprintId: s.id }))
);

function SubmissionReview({ submission, onAction }: { 
  submission: Submission & { sprintTitle: string }; 
  onAction: (action: 'approve' | 'reject', points?: number) => void 
}) {
  const [points, setPoints] = useState(100);

  return (
    <Card className="glass-card">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={submission.userAvatar} />
            <AvatarFallback>{submission.userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium">{submission.userName}</span>
              <Badge variant="outline" className="text-xs">{submission.sprintTitle}</Badge>
              <Badge variant={
                submission.status === 'approved' ? 'default' : 
                submission.status === 'rejected' ? 'destructive' : 'secondary'
              }>
                {submission.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{submission.description}</p>
            <div className="flex flex-wrap gap-2 text-sm">
              {submission.blogUrl && (
                <a href={submission.blogUrl} target="_blank" rel="noopener noreferrer" 
                   className="text-primary hover:underline flex items-center gap-1">
                  Blog <ExternalLink className="h-3 w-3" />
                </a>
              )}
              {submission.repoUrl && (
                <a href={submission.repoUrl} target="_blank" rel="noopener noreferrer"
                   className="text-primary hover:underline flex items-center gap-1">
                  Repository <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Submitted {format(parseISO(submission.submittedAt), 'MMM d, yyyy')}
            </p>
          </div>
          {submission.status === 'pending' && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Input 
                  type="number" 
                  value={points} 
                  onChange={(e) => setPoints(Number(e.target.value))}
                  className="w-20 h-8"
                  min={0}
                  max={500}
                />
                <span className="text-sm text-muted-foreground">pts</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => onAction('approve', points)} className="gap-1">
                  <CheckCircle className="h-4 w-4" />
                  Approve
                </Button>
                <Button size="sm" variant="destructive" onClick={() => onAction('reject')} className="gap-1">
                  <XCircle className="h-4 w-4" />
                  Reject
                </Button>
              </div>
            </div>
          )}
          {submission.status !== 'pending' && (
            <Badge variant="outline" className="text-lg px-3 py-1">
              <Award className="h-4 w-4 mr-1" />
              {submission.points} pts
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState('submissions');
  const isAdmin = currentUser.role === 'admin';
  const isSpeaker = currentUser.role === 'speaker';

  const pendingSubmissions = allSubmissions.filter(s => s.status === 'pending');
  const reviewedSubmissions = allSubmissions.filter(s => s.status !== 'pending');

  const handleSubmissionAction = (submissionId: string, action: 'approve' | 'reject', points?: number) => {
    console.log(`${action} submission ${submissionId} with ${points} points`);
    // In real app, this would update the backend
  };

  if (!isAdmin && !isSpeaker) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <Card className="glass-card max-w-md">
            <CardContent className="p-8 text-center">
              <XCircle className="h-12 w-12 mx-auto mb-4 text-destructive" />
              <h2 className="text-xl font-bold mb-2">Access Denied</h2>
              <p className="text-muted-foreground">You don't have permission to access this page.</p>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Admin Panel</h1>
              <p className="text-muted-foreground">Manage events, sprints, and submissions</p>
            </div>
            <Badge variant="outline" className="text-sm capitalize">{currentUser.role}</Badge>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="submissions" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Submissions
                {pendingSubmissions.length > 0 && (
                  <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                    {pendingSubmissions.length}
                  </Badge>
                )}
              </TabsTrigger>
              {isAdmin && (
                <>
                  <TabsTrigger value="sprints" className="gap-2">
                    <Rocket className="h-4 w-4" />
                    Sprints
                  </TabsTrigger>
                  <TabsTrigger value="meetups" className="gap-2">
                    <Calendar className="h-4 w-4" />
                    Meetups
                  </TabsTrigger>
                </>
              )}
            </TabsList>

            <TabsContent value="submissions" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-amber-500" />
                    Pending Reviews ({pendingSubmissions.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingSubmissions.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No pending submissions</p>
                  ) : (
                    pendingSubmissions.map(sub => (
                      <SubmissionReview 
                        key={sub.id} 
                        submission={sub} 
                        onAction={(action, points) => handleSubmissionAction(sub.id, action, points)}
                      />
                    ))
                  )}
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                    Reviewed ({reviewedSubmissions.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {reviewedSubmissions.map(sub => (
                    <SubmissionReview 
                      key={sub.id} 
                      submission={sub} 
                      onAction={() => {}}
                    />
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {isAdmin && (
              <>
                <TabsContent value="sprints">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Manage Sprints</h2>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="gap-2"><Plus className="h-4 w-4" />Create Sprint</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Create New Sprint</DialogTitle>
                        </DialogHeader>
                        <form className="space-y-4">
                          <div className="space-y-2">
                            <Label>Title</Label>
                            <Input placeholder="e.g., Serverless January" />
                          </div>
                          <div className="space-y-2">
                            <Label>Theme</Label>
                            <Input placeholder="e.g., Serverless" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Start Date</Label>
                              <Input type="date" />
                            </div>
                            <div className="space-y-2">
                              <Label>End Date</Label>
                              <Input type="date" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea rows={3} />
                          </div>
                          <div className="space-y-2">
                            <Label>GitHub Repo URL</Label>
                            <Input placeholder="https://github.com/..." />
                          </div>
                          <Button type="submit" className="w-full">Create Sprint</Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="grid gap-4">
                    {mockSprints.map(sprint => (
                      <Card key={sprint.id} className="glass-card">
                        <CardContent className="p-4 flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{sprint.title}</h3>
                            <p className="text-sm text-muted-foreground">{sprint.theme} • {sprint.participants} participants</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={sprint.status === 'active' ? 'default' : 'secondary'}>{sprint.status}</Badge>
                            <Button variant="outline" size="sm">Edit</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="meetups">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Manage Meetups</h2>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="gap-2"><Plus className="h-4 w-4" />Create Meetup</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Create New Meetup</DialogTitle>
                        </DialogHeader>
                        <form className="space-y-4">
                          <div className="space-y-2">
                            <Label>Title</Label>
                            <Input placeholder="e.g., AWS Community Day" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Date</Label>
                              <Input type="date" />
                            </div>
                            <div className="space-y-2">
                              <Label>Time</Label>
                              <Input type="time" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Type</Label>
                            <Select>
                              <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="virtual">Virtual</SelectItem>
                                <SelectItem value="in-person">In-Person</SelectItem>
                                <SelectItem value="hybrid">Hybrid</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea rows={3} />
                          </div>
                          <Button type="submit" className="w-full">Create Meetup</Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="grid gap-4">
                    {mockMeetups.map(meetup => (
                      <Card key={meetup.id} className="glass-card">
                        <CardContent className="p-4 flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{meetup.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {format(parseISO(meetup.date), 'MMM d, yyyy')} • {meetup.attendees} attendees
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={meetup.status === 'upcoming' ? 'default' : 'secondary'}>{meetup.status}</Badge>
                            <Button variant="outline" size="sm">Edit</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </>
            )}
          </Tabs>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
