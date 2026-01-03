import { Link } from 'react-router-dom';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockUsers } from '@/data/mockData';

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-5 w-5 text-yellow-500" />;
    case 2:
      return <Medal className="h-5 w-5 text-gray-400" />;
    case 3:
      return <Award className="h-5 w-5 text-amber-600" />;
    default:
      return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
  }
};

const getRankStyle = (rank: number) => {
  switch (rank) {
    case 1:
      return 'bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border-yellow-500/30';
    case 2:
      return 'bg-gradient-to-r from-gray-300/10 to-gray-400/10 border-gray-400/30';
    case 3:
      return 'bg-gradient-to-r from-amber-500/10 to-amber-600/10 border-amber-600/30';
    default:
      return 'hover:bg-muted/50';
  }
};

export function Leaderboard() {
  const topUsers = mockUsers.slice(0, 8);

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Community Leaderboard
          </CardTitle>
          <Link 
            to="/leaderboard" 
            className="text-sm text-primary hover:underline"
          >
            View all
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {topUsers.map((user) => (
            <div
              key={user.id}
              className={`flex items-center gap-4 p-3 rounded-lg border transition-all ${getRankStyle(user.rank)}`}
            >
              <div className="flex items-center justify-center w-8">
                {getRankIcon(user.rank)}
              </div>
              <Avatar className="h-10 w-10 border-2 border-border">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground">
                  {user.badges.length} badges earned
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">{user.points.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">points</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
