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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, Calendar, Users, CheckCircle, XCircle, Clock,
  Rocket, ExternalLink, MessageSquare, Award, Link2,
  Copy, Mail, Edit, Trash2, Eye, FileText, User, Video,
  Upload, X, UserPlus, Check, ChevronDown
} from 'lucide-react';
import { mockSprints, mockMeetups, currentUser, Submission, generateSpeakerInviteLink, Sprint, Session, SessionPerson, mockUsers, User as UserType } from '@/data/mockData';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { format, parseISO } from 'date-fns';
import { toast } from 'sonner';

// Get all submissions across sprints
const allSubmissions = mockSprints.flatMap(s => 
  s.submissions.map(sub => ({ ...sub, sprintTitle: s.title, sprintId: s.id }))
);

function SubmissionReview({ submission, onAction }: { 
  submission: Submission & { sprintTitle: string }; 
  onAction: (action: 'approve' | 'reject', points?: number, feedback?: string) => void 
}) {
  const [points, setPoints] = useState(100);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <Card className="glass-card">
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-start gap-4">
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <Avatar className="h-12 w-12 flex-shrink-0">
              <AvatarImage src={submission.userAvatar} />
              <AvatarFallback>{submission.userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-semibold">{submission.userName}</span>
                <Badge variant="outline" className="text-xs">{submission.sprintTitle}</Badge>
                <Badge variant={
                  submission.status === 'approved' ? 'default' : 
                  submission.status === 'rejected' ? 'destructive' : 'secondary'
                } className="capitalize">
                  {submission.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{submission.description}</p>
              <div className="flex flex-wrap gap-3 text-sm">
                {submission.blogUrl && (
                  <a href={submission.blogUrl} target="_blank" rel="noopener noreferrer" 
                     className="text-primary hover:underline flex items-center gap-1 bg-primary/10 px-2 py-1 rounded">
                    <FileText className="h-3 w-3" />
                    Blog
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                {submission.repoUrl && (
                  <a href={submission.repoUrl} target="_blank" rel="noopener noreferrer"
                     className="text-primary hover:underline flex items-center gap-1 bg-primary/10 px-2 py-1 rounded">
                    <ExternalLink className="h-3 w-3" />
                    Repository
                  </a>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Submitted {format(parseISO(submission.submittedAt), 'MMM d, yyyy')}
              </p>
            </div>
          </div>
          
          {submission.status === 'pending' ? (
            <div className="flex flex-col gap-3 lg:w-64">
              <div className="flex items-center gap-2">
                <Label className="text-xs">Points:</Label>
                <Input 
                  type="number" 
                  value={points} 
                  onChange={(e) => setPoints(Number(e.target.value))}
                  className="w-20 h-8"
                  min={0}
                  max={500}
                />
              </div>
              {showFeedback && (
                <Textarea 
                  placeholder="Add feedback (optional)..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={2}
                  className="text-sm"
                />
              )}
              <div className="flex gap-2">
                <Button size="sm" onClick={() => onAction('approve', points, feedback)} className="flex-1 gap-1">
                  <CheckCircle className="h-4 w-4" />
                  Approve
                </Button>
                <Button size="sm" variant="destructive" onClick={() => onAction('reject', 0, feedback)} className="flex-1 gap-1">
                  <XCircle className="h-4 w-4" />
                  Reject
                </Button>
              </div>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setShowFeedback(!showFeedback)}
                className="text-xs"
              >
                {showFeedback ? 'Hide' : 'Add'} Feedback
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-end gap-2">
              <Badge variant="outline" className="text-lg px-4 py-2">
                <Award className="h-4 w-4 mr-2" />
                {submission.points} pts
              </Badge>
              {submission.feedback && (
                <p className="text-xs text-muted-foreground max-w-xs text-right">
                  "{submission.feedback}"
                </p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function SpeakerInviteDialog({ eventType, eventId, eventTitle }: {
  eventType: 'sprint' | 'meetup';
  eventId: string;
  eventTitle: string;
}) {
  const [email, setEmail] = useState('');
  const [inviteLink, setInviteLink] = useState('');

  const generateInvite = () => {
    const link = generateSpeakerInviteLink(eventType, eventId);
    const fullLink = `${window.location.origin}/speaker-invite/${link}`;
    setInviteLink(fullLink);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    toast.success('Link copied to clipboard!');
  };

  const sendEmail = () => {
    if (!email) {
      toast.error('Please enter an email address');
      return;
    }
    toast.success(`Invitation sent to ${email}`);
    setEmail('');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <Link2 className="h-4 w-4" />
          Invite Speaker
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Speaker</DialogTitle>
          <DialogDescription>
            Generate a unique link for speakers to submit their session details for {eventTitle}.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {!inviteLink ? (
            <Button onClick={generateInvite} className="w-full">
              <Link2 className="h-4 w-4 mr-2" />
              Generate Speaker Invite Link
            </Button>
          ) : (
            <>
              <div className="space-y-2">
                <Label>Speaker Invite Link</Label>
                <div className="flex gap-2">
                  <Input value={inviteLink} readOnly className="text-xs" />
                  <Button size="icon" variant="outline" onClick={copyLink}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="border-t pt-4">
                <Label>Or send via email</Label>
                <div className="flex gap-2 mt-2">
                  <Input 
                    type="email" 
                    placeholder="speaker@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button onClick={sendEmail}>
                    <Mail className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CreateSprintDialog() {
  const [formData, setFormData] = useState({
    title: '',
    theme: '',
    description: '',
    startDate: '',
    endDate: '',
    githubRepo: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Sprint created successfully!');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2"><Plus className="h-4 w-4" />Create Sprint</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Sprint</DialogTitle>
          <DialogDescription>
            Set up a new skill sprint for the community.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input 
              placeholder="e.g., Serverless January"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Theme</Label>
            <Input 
              placeholder="e.g., Serverless"
              value={formData.theme}
              onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input 
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input 
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea 
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the sprint objectives and what participants will learn..."
              required
            />
          </div>
          <div className="space-y-2">
            <Label>GitHub Repo URL (Optional)</Label>
            <Input 
              placeholder="https://github.com/..."
              value={formData.githubRepo}
              onChange={(e) => setFormData({ ...formData, githubRepo: e.target.value })}
            />
          </div>
          <Button type="submit" className="w-full">Create Sprint</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Helper function to convert User to SessionPerson
const userToSessionPerson = (user: UserType): SessionPerson => ({
  userId: user.id,
  name: user.name,
  photo: user.avatar,
  email: user.email,
  designation: user.designation,
  company: user.company,
  linkedIn: user.linkedIn
});

// User Select Component for single selection
function UserSelect({
  selectedUser,
  onSelect,
  placeholder,
  excludeUserIds = []
}: {
  selectedUser?: SessionPerson;
  onSelect: (user: SessionPerson | undefined) => void;
  placeholder: string;
  excludeUserIds?: string[];
}) {
  const [open, setOpen] = useState(false);
  const availableUsers = mockUsers.filter(user => 
    !excludeUserIds.includes(user.id) && user.id !== selectedUser?.userId
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedUser ? (
            <div className="flex items-center gap-2">
              <Avatar className="h-5 w-5">
                <AvatarImage src={selectedUser.photo} />
                <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{selectedUser.name}</span>
            </div>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search users..." />
          <CommandList>
            <CommandEmpty>No users found.</CommandEmpty>
            <CommandGroup>
              {availableUsers.map((user) => {
                const isSelected = selectedUser?.userId === user.id;
                return (
                  <CommandItem
                    key={user.id}
                    value={user.name}
                    onSelect={() => {
                      onSelect(isSelected ? undefined : userToSessionPerson(user));
                      setOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{user.name}</div>
                        {user.designation && (
                          <div className="text-xs text-muted-foreground">{user.designation}</div>
                        )}
                      </div>
                      {isSelected && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// User Multi-Select Component
function UserMultiSelect({
  selectedUsers,
  onSelect,
  placeholder,
  excludeUserIds = []
}: {
  selectedUsers: SessionPerson[];
  onSelect: (users: SessionPerson[]) => void;
  placeholder: string;
  excludeUserIds?: string[];
}) {
  const [open, setOpen] = useState(false);
  const selectedUserIds = selectedUsers.map(u => u.userId).filter(Boolean) as string[];
  const availableUsers = mockUsers.filter(user => 
    !excludeUserIds.includes(user.id) && !selectedUserIds.includes(user.id)
  );

  const toggleUser = (user: UserType) => {
    const userPerson = userToSessionPerson(user);
    const isSelected = selectedUsers.some(u => u.userId === user.id);
    
    if (isSelected) {
      onSelect(selectedUsers.filter(u => u.userId !== user.id));
    } else {
      onSelect([...selectedUsers, userPerson]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <span className="text-muted-foreground">
            {selectedUsers.length > 0 
              ? `${selectedUsers.length} selected` 
              : placeholder}
          </span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search users..." />
          <CommandList>
            <CommandEmpty>No users found.</CommandEmpty>
            <CommandGroup>
              {availableUsers.map((user) => {
                const isSelected = selectedUsers.some(u => u.userId === user.id);
                return (
                  <CommandItem
                    key={user.id}
                    value={user.name}
                    onSelect={() => toggleUser(user)}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{user.name}</div>
                        {user.designation && (
                          <div className="text-xs text-muted-foreground">{user.designation}</div>
                        )}
                      </div>
                      {isSelected && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function SessionPeopleManager({ 
  sessionData, 
  onUpdate 
}: { 
  sessionData: {
    hosts?: SessionPerson[];
    speakers?: SessionPerson[];
    volunteers?: SessionPerson[];
  };
  onUpdate: (data: {
    hosts?: SessionPerson[];
    speakers?: SessionPerson[];
    volunteers?: SessionPerson[];
  }) => void;
}) {
  const removeHost = (userId: string) => {
    const updated = (sessionData.hosts || []).filter(h => h.userId !== userId);
    onUpdate({ ...sessionData, hosts: updated });
  };

  const removeSpeaker = (userId: string) => {
    const updated = (sessionData.speakers || []).filter(s => s.userId !== userId);
    onUpdate({ ...sessionData, speakers: updated });
  };

  const removeVolunteer = (userId: string) => {
    const updated = (sessionData.volunteers || []).filter(v => v.userId !== userId);
    onUpdate({ ...sessionData, volunteers: updated });
  };

  const excludeUserIds = [
    ...(sessionData.hosts || []).map(h => h.userId),
    ...(sessionData.speakers || []).map(s => s.userId),
    ...(sessionData.volunteers || []).map(v => v.userId)
  ].filter(Boolean) as string[];

  return (
    <div className="space-y-6">
      {/* Hosts */}
      <div>
        <Label className="text-sm font-semibold mb-2 block">
          Hosts ({sessionData.hosts?.length || 0})
        </Label>
        <div className="space-y-2">
          {sessionData.hosts?.map((host) => (
            <div key={host.userId} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Avatar className="h-10 w-10">
                <AvatarImage src={host.photo} />
                <AvatarFallback>{host.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{host.name}</span>
                  <Badge variant="outline" className="text-xs">Host</Badge>
                </div>
                {host.designation && (
                  <p className="text-xs text-muted-foreground">{host.designation}</p>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeHost(host.userId!)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <UserMultiSelect
            selectedUsers={sessionData.hosts || []}
            onSelect={(users) => onUpdate({ ...sessionData, hosts: users })}
            placeholder="Select hosts..."
            excludeUserIds={[
              ...(sessionData.speakers || []).map(s => s.userId),
              ...(sessionData.volunteers || []).map(v => v.userId)
            ].filter(Boolean) as string[]}
          />
        </div>
      </div>

      {/* Speakers */}
      <div>
        <Label className="text-sm font-semibold mb-2 block">
          Speakers ({sessionData.speakers?.length || 0}) *
        </Label>
        <div className="space-y-2">
          {sessionData.speakers?.map((speaker) => (
            <div key={speaker.userId} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Avatar className="h-10 w-10">
                <AvatarImage src={speaker.photo} />
                <AvatarFallback>{speaker.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{speaker.name}</span>
                  <Badge variant="default" className="text-xs">Speaker</Badge>
                </div>
                {speaker.designation && (
                  <p className="text-xs text-muted-foreground">{speaker.designation}</p>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeSpeaker(speaker.userId!)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <UserMultiSelect
            selectedUsers={sessionData.speakers || []}
            onSelect={(users) => onUpdate({ ...sessionData, speakers: users })}
            placeholder="Select speakers..."
            excludeUserIds={[
              ...(sessionData.hosts || []).map(h => h.userId),
              ...(sessionData.volunteers || []).map(v => v.userId)
            ].filter(Boolean) as string[]}
          />
        </div>
      </div>

      {/* Volunteers */}
      <div>
        <Label className="text-sm font-semibold mb-2 block">
          Volunteers ({sessionData.volunteers?.length || 0})
        </Label>
        <div className="space-y-2">
          {sessionData.volunteers?.map((volunteer) => (
            <div key={volunteer.userId} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Avatar className="h-10 w-10">
                <AvatarImage src={volunteer.photo} />
                <AvatarFallback>{volunteer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{volunteer.name}</span>
                  <Badge variant="secondary" className="text-xs">Volunteer</Badge>
                </div>
                {volunteer.designation && (
                  <p className="text-xs text-muted-foreground">{volunteer.designation}</p>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeVolunteer(volunteer.userId!)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <UserMultiSelect
            selectedUsers={sessionData.volunteers || []}
            onSelect={(users) => onUpdate({ ...sessionData, volunteers: users })}
            placeholder="Select volunteers..."
            excludeUserIds={[sessionData.host?.userId, sessionData.speaker?.userId].filter(Boolean) as string[]}
          />
        </div>
      </div>
    </div>
  );
}

function AddSessionDialog({ sprint }: { sprint: Sprint }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    duration: '90',
    description: '',
    meetingLink: '',
    posterImage: ''
  });
  const [peopleData, setPeopleData] = useState<{
    hosts?: SessionPerson[];
    speakers?: SessionPerson[];
    volunteers?: SessionPerson[];
  }>({
    hosts: [],
    speakers: [],
    volunteers: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!peopleData.speakers || peopleData.speakers.length === 0) {
      toast.error('Please add at least one speaker for this session');
      return;
    }

    // Use the first speaker for backward compatibility with existing Session interface
    const primarySpeaker = peopleData.speakers[0];

    // Create session object
    const newSession: Session = {
      id: `ses-${Date.now()}`,
      title: formData.title,
      speaker: primarySpeaker.name,
      speakerId: primarySpeaker.userId,
      speakerPhoto: primarySpeaker.photo,
      speakerDesignation: primarySpeaker.designation,
      speakerCompany: primarySpeaker.company,
      speakerLinkedIn: primarySpeaker.linkedIn,
      hosts: peopleData.hosts,
      speakers: peopleData.speakers,
      volunteers: peopleData.volunteers,
      date: formData.date,
      time: formData.time,
      duration: `${formData.duration} minutes`,
      description: formData.description,
      meetingLink: formData.meetingLink || undefined,
      posterImage: formData.posterImage || undefined
    };

    // In a real app, this would be an API call
    console.log('Adding session to sprint:', sprint.id, newSession);
    toast.success('Session added successfully!');
    
    // Reset form
    setFormData({
      title: '',
      date: '',
      time: '',
      duration: '90',
      description: '',
      meetingLink: '',
      posterImage: ''
    });
    setPeopleData({ hosts: [], speakers: [], volunteers: [] });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <Video className="h-4 w-4" />
          Add Session
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Session to {sprint.title}</DialogTitle>
          <DialogDescription>
            Create a new session for this sprint. Add session details, poster, and assign people to roles.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Session Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Session Details</h3>
            <div className="space-y-2">
              <Label>Session Title *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Introduction to Serverless Architecture"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date *</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Time *</Label>
                <Input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Duration (minutes)</Label>
                <Input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="90"
                  min="15"
                  max="300"
                />
              </div>
              <div className="space-y-2">
                <Label>Meeting Link</Label>
                <Input
                  value={formData.meetingLink}
                  onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                  placeholder="https://meet.example.com/..."
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Session Description *</Label>
              <Textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe what participants will learn in this session..."
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Poster Image URL</Label>
              <div className="flex gap-2">
                <Input
                  value={formData.posterImage}
                  onChange={(e) => setFormData({ ...formData, posterImage: e.target.value })}
                  placeholder="https://example.com/poster.jpg"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    // In a real app, this would open a file upload dialog
                    toast.info('File upload feature will be implemented with backend');
                  }}
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
              {formData.posterImage && (
                <div className="mt-2">
                  <img
                    src={formData.posterImage}
                    alt="Poster preview"
                    className="w-full h-32 object-cover rounded-lg border"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* People Management */}
          <div className="space-y-4 border-t pt-6">
            <h3 className="font-semibold text-lg">Session People</h3>
            <SessionPeopleManager
              sessionData={peopleData}
              onUpdate={setPeopleData}
            />
          </div>

          <div className="flex gap-2 pt-4 border-t">
            <Button type="submit" className="flex-1">
              <Plus className="h-4 w-4 mr-2" />
              Create Session
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function CreateMeetupDialog() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    type: 'virtual' as 'virtual' | 'in-person' | 'hybrid',
    location: '',
    meetingLink: '',
    maxAttendees: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Meetup created successfully!');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2"><Plus className="h-4 w-4" />Create Meetup</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Meetup</DialogTitle>
          <DialogDescription>
            Schedule a new meetup for the community.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input 
              placeholder="e.g., AWS Community Day"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input 
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Time</Label>
              <Input 
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Type</Label>
              <Select 
                value={formData.type}
                onValueChange={(value: 'virtual' | 'in-person' | 'hybrid') => 
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="virtual">Virtual</SelectItem>
                  <SelectItem value="in-person">In-Person</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Max Attendees</Label>
              <Input 
                type="number"
                placeholder="e.g., 100"
                value={formData.maxAttendees}
                onChange={(e) => setFormData({ ...formData, maxAttendees: e.target.value })}
              />
            </div>
          </div>
          {(formData.type === 'in-person' || formData.type === 'hybrid') && (
            <div className="space-y-2">
              <Label>Location</Label>
              <Input 
                placeholder="e.g., Tech Hub, Bangalore"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          )}
          {(formData.type === 'virtual' || formData.type === 'hybrid') && (
            <div className="space-y-2">
              <Label>Meeting Link</Label>
              <Input 
                placeholder="https://meet.example.com/..."
                value={formData.meetingLink}
                onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea 
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the meetup..."
              required
            />
          </div>
          <Button type="submit" className="w-full">Create Meetup</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState('submissions');
  const isAdmin = currentUser.role === 'admin';
  const isSpeaker = currentUser.role === 'speaker';

  const pendingSubmissions = allSubmissions.filter(s => s.status === 'pending');
  const reviewedSubmissions = allSubmissions.filter(s => s.status !== 'pending');

  const handleSubmissionAction = (submissionId: string, action: 'approve' | 'reject', points?: number, feedback?: string) => {
    toast.success(`Submission ${action}d${points ? ` with ${points} points` : ''}`);
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Admin Panel</h1>
              <p className="text-muted-foreground">Manage events, sprints, and submissions</p>
            </div>
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10 border-2 border-primary">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{currentUser.name}</p>
                <Badge variant="outline" className="text-xs capitalize">{currentUser.role}</Badge>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="glass-card">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-primary">{pendingSubmissions.length}</div>
                <p className="text-sm text-muted-foreground">Pending Reviews</p>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-green-500">{reviewedSubmissions.filter(s => s.status === 'approved').length}</div>
                <p className="text-sm text-muted-foreground">Approved</p>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-amber-500">{mockSprints.length}</div>
                <p className="text-sm text-muted-foreground">Total Sprints</p>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-blue-500">{mockMeetups.length}</div>
                <p className="text-sm text-muted-foreground">Total Meetups</p>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 flex-wrap">
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
                  <TabsTrigger value="participants" className="gap-2">
                    <Users className="h-4 w-4" />
                    Participants
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
                  <CardDescription>
                    Review and approve/reject submissions from participants
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingSubmissions.length === 0 ? (
                    <div className="text-center py-8">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <p className="text-muted-foreground">All caught up! No pending submissions.</p>
                    </div>
                  ) : (
                    pendingSubmissions.map(sub => (
                      <SubmissionReview 
                        key={sub.id} 
                        submission={sub} 
                        onAction={(action, points, feedback) => handleSubmissionAction(sub.id, action, points, feedback)}
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
                    <CreateSprintDialog />
                  </div>
                  <div className="space-y-4">
                    {mockSprints.map(sprint => (
                      <Card key={sprint.id} className="glass-card">
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-lg">{sprint.title}</h3>
                                <Badge variant={sprint.status === 'active' ? 'default' : 'secondary'} className="capitalize">
                                  {sprint.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{sprint.theme}</p>
                              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  {sprint.participants} participants
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {format(parseISO(sprint.startDate), 'MMM d')} - {format(parseISO(sprint.endDate), 'MMM d, yyyy')}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MessageSquare className="h-4 w-4" />
                                  {sprint.submissions.length} submissions
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <AddSessionDialog sprint={sprint} />
                              <SpeakerInviteDialog 
                                eventType="sprint" 
                                eventId={sprint.id} 
                                eventTitle={sprint.title}
                              />
                              <Button variant="outline" size="sm" className="gap-1">
                                <Eye className="h-4 w-4" />
                                View
                              </Button>
                              <Button variant="outline" size="sm" className="gap-1">
                                <Edit className="h-4 w-4" />
                                Edit
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="meetups">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Manage Meetups</h2>
                    <CreateMeetupDialog />
                  </div>
                  <div className="space-y-4">
                    {mockMeetups.map(meetup => (
                      <Card key={meetup.id} className="glass-card">
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-lg">{meetup.title}</h3>
                                <Badge variant={meetup.status === 'upcoming' ? 'default' : 'secondary'} className="capitalize">
                                  {meetup.status}
                                </Badge>
                                <Badge variant="outline" className="capitalize">
                                  {meetup.type}
                                </Badge>
                              </div>
                              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {format(parseISO(meetup.date), 'MMM d, yyyy')} at {meetup.time}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  {meetup.attendees}/{meetup.maxAttendees || '∞'} attendees
                                </span>
                                <span className="flex items-center gap-1">
                                  <User className="h-4 w-4" />
                                  {meetup.speakers.length} speakers
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <SpeakerInviteDialog 
                                eventType="meetup" 
                                eventId={meetup.id} 
                                eventTitle={meetup.title}
                              />
                              <Button variant="outline" size="sm" className="gap-1">
                                <Eye className="h-4 w-4" />
                                View
                              </Button>
                              <Button variant="outline" size="sm" className="gap-1">
                                <Edit className="h-4 w-4" />
                                Edit
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="participants">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Registered Participants
                      </CardTitle>
                      <CardDescription>
                        View all participants across sprints and meetups
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">
                          Participant management will be available when backend is connected.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
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
