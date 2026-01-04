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
  twitter?: string;
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
  posterImage?: string;
}

export interface Session {
  id: string;
  title: string;
  speaker: string;
  speakerId?: string;
  speakerPhoto?: string;
  speakerDesignation?: string;
  speakerCompany?: string;
  speakerBio?: string;
  speakerLinkedIn?: string;
  date: string;
  time: string;
  duration?: string;
  description: string;
  agenda?: string[];
  meetingLink?: string;
  recordingUrl?: string;
  slidesUrl?: string;
  posterImage?: string;
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
  uniqueLink?: string;
  userId?: string;
  name: string;
  photo: string;
  designation: string;
  company?: string;
  topic: string;
  bio?: string;
  linkedIn?: string;
  sessionDetails?: string;
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
  linkedEventId?: string;
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
  replies: ForumReply[];
  likes: number;
}

export interface ForumReply {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface CertificationGroup {
  id: string;
  name: string;
  level: 'Foundational' | 'Associate' | 'Professional' | 'Specialty';
  description: string;
  members: string[];
  owners: string[];
  color: string;
  scheduledSessions: GroupSession[];
  messages: GroupMessage[];
}

export interface GroupSession {
  id: string;
  groupId: string;
  title: string;
  description: string;
  date: string;
  time: string;
  hostId: string;
  hostName: string;
  meetingLink?: string;
}

export interface GroupMessage {
  id: string;
  groupId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
  replies: GroupReply[];
  likes: number;
  isPinned?: boolean;
}

export interface GroupReply {
  id: string;
  messageId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface SpeakerInvite {
  id: string;
  eventType: 'sprint' | 'meetup';
  eventId: string;
  uniqueLink: string;
  email?: string;
  status: 'pending' | 'accepted' | 'expired';
  createdAt: string;
  expiresAt: string;
}

// Mock Users with roles - 5 users with rich profiles
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
    bio: 'AWS User Group Administrator. Passionate about building developer communities and fostering cloud adoption.',
    role: 'admin',
    designation: 'Community Lead',
    company: 'AWS User Group',
    linkedIn: 'https://linkedin.com/in/admin',
    github: 'https://github.com/admin',
    twitter: 'https://twitter.com/admin'
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
    bio: 'Cloud enthusiast and AWS Community Builder. I love building serverless applications and sharing knowledge through technical blogs and talks.',
    role: 'speaker',
    designation: 'Solutions Architect',
    company: 'Tech Corp',
    linkedIn: 'https://linkedin.com/in/priya-sharma',
    github: 'https://github.com/priya-sharma',
    twitter: 'https://twitter.com/priyasharma'
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
    bio: 'DevOps Engineer with expertise in AWS, Kubernetes, and CI/CD pipelines. Serverless advocate and open source contributor.',
    role: 'speaker',
    designation: 'DevOps Lead',
    company: 'Cloud Solutions Inc',
    linkedIn: 'https://linkedin.com/in/rahul-verma',
    github: 'https://github.com/rahul-verma'
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
    bio: 'Solutions Architect exploring the frontiers of Generative AI on AWS. 3x AWS Certified. Regular speaker at tech meetups.',
    role: 'participant',
    designation: 'Cloud Engineer',
    company: 'DataFlow Systems',
    linkedIn: 'https://linkedin.com/in/ananya-patel',
    github: 'https://github.com/ananya-patel'
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
    bio: 'Security specialist focusing on AWS IAM, KMS, and compliance. Helping organizations build secure cloud architectures.',
    role: 'participant',
    designation: 'Security Consultant',
    company: 'SecureCloud Ltd',
    linkedIn: 'https://linkedin.com/in/vikram-singh'
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
    bio: 'Full-stack developer transitioning to cloud. Active learner and blogger sharing my AWS journey.',
    role: 'participant',
    designation: 'Software Engineer',
    company: 'StartupXYZ',
    linkedIn: 'https://linkedin.com/in/sneha-reddy',
    github: 'https://github.com/sneha-reddy',
    twitter: 'https://twitter.com/snehareddy'
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
    role: 'participant',
    bio: 'Backend developer learning AWS. Interested in microservices and container orchestration.',
    designation: 'Backend Developer',
    company: 'TechStartup'
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
    role: 'participant',
    bio: 'Data Engineer working with AWS data services. Love exploring new ways to process big data.',
    designation: 'Data Engineer',
    company: 'Analytics Co'
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
    role: 'participant',
    bio: 'Cloud enthusiast and student. Preparing for AWS Solutions Architect certification.',
    designation: 'Student',
    company: 'University of Technology'
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
  },
  {
    id: 'b7',
    name: 'Speaker Star',
    description: 'Delivered 3 sessions',
    icon: '🎤',
    earnedDate: '2024-07-01',
    category: 'contribution'
  },
  {
    id: 'b8',
    name: 'Security Expert',
    description: 'Completed Security Sprint',
    icon: '🔒',
    earnedDate: '2024-12-31',
    category: 'sprint'
  }
];

// Assign badges to users with more variety
mockUsers[0].badges = [mockBadges[5], mockBadges[6]]; // Admin
mockUsers[1].badges = [mockBadges[0], mockBadges[2], mockBadges[4], mockBadges[5], mockBadges[6]]; // Priya
mockUsers[2].badges = [mockBadges[1], mockBadges[3], mockBadges[7]]; // Rahul
mockUsers[3].badges = [mockBadges[0], mockBadges[1], mockBadges[2], mockBadges[4]]; // Ananya
mockUsers[4].badges = [mockBadges[1], mockBadges[7]]; // Vikram
mockUsers[5].badges = [mockBadges[1], mockBadges[4]]; // Sneha

// Mock Sprints
export const mockSprints: Sprint[] = [
  {
    id: 's1',
    title: 'Serverless January',
    theme: 'Serverless',
    description: 'Build scalable applications using AWS Lambda, API Gateway, and DynamoDB. Learn event-driven architecture patterns and best practices for serverless development.',
    startDate: '2025-01-01',
    endDate: '2025-01-31',
    status: 'active',
    participants: 45,
    githubRepo: 'https://github.com/aws-ug/serverless-sprint-2025',
    registeredUsers: ['3', '4', '5', '6', '7', '8'],
    posterImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
    sessions: [
      {
        id: 'ses1',
        title: 'Introduction to Serverless Architecture',
        speaker: 'Priya Sharma',
        speakerId: '1',
        speakerPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
        speakerDesignation: 'Solutions Architect',
        speakerCompany: 'Tech Corp',
        speakerBio: 'AWS Community Builder with 5+ years of experience building serverless applications at scale.',
        speakerLinkedIn: 'https://linkedin.com/in/priya-sharma',
        date: '2025-01-05',
        time: '18:00 IST',
        duration: '90 minutes',
        description: 'Learn the fundamentals of serverless computing and AWS Lambda. We will cover the basics of event-driven architecture and how to build your first Lambda function.',
        agenda: [
          'What is Serverless Computing?',
          'AWS Lambda fundamentals',
          'Event-driven architecture patterns',
          'Hands-on: Your first Lambda function',
          'Q&A session'
        ],
        meetingLink: 'https://meet.example.com/ses1',
        posterImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=300&fit=crop'
      },
      {
        id: 'ses2',
        title: 'Building APIs with API Gateway',
        speaker: 'Rahul Verma',
        speakerId: '2',
        speakerPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
        speakerDesignation: 'DevOps Lead',
        speakerCompany: 'Cloud Solutions Inc',
        speakerBio: 'DevOps engineer specializing in AWS serverless and container orchestration.',
        speakerLinkedIn: 'https://linkedin.com/in/rahul-verma',
        date: '2025-01-15',
        time: '18:00 IST',
        duration: '90 minutes',
        description: 'Deep dive into REST and WebSocket APIs using Amazon API Gateway. Learn how to create, deploy, and manage APIs at scale.',
        agenda: [
          'API Gateway Overview',
          'REST vs WebSocket APIs',
          'Integration with Lambda',
          'Authentication and Authorization',
          'Best practices and cost optimization'
        ],
        meetingLink: 'https://meet.example.com/ses2',
        posterImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=300&fit=crop'
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
        description: 'Built a complete serverless REST API with Lambda and DynamoDB for a task management application.',
        submittedAt: '2025-01-20',
        points: 100,
        status: 'approved',
        feedback: 'Great work! Well-structured code and excellent documentation.',
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
        description: 'Created a serverless image processing pipeline using S3 triggers and Lambda.',
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
        description: 'Lambda functions collection for various use cases including file processing and notifications.',
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
    description: 'Explore Amazon Bedrock, build AI-powered applications, and learn prompt engineering best practices. Get hands-on experience with foundation models.',
    startDate: '2025-02-01',
    endDate: '2025-02-28',
    status: 'upcoming',
    participants: 32,
    registeredUsers: ['3', '4'],
    posterImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    sessions: [
      {
        id: 'ses3',
        title: 'Getting Started with Amazon Bedrock',
        speaker: 'Ananya Patel',
        speakerId: '3',
        speakerPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya',
        speakerDesignation: 'Cloud Engineer',
        speakerCompany: 'DataFlow Systems',
        speakerBio: 'Solutions Architect with a passion for AI/ML and cloud technologies.',
        date: '2025-02-08',
        time: '18:00 IST',
        duration: '90 minutes',
        description: 'Introduction to foundation models and Amazon Bedrock. Learn how to integrate AI capabilities into your applications.',
        agenda: [
          'Introduction to Generative AI',
          'Amazon Bedrock Overview',
          'Available Foundation Models',
          'Hands-on: Your first Bedrock app',
          'Prompt Engineering basics'
        ],
        posterImage: 'https://images.unsplash.com/photo-1676299081847-824916de030a?w=600&h=300&fit=crop'
      }
    ],
    submissions: []
  },
  {
    id: 's3',
    title: 'Security December',
    theme: 'Security',
    description: 'Master AWS security services including IAM, KMS, and Security Hub. Build secure cloud architectures and learn compliance best practices.',
    startDate: '2024-12-01',
    endDate: '2024-12-31',
    status: 'completed',
    participants: 38,
    githubRepo: 'https://github.com/aws-ug/security-sprint-2024',
    registeredUsers: ['1', '2', '3', '4', '5'],
    posterImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=400&fit=crop',
    sessions: [
      {
        id: 'ses4',
        title: 'AWS IAM Deep Dive',
        speaker: 'Vikram Singh',
        speakerId: '4',
        speakerPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram',
        speakerDesignation: 'Security Consultant',
        speakerCompany: 'SecureCloud Ltd',
        speakerBio: 'Security specialist with expertise in AWS IAM, KMS, and compliance frameworks.',
        date: '2024-12-10',
        time: '18:00 IST',
        duration: '120 minutes',
        description: 'Understanding IAM policies, roles, and best practices for secure AWS architectures.',
        agenda: [
          'IAM Fundamentals',
          'Policy deep dive',
          'Roles and cross-account access',
          'Best practices',
          'Common pitfalls to avoid'
        ],
        recordingUrl: 'https://youtube.com/watch?v=security-session',
        posterImage: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=300&fit=crop'
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
        description: 'Comprehensive guide to AWS security best practices covering IAM, encryption, and network security.',
        submittedAt: '2024-12-28',
        points: 150,
        status: 'approved',
        feedback: 'Excellent detailed guide! Very comprehensive.',
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
        description: 'Secure application template with proper IAM configuration, encryption at rest, and network isolation.',
        submittedAt: '2024-12-25',
        points: 100,
        status: 'approved',
        feedback: 'Great template! Well-documented.',
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
    description: 'Catch up on all the exciting announcements from AWS re:Invent 2024. Join us for a comprehensive overview of new services, features, and best practices shared at the event.',
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
        bio: 'AWS Community Builder with 5+ years of cloud experience',
        linkedIn: 'https://linkedin.com/in/priya-sharma',
        sessionDetails: 'Covering EC2 updates, Lambda enhancements, and new container services announced at re:Invent.'
      },
      {
        id: 'ms2',
        userId: '2',
        name: 'Rahul Verma',
        photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
        designation: 'DevOps Lead',
        company: 'Cloud Solutions Inc',
        topic: 'Serverless Updates and Lambda SnapStart',
        bio: 'DevOps engineer specializing in AWS serverless',
        linkedIn: 'https://linkedin.com/in/rahul-verma',
        sessionDetails: 'Deep dive into Lambda SnapStart, new runtime support, and serverless best practices.'
      }
    ],
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop'
  },
  {
    id: 'm2',
    title: 'Hands-on Workshop: Container Services',
    description: 'Deep dive into ECS and EKS with hands-on labs. Learn container orchestration on AWS from industry experts. Bring your laptop!',
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
        topic: 'ECS vs EKS: When to use what',
        bio: 'AWS Container Hero helping teams adopt containerization',
        sessionDetails: 'Comprehensive comparison of ECS and EKS with real-world use cases and hands-on exercises.'
      }
    ],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=400&fit=crop'
  },
  {
    id: 'm3',
    title: 'AWS Community Day - Cloud Native',
    description: 'A full-day event dedicated to cloud native technologies. Multiple tracks covering containers, serverless, and microservices. Networking opportunities included!',
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
        topic: 'Microservices Architecture Patterns',
        bio: 'AWS Community Builder with expertise in distributed systems',
        linkedIn: 'https://linkedin.com/in/priya-sharma'
      }
    ],
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=400&fit=crop'
  },
  {
    id: 'm4',
    title: 'AWS Certification Study Group Kickoff',
    description: 'Weekly study group for Solutions Architect Associate certification. Join fellow learners and prepare together with structured study materials.',
    date: '2025-01-10',
    time: '19:00 IST',
    type: 'virtual',
    meetingLink: 'https://meet.example.com/study-group',
    status: 'upcoming',
    attendees: 28,
    maxAttendees: 40,
    registeredUsers: ['4', '5', '6', '7'],
    speakers: [],
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop'
  }
];

// Mock Speaker Invites
export const mockSpeakerInvites: SpeakerInvite[] = [
  {
    id: 'inv1',
    eventType: 'sprint',
    eventId: 's2',
    uniqueLink: 'speaker-invite-abc123',
    email: 'speaker@example.com',
    status: 'pending',
    createdAt: '2025-01-15',
    expiresAt: '2025-02-01'
  }
];

// Generate unified events from sprints and meetups for home page
export const mockEvents: Event[] = [
  // Sprint Sessions
  {
    id: 'e1',
    title: 'Introduction to Serverless Architecture',
    description: 'Learn the fundamentals of serverless computing and AWS Lambda with Priya Sharma.',
    date: '2025-01-05',
    time: '18:00 IST',
    type: 'virtual',
    category: 'sprint',
    attendees: 45,
    linkedEventId: 's1',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop'
  },
  {
    id: 'e8',
    title: 'Building APIs with API Gateway',
    description: 'Deep dive into REST and WebSocket APIs using Amazon API Gateway with Rahul Verma.',
    date: '2025-01-15',
    time: '18:00 IST',
    type: 'virtual',
    category: 'sprint',
    attendees: 42,
    linkedEventId: 's1',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=400&fit=crop'
  },
  {
    id: 'e2',
    title: 'AWS re:Invent Recap 2024',
    description: 'Catch up on all the exciting announcements from AWS re:Invent 2024.',
    date: '2024-12-15',
    time: '18:00 IST',
    type: 'hybrid',
    category: 'meetup',
    attendees: 120,
    linkedEventId: 'm1',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop'
  },
  {
    id: 'e3',
    title: 'Getting Started with Amazon Bedrock',
    description: 'Introduction to foundation models and Amazon Bedrock. Build AI-powered apps!',
    date: '2025-02-08',
    time: '18:00 IST',
    type: 'virtual',
    category: 'sprint',
    attendees: 32,
    linkedEventId: 's2',
    image: 'https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&h=400&fit=crop'
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
    linkedEventId: 'm4',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop'
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
    linkedEventId: 'm2',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=400&fit=crop'
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
    linkedEventId: 'm3',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=400&fit=crop'
  },
  {
    id: 'e7',
    title: 'AWS IAM Deep Dive',
    description: 'Understanding IAM policies, roles, and best practices for secure AWS architectures.',
    date: '2024-12-10',
    time: '18:00 IST',
    type: 'virtual',
    category: 'sprint',
    attendees: 38,
    linkedEventId: 's3',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop'
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
    content: 'I am experiencing significant cold start times with my Lambda function. Has anyone found effective ways to reduce this? I have tried provisioned concurrency but it is expensive for my use case.',
    createdAt: '2025-01-08',
    replies: [
      { id: 'r1', postId: 'f1', userId: '2', userName: 'Rahul Verma', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul', content: 'Try using SnapStart if you are using Java! It reduces cold starts significantly.', createdAt: '2025-01-08', likes: 5 },
      { id: 'r2', postId: 'f1', userId: '1', userName: 'Priya Sharma', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya', content: 'Keep your package size small - only include what you need. Also consider using layers for shared dependencies.', createdAt: '2025-01-09', likes: 3 }
    ],
    likes: 8
  },
  {
    id: 'f2',
    sprintId: 's1',
    userId: '2',
    userName: 'Rahul Verma',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
    title: 'Best practices for DynamoDB single-table design',
    content: 'Sharing my learnings from implementing single-table design in my sprint project. Key takeaway: access patterns first, then model your data!',
    createdAt: '2025-01-10',
    replies: [
      { id: 'r3', postId: 'f2', userId: '3', userName: 'Ananya Patel', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya', content: 'Great tips! I found the access pattern analysis really helpful.', createdAt: '2025-01-10', likes: 2 }
    ],
    likes: 15
  },
  {
    id: 'f3',
    sprintId: 's1',
    userId: '1',
    userName: 'Priya Sharma',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    title: 'Sprint Challenge Hints - Week 2',
    content: 'Here are some hints for this week\'s challenge. Remember to use Step Functions for orchestration! Also check out the new EventBridge Scheduler for time-based workflows.',
    createdAt: '2025-01-12',
    replies: [],
    likes: 42
  }
];

// Mock Certification Groups
export const mockCertificationGroups: CertificationGroup[] = [
  {
    id: 'cg1',
    name: 'Cloud Practitioner',
    level: 'Foundational',
    description: 'Start your AWS journey here! Perfect for beginners looking to understand cloud concepts.',
    members: ['3', '4', '5', '6', '7', '8'],
    owners: ['1', 'admin1'],
    color: 'bg-green-500/10 text-green-600 border-green-500/30',
    scheduledSessions: [
      { id: 'gs1', groupId: 'cg1', title: 'Weekly Study Session', description: 'Going through Domain 1: Cloud Concepts', date: '2025-01-18', time: '19:00 IST', hostId: '1', hostName: 'Priya Sharma', meetingLink: 'https://meet.example.com/cp-study' }
    ],
    messages: [
      { id: 'gm1', groupId: 'cg1', userId: '1', userName: 'Priya Sharma', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya', content: 'Welcome everyone! Let us use this channel to discuss Cloud Practitioner exam prep. Share resources, ask questions, and support each other!', createdAt: '2025-01-01', replies: [
        { id: 'gr1', messageId: 'gm1', userId: '5', userName: 'Sneha Reddy', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha', content: 'Thanks for setting this up! Super helpful.', createdAt: '2025-01-01', likes: 3 }
      ], likes: 12, isPinned: true },
      { id: 'gm2', groupId: 'cg1', userId: '6', userName: 'Arjun Nair', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun', content: 'Anyone have good resources for understanding the shared responsibility model?', createdAt: '2025-01-05', replies: [
        { id: 'gr2', messageId: 'gm2', userId: '1', userName: 'Priya Sharma', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya', content: 'Check out the AWS Well-Architected Framework whitepaper. It explains this really well!', createdAt: '2025-01-05', likes: 5 },
        { id: 'gr3', messageId: 'gm2', userId: '3', userName: 'Ananya Patel', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya', content: 'Also Stephane Maarek has a great video on this topic.', createdAt: '2025-01-05', likes: 4 }
      ], likes: 6 }
    ]
  },
  {
    id: 'cg2',
    name: 'Solutions Architect Associate',
    level: 'Associate',
    description: 'Design distributed systems on AWS. Most popular certification for architects and developers.',
    members: ['1', '2', '3', '4', '5'],
    owners: ['2', 'admin1'],
    color: 'bg-blue-500/10 text-blue-600 border-blue-500/30',
    scheduledSessions: [
      { id: 'gs2', groupId: 'cg2', title: 'Practice Exam Review', description: 'Reviewing answers from practice test #3', date: '2025-01-20', time: '18:00 IST', hostId: '2', hostName: 'Rahul Verma' }
    ],
    messages: [
      { id: 'gm3', groupId: 'cg2', userId: '2', userName: 'Rahul Verma', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul', content: 'This week we are focusing on VPC and networking concepts. Make sure to understand VPC peering vs Transit Gateway!', createdAt: '2025-01-10', replies: [], likes: 8, isPinned: true }
    ]
  },
  {
    id: 'cg3',
    name: 'Developer Associate',
    level: 'Associate',
    description: 'Focus on developing and maintaining AWS applications. Great for developers.',
    members: ['2', '3', '5', '6'],
    owners: ['1'],
    color: 'bg-blue-500/10 text-blue-600 border-blue-500/30',
    scheduledSessions: [],
    messages: [
      { id: 'gm4', groupId: 'cg3', userId: '5', userName: 'Sneha Reddy', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha', content: 'Just passed my DVA-C02! Happy to share my study notes.', createdAt: '2025-01-08', replies: [
        { id: 'gr4', messageId: 'gm4', userId: '6', userName: 'Arjun Nair', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun', content: 'Congrats! Would love to see your notes!', createdAt: '2025-01-08', likes: 2 }
      ], likes: 15 }
    ]
  },
  {
    id: 'cg4',
    name: 'SysOps Administrator',
    level: 'Associate',
    description: 'Operations and deployment on AWS. Perfect for sysadmins transitioning to cloud.',
    members: ['2', '4', '7'],
    owners: ['admin1'],
    color: 'bg-blue-500/10 text-blue-600 border-blue-500/30',
    scheduledSessions: [],
    messages: []
  },
  {
    id: 'cg5',
    name: 'Solutions Architect Professional',
    level: 'Professional',
    description: 'Advanced architectural concepts. Recommended after SAA certification.',
    members: ['1', '2'],
    owners: ['1'],
    color: 'bg-purple-500/10 text-purple-600 border-purple-500/30',
    scheduledSessions: [
      { id: 'gs3', groupId: 'cg5', title: 'Case Study Deep Dive', description: 'Analyzing complex architecture scenarios', date: '2025-01-25', time: '20:00 IST', hostId: '1', hostName: 'Priya Sharma' }
    ],
    messages: []
  },
  {
    id: 'cg6',
    name: 'DevOps Engineer Professional',
    level: 'Professional',
    description: 'CI/CD and automation on AWS. Combines development and operations expertise.',
    members: ['2'],
    owners: ['2'],
    color: 'bg-purple-500/10 text-purple-600 border-purple-500/30',
    scheduledSessions: [],
    messages: []
  }
];

// Current logged in user (for demo - can be switched between roles)
export const adminUser: User = mockUsers[0]; // Admin
export const speakerUser: User = mockUsers[1]; // Speaker (Priya)
export const participantUser: User = mockUsers[3]; // Participant (Ananya)

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

// Generate unique speaker invite link
export const generateSpeakerInviteLink = (eventType: 'sprint' | 'meetup', eventId: string): string => {
  const uniqueId = Math.random().toString(36).substring(2, 15);
  return `speaker-invite-${eventType}-${eventId}-${uniqueId}`;
};
