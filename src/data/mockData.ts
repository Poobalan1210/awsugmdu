// Mock data for the AWS User Group website

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
}

export interface Session {
  id: string;
  title: string;
  speaker: string;
  date: string;
  time: string;
  description: string;
}

export interface Submission {
  id: string;
  userId: string;
  userName: string;
  blogUrl?: string;
  repoUrl?: string;
  submittedAt: string;
  points: number;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'virtual' | 'in-person' | 'hybrid';
  category: 'sprint' | 'workshop' | 'meetup' | 'certification';
  attendees: number;
  image?: string;
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

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    points: 2450,
    rank: 1,
    badges: [],
    joinedDate: '2024-01-15',
    bio: 'Cloud enthusiast | AWS Community Builder'
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
    bio: 'DevOps Engineer | Serverless Advocate'
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
    bio: 'Solutions Architect | Gen AI Explorer'
  },
  {
    id: '4',
    name: 'Vikram Singh',
    email: 'vikram@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram',
    points: 1650,
    rank: 4,
    badges: [],
    joinedDate: '2024-03-05'
  },
  {
    id: '5',
    name: 'Sneha Reddy',
    email: 'sneha@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha',
    points: 1420,
    rank: 5,
    badges: [],
    joinedDate: '2024-02-28'
  },
  {
    id: '6',
    name: 'Arjun Nair',
    email: 'arjun@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun',
    points: 1200,
    rank: 6,
    badges: [],
    joinedDate: '2024-04-12'
  },
  {
    id: '7',
    name: 'Kavitha Menon',
    email: 'kavitha@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kavitha',
    points: 980,
    rank: 7,
    badges: [],
    joinedDate: '2024-03-22'
  },
  {
    id: '8',
    name: 'Deepak Kumar',
    email: 'deepak@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Deepak',
    points: 850,
    rank: 8,
    badges: [],
    joinedDate: '2024-05-01'
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
mockUsers[0].badges = [mockBadges[0], mockBadges[2], mockBadges[4], mockBadges[5]];
mockUsers[1].badges = [mockBadges[1], mockBadges[3]];
mockUsers[2].badges = [mockBadges[0], mockBadges[1], mockBadges[2]];
mockUsers[3].badges = [mockBadges[1]];
mockUsers[4].badges = [mockBadges[1], mockBadges[4]];

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
    sessions: [
      {
        id: 'ses1',
        title: 'Introduction to Serverless Architecture',
        speaker: 'Priya Sharma',
        date: '2025-01-05',
        time: '18:00 IST',
        description: 'Learn the fundamentals of serverless computing and AWS Lambda.'
      },
      {
        id: 'ses2',
        title: 'Building APIs with API Gateway',
        speaker: 'Rahul Verma',
        date: '2025-01-15',
        time: '18:00 IST',
        description: 'Deep dive into REST and WebSocket APIs using Amazon API Gateway.'
      }
    ],
    submissions: [
      {
        id: 'sub1',
        userId: '3',
        userName: 'Ananya Patel',
        blogUrl: 'https://dev.to/ananya/serverless-journey',
        repoUrl: 'https://github.com/ananya/serverless-app',
        submittedAt: '2025-01-20',
        points: 100,
        status: 'approved'
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
    sessions: [
      {
        id: 'ses3',
        title: 'Getting Started with Amazon Bedrock',
        speaker: 'Ananya Patel',
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
    sessions: [
      {
        id: 'ses4',
        title: 'AWS IAM Deep Dive',
        speaker: 'Vikram Singh',
        date: '2024-12-10',
        time: '18:00 IST',
        description: 'Understanding IAM policies, roles, and best practices.'
      }
    ],
    submissions: [
      {
        id: 'sub2',
        userId: '1',
        userName: 'Priya Sharma',
        blogUrl: 'https://medium.com/@priya/aws-security-best-practices',
        submittedAt: '2024-12-28',
        points: 150,
        status: 'approved'
      },
      {
        id: 'sub3',
        userId: '2',
        userName: 'Rahul Verma',
        repoUrl: 'https://github.com/rahul/secure-app',
        submittedAt: '2024-12-25',
        points: 100,
        status: 'approved'
      }
    ]
  }
];

// Mock Events
export const mockEvents: Event[] = [
  {
    id: 'e1',
    title: 'Serverless Sprint Kickoff',
    description: 'Join us for the January Serverless Sprint kickoff session. Learn about the challenge and get started!',
    date: '2025-01-05',
    type: 'virtual',
    category: 'sprint',
    attendees: 65
  },
  {
    id: 'e2',
    title: 'AWS re:Invent Recap',
    description: 'Catch up on all the exciting announcements from AWS re:Invent 2024.',
    date: '2024-12-15',
    type: 'hybrid',
    category: 'meetup',
    attendees: 120
  },
  {
    id: 'e3',
    title: 'GenAI Sprint Kickoff',
    description: 'February GenAI Sprint begins! Build AI-powered applications with Amazon Bedrock.',
    date: '2025-02-01',
    type: 'virtual',
    category: 'sprint',
    attendees: 45
  },
  {
    id: 'e4',
    title: 'AWS Certification Study Group',
    description: 'Weekly study group for Solutions Architect Associate certification.',
    date: '2025-01-10',
    type: 'virtual',
    category: 'certification',
    attendees: 28
  },
  {
    id: 'e5',
    title: 'Hands-on Workshop: Container Services',
    description: 'Deep dive into ECS and EKS with hands-on labs.',
    date: '2025-01-25',
    type: 'in-person',
    category: 'workshop',
    attendees: 35
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

// Current logged in user (for demo)
export const currentUser: User = {
  ...mockUsers[0],
  badges: mockBadges.slice(0, 4)
};
