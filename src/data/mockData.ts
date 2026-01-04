// Mock data for the AWS User Group website

export type UserRole = 'admin' | 'speaker' | 'participant';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  points: number;
  rank: number;
  badges: Badge[];
  joinedDate: string;
  bio?: string;
  role: UserRole;
  designation?: string;
  company?: string;
  linkedIn?: string;
  github?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate: string;
  category: 'sprint' | 'certification' | 'contribution' | 'special';
}

export interface Sprint {
  id: string;
  title: string;
  theme: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'completed';
  participants: number;
  sessions: Session[];
  submissions: Submission[];
  githubRepo?: string;
  registeredUsers: string[];
}

export interface Session {
  id: string;
  title: string;
  speaker: string;
  speakerId?: string;
  speakerPhoto?: string;
  speakerDesignation?: string;
  date: string;
  time: string;
  description: string;
  meetingLink?: string;
  recordingUrl?: string;
}

export interface Submission {
  id: string;
  sprintId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  blogUrl?: string;
  repoUrl?: string;
  description?: string;
  submittedAt: string;
  points: number;
  status: 'pending' | 'approved' | 'rejected';
  feedback?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface Meetup {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: 'virtual' | 'in-person' | 'hybrid';
  location?: string;
  meetingLink?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  attendees: number;
  maxAttendees?: number;
  registeredUsers: string[];
  speakers: MeetupSpeaker[];
  image?: string;
}

export interface MeetupSpeaker {
  id: string;
  userId?: string;
  name: string;
  photo: string;
  designation: string;
  company?: string;
  topic: string;
  bio?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  type: 'virtual' | 'in-person' | 'hybrid';
  category: 'sprint' | 'workshop' | 'meetup' | 'certification' | 'champs';
  attendees: number;
  image?: string;
  linkedEventId?: string; // Links to sprint/meetup id
}

export interface ForumPost {
  id: string;
  sprintId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  title: string;
  content: string;
  createdAt: string;
  replies: number;
  likes: number;
}

// Mock Users with roles
export const mockUsers: User[] = [
  {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@awsug.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    points: 5000,
    rank: 0,
    badges: [],
    joinedDate: '2023-01-01',
    bio: 'AWS User Group Administrator',
    role: 'admin',
    designation: 'Community Lead',
    company: 'AWS User Group'
  },
  {
    id: '1',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    points: 2450,
    rank: 1,
    badges: [],
    joinedDate: '2024-01-15',
    bio: 'Cloud enthusiast | AWS Community Builder',
    role: 'speaker',
    designation: 'Solutions Architect',
    company: 'Tech Corp',
    linkedIn: 'https://linkedin.com/in/priya',
    github: 'https://github.com/priya'
  },
  {
    id: '2',
    name: 'Rahul Verma',
    email: 'rahul@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
    points: 2100,
    rank: 2,
    badges: [],
    joinedDate: '2024-02-20',
    bio: 'DevOps Engineer | Serverless Advocate',
    role: 'speaker',
    designation: 'DevOps Lead',
    company: 'Cloud Solutions'
  },
  {
    id: '3',
    name: 'Ananya Patel',
    email: 'ananya@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya',
    points: 1890,
    rank: 3,
    badges: [],
    joinedDate: '2024-01-10',
    bio: 'Solutions Architect | Gen AI Explorer',
    role: 'participant',
    designation: 'Cloud Engineer'
  },
  {
    id: '4',
    name: 'Vikram Singh',
    email: 'vikram@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram',
    points: 1650,
    rank: 4,
    badges: [],
    joinedDate: '2024-03-05',
    role: 'participant'
  },
  {
    id: '5',
    name: 'Sneha Reddy',
    email: 'sneha@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha',
    points: 1420,
    rank: 5,
    badges: [],
    joinedDate: '2024-02-28',
    role: 'participant'
  },
  {
    id: '6',
    name: 'Arjun Nair',
    email: 'arjun@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun',
    points: 1200,
    rank: 6,
    badges: [],
    joinedDate: '2024-04-12',
    role: 'participant'
  },
  {
    id: '7',
    name: 'Kavitha Menon',
    email: 'kavitha@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kavitha',
    points: 980,
    rank: 7,
    badges: [],
    joinedDate: '2024-03-22',
    role: 'participant'
  },
  {
    id: '8',
    name: 'Deepak Kumar',
    email: 'deepak@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Deepak',
    points: 850,
    rank: 8,
    badges: [],
    joinedDate: '2024-05-01',
    role: 'participant'
  }
];

// Mock Badges
export const mockBadges: Badge[] = [
  {
    id: 'b1',
    name: 'Sprint Champion',
    description: 'Completed 5 skill sprints',
    icon: '🏆',
    earnedDate: '2024-06-15',
    category: 'sprint'
  },
  {
    id: 'b2',
    name: 'First Submission',
    description: 'Made your first sprint submission',
    icon: '🚀',
    earnedDate: '2024-03-20',
    category: 'sprint'
  },
  {
    id: 'b3',
    name: 'AWS Certified',
    description: 'Earned an AWS certification',
    icon: '📜',
    earnedDate: '2024-04-10',
    category: 'certification'
  },
  {
    id: 'b4',
    name: 'Community Helper',
    description: 'Helped 10 community members',
    icon: '🤝',
    earnedDate: '2024-05-25',
    category: 'contribution'
  },
  {
    id: 'b5',
    name: 'Blog Writer',
    description: 'Published 3 technical blogs',
    icon: '✍️',
    earnedDate: '2024-06-01',
    category: 'contribution'
  },
  {
    id: 'b6',
    name: 'Early Adopter',
    description: 'Joined in the first month',
    icon: '⭐',
    earnedDate: '2024-01-15',
    category: 'special'
  }
];

// Assign badges to users
mockUsers[1].badges = [mockBadges[0], mockBadges[2], mockBadges[4], mockBadges[5]];
mockUsers[2].badges = [mockBadges[1], mockBadges[3]];
mockUsers[3].badges = [mockBadges[0], mockBadges[1], mockBadges[2]];
mockUsers[4].badges = [mockBadges[1]];
mockUsers[5].badges = [mockBadges[1], mockBadges[4]];

// Mock Sprints
export const mockSprints: Sprint[] = [
  {
    id: 's1',
    title: 'Serverless January',
    theme: 'Serverless',
    description: 'Build scalable applications using AWS Lambda, API Gateway, and DynamoDB. Learn event-driven architecture patterns.',
    startDate: '2025-01-01',
    endDate: '2025-01-31',
    status: 'active',
    participants: 45,
    githubRepo: 'https://github.com/aws-ug/serverless-sprint-2025',
    registeredUsers: ['3', '4', '5', '6', '7', '8'],
    sessions: [
      {
        id: 'ses1',
        title: 'Introduction to Serverless Architecture',
        speaker: 'Priya Sharma',
        speakerId: '1',
        speakerPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
        speakerDesignation: 'Solutions Architect at Tech Corp',
        date: '2025-01-05',
        time: '18:00 IST',
        description: 'Learn the fundamentals of serverless computing and AWS Lambda.',
        meetingLink: 'https://meet.example.com/ses1'
      },
      {
        id: 'ses2',
        title: 'Building APIs with API Gateway',
        speaker: 'Rahul Verma',
        speakerId: '2',
        speakerPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
        speakerDesignation: 'DevOps Lead at Cloud Solutions',
        date: '2025-01-15',
        time: '18:00 IST',
        description: 'Deep dive into REST and WebSocket APIs using Amazon API Gateway.',
        meetingLink: 'https://meet.example.com/ses2'
      }
    ],
    submissions: [
      {
        id: 'sub1',
        sprintId: 's1',
        userId: '3',
        userName: 'Ananya Patel',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya',
        blogUrl: 'https://dev.to/ananya/serverless-journey',
        repoUrl: 'https://github.com/ananya/serverless-app',
        description: 'Built a complete serverless REST API with Lambda and DynamoDB',
        submittedAt: '2025-01-20',
        points: 100,
        status: 'approved',
        reviewedBy: 'admin1',
        reviewedAt: '2025-01-21'
      },
      {
        id: 'sub4',
        sprintId: 's1',
        userId: '5',
        userName: 'Sneha Reddy',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha',
        blogUrl: 'https://medium.com/@sneha/my-serverless-app',
        description: 'Created a serverless image processing pipeline',
        submittedAt: '2025-01-22',
        points: 0,
        status: 'pending'
      },
      {
        id: 'sub5',
        sprintId: 's1',
        userId: '6',
        userName: 'Arjun Nair',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun',
        repoUrl: 'https://github.com/arjun/lambda-functions',
        description: 'Lambda functions collection for various use cases',
        submittedAt: '2025-01-23',
        points: 0,
        status: 'pending'
      }
    ]
  },
  {
    id: 's2',
    title: 'GenAI February',
    theme: 'Generative AI',
    description: 'Explore Amazon Bedrock, build AI-powered applications, and learn prompt engineering best practices.',
    startDate: '2025-02-01',
    endDate: '2025-02-28',
    status: 'upcoming',
    participants: 32,
    registeredUsers: ['3', '4'],
    sessions: [
      {
        id: 'ses3',
        title: 'Getting Started with Amazon Bedrock',
        speaker: 'Ananya Patel',
        speakerId: '3',
        speakerPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya',
        speakerDesignation: 'Cloud Engineer',
        date: '2025-02-08',
        time: '18:00 IST',
        description: 'Introduction to foundation models and Amazon Bedrock.'
      }
    ],
    submissions: []
  },
  {
    id: 's3',
    title: 'Security December',
    theme: 'Security',
    description: 'Master AWS security services including IAM, KMS, and Security Hub. Build secure cloud architectures.',
    startDate: '2024-12-01',
    endDate: '2024-12-31',
    status: 'completed',
    participants: 38,
    githubRepo: 'https://github.com/aws-ug/security-sprint-2024',
    registeredUsers: ['1', '2', '3', '4', '5'],
    sessions: [
      {
        id: 'ses4',
        title: 'AWS IAM Deep Dive',
        speaker: 'Vikram Singh',
        speakerId: '4',
        speakerPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram',
        speakerDesignation: 'Security Specialist',
        date: '2024-12-10',
        time: '18:00 IST',
        description: 'Understanding IAM policies, roles, and best practices.',
        recordingUrl: 'https://youtube.com/watch?v=security-session'
      }
    ],
    submissions: [
      {
        id: 'sub2',
        sprintId: 's3',
        userId: '1',
        userName: 'Priya Sharma',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
        blogUrl: 'https://medium.com/@priya/aws-security-best-practices',
        description: 'Comprehensive guide to AWS security best practices',
        submittedAt: '2024-12-28',
        points: 150,
        status: 'approved',
        reviewedBy: 'admin1',
        reviewedAt: '2024-12-29'
      },
      {
        id: 'sub3',
        sprintId: 's3',
        userId: '2',
        userName: 'Rahul Verma',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
        repoUrl: 'https://github.com/rahul/secure-app',
        description: 'Secure application template with proper IAM configuration',
        submittedAt: '2024-12-25',
        points: 100,
        status: 'approved',
        reviewedBy: 'admin1',
        reviewedAt: '2024-12-26'
      }
    ]
  }
];

// Mock Meetups
export const mockMeetups: Meetup[] = [
  {
    id: 'm1',
    title: 'AWS re:Invent Recap 2024',
    description: 'Catch up on all the exciting announcements from AWS re:Invent 2024. Join us for a comprehensive overview of new services, features, and best practices.',
    date: '2024-12-15',
    time: '18:00 IST',
    type: 'hybrid',
    location: 'Tech Hub, Bangalore',
    meetingLink: 'https://meet.example.com/reinvent-recap',
    status: 'completed',
    attendees: 120,
    maxAttendees: 150,
    registeredUsers: ['1', '2', '3', '4', '5', '6'],
    speakers: [
      {
        id: 'ms1',
        userId: '1',
        name: 'Priya Sharma',
        photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
        designation: 'Solutions Architect',
        company: 'Tech Corp',
        topic: 'New Compute Services Overview',
        bio: 'AWS Community Builder with 5+ years of cloud experience'
      },
      {
        id: 'ms2',
        userId: '2',
        name: 'Rahul Verma',
        photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
        designation: 'DevOps Lead',
        company: 'Cloud Solutions',
        topic: 'Serverless Updates',
        bio: 'DevOps engineer specializing in AWS serverless'
      }
    ],
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop'
  },
  {
    id: 'm2',
    title: 'Hands-on Workshop: Container Services',
    description: 'Deep dive into ECS and EKS with hands-on labs. Learn container orchestration on AWS from industry experts.',
    date: '2025-01-25',
    time: '10:00 IST',
    type: 'in-person',
    location: 'AWS Office, Hyderabad',
    status: 'upcoming',
    attendees: 35,
    maxAttendees: 50,
    registeredUsers: ['3', '4', '5'],
    speakers: [
      {
        id: 'ms3',
        name: 'Karthik Iyer',
        photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Karthik',
        designation: 'Container Specialist',
        company: 'AWS',
        topic: 'ECS vs EKS: When to use what'
      }
    ],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=400&fit=crop'
  },
  {
    id: 'm3',
    title: 'AWS Community Day - Cloud Native',
    description: 'A full-day event dedicated to cloud native technologies. Multiple tracks covering containers, serverless, and microservices.',
    date: '2025-02-15',
    time: '09:00 IST',
    type: 'hybrid',
    location: 'Convention Center, Chennai',
    meetingLink: 'https://meet.example.com/community-day',
    status: 'upcoming',
    attendees: 85,
    maxAttendees: 200,
    registeredUsers: ['1', '2', '3'],
    speakers: [
      {
        id: 'ms4',
        userId: '1',
        name: 'Priya Sharma',
        photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
        designation: 'Solutions Architect',
        company: 'Tech Corp',
        topic: 'Microservices Architecture Patterns'
      }
    ],
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=400&fit=crop'
  },
  {
    id: 'm4',
    title: 'AWS Certification Study Group Kickoff',
    description: 'Weekly study group for Solutions Architect Associate certification. Join fellow learners and prepare together.',
    date: '2025-01-10',
    time: '19:00 IST',
    type: 'virtual',
    meetingLink: 'https://meet.example.com/study-group',
    status: 'upcoming',
    attendees: 28,
    maxAttendees: 40,
    registeredUsers: ['4', '5', '6', '7'],
    speakers: []
  }
];

// Mock Events (combined view for home page)
export const mockEvents: Event[] = [
  {
    id: 'e1',
    title: 'Serverless Sprint Kickoff',
    description: 'Join us for the January Serverless Sprint kickoff session. Learn about the challenge and get started!',
    date: '2025-01-05',
    time: '18:00 IST',
    type: 'virtual',
    category: 'sprint',
    attendees: 65,
    linkedEventId: 's1'
  },
  {
    id: 'e2',
    title: 'AWS re:Invent Recap',
    description: 'Catch up on all the exciting announcements from AWS re:Invent 2024.',
    date: '2024-12-15',
    time: '18:00 IST',
    type: 'hybrid',
    category: 'meetup',
    attendees: 120,
    linkedEventId: 'm1'
  },
  {
    id: 'e3',
    title: 'GenAI Sprint Kickoff',
    description: 'February GenAI Sprint begins! Build AI-powered applications with Amazon Bedrock.',
    date: '2025-02-01',
    time: '18:00 IST',
    type: 'virtual',
    category: 'sprint',
    attendees: 45,
    linkedEventId: 's2'
  },
  {
    id: 'e4',
    title: 'AWS Certification Study Group',
    description: 'Weekly study group for Solutions Architect Associate certification.',
    date: '2025-01-10',
    time: '19:00 IST',
    type: 'virtual',
    category: 'certification',
    attendees: 28,
    linkedEventId: 'm4'
  },
  {
    id: 'e5',
    title: 'Hands-on Workshop: Container Services',
    description: 'Deep dive into ECS and EKS with hands-on labs.',
    date: '2025-01-25',
    time: '10:00 IST',
    type: 'in-person',
    category: 'workshop',
    attendees: 35,
    linkedEventId: 'm2'
  },
  {
    id: 'e6',
    title: 'AWS Community Day - Cloud Native',
    description: 'A full-day event dedicated to cloud native technologies.',
    date: '2025-02-15',
    time: '09:00 IST',
    type: 'hybrid',
    category: 'meetup',
    attendees: 85,
    linkedEventId: 'm3'
  }
];

// Mock Forum Posts
export const mockForumPosts: ForumPost[] = [
  {
    id: 'f1',
    sprintId: 's1',
    userId: '3',
    userName: 'Ananya Patel',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya',
    title: 'Stuck with Lambda cold starts - any tips?',
    content: 'I am experiencing significant cold start times with my Lambda function. Has anyone found effective ways to reduce this?',
    createdAt: '2025-01-08',
    replies: 12,
    likes: 8
  },
  {
    id: 'f2',
    sprintId: 's1',
    userId: '2',
    userName: 'Rahul Verma',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
    title: 'Best practices for DynamoDB single-table design',
    content: 'Sharing my learnings from implementing single-table design in my sprint project...',
    createdAt: '2025-01-10',
    replies: 7,
    likes: 15
  },
  {
    id: 'f3',
    sprintId: 's1',
    userId: '1',
    userName: 'Priya Sharma',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    title: 'Sprint Challenge Hints - Week 2',
    content: 'Here are some hints for this weeks challenge. Remember to use Step Functions for orchestration!',
    createdAt: '2025-01-12',
    replies: 23,
    likes: 42
  }
];

// Current logged in user (for demo - can be switched between roles)
export const adminUser: User = mockUsers[0]; // Admin
export const speakerUser: User = mockUsers[1]; // Speaker (Priya)
export const participantUser: User = mockUsers[3]; // Participant (Vikram)

// Default current user - change this to test different roles
export const currentUser: User = adminUser;

// Helper function to get user by ID
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

// Helper to get event link based on category
export const getEventLink = (event: Event): string => {
  switch (event.category) {
    case 'sprint':
      return `/skill-sprint?id=${event.linkedEventId}`;
    case 'meetup':
    case 'workshop':
    case 'certification':
      return `/meetups?id=${event.linkedEventId}`;
    case 'champs':
      return '/college-champs';
    default:
      return '/';
  }
};
