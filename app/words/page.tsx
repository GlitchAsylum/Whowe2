'use client';
import UserCard from '@/app/ui/components/WordsUserCard';
import Link from 'next/link';

// Sample data for demonstration
const users = [
  {
    id: 1,
    name: 'Trevor Lukanen',
    city: 'Seattle',
    state: 'WA',
    country: 'USA',
    comment: 'I absolutely love this platform! The user interface is intuitive, and the features are robust. I’ve been using it for weeks, and it has significantly improved my workflow. Highly recommend to anyone looking for a seamless experience. The community support is also fantastic, always ready to help with any questions. Can’t wait to see what new features are added in the future!',
  },
  {
    id: 2,
    name: 'Yeng Lukanen',
    city: 'Portland',
    state: 'OR',
    country: 'USA',
    comment: 'I absolutely love this platform! The user interface is intuitive, and the features are robust. I’ve been using it for weeks, and it has significantly improved my workflow. Highly recommend to anyone looking for a seamless experience. The community support is also fantastic, always ready to help with any questions. Can’t wait to see what new features are added in the future!',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    city: 'Toronto',
    state: 'ON',
    country: 'Canada',
    comment: 'I absolutely love this platform! The user interface is intuitive, and the features are robust. I’ve been using it for weeks, and it has significantly improved my workflow. Highly recommend to anyone looking for a seamless experience. The community support is also fantastic, always ready to help with any questions. Can’t wait to see what new features are added in the future!',
  },
  {
    id: 4,
    name: 'Bob Smith',
    city: 'Austin',
    state: 'TX',
    country: 'USA',
    comment: 'Great tool, but there’s a slight learning curve. Once you get the hang of it, it’s super powerful. I’ve used it for multiple projects, and it handles everything I throw at it. The only thing I’d suggest is more detailed documentation for beginners. Overall, a solid choice for professionals.',
  },
  {
    id: 5,
    name: 'Clara Davis',
    city: 'Vancouver',
    state: 'BC',
    country: 'Canada',
    comment: 'This has been a game-changer for my team. We’ve streamlined our processes and saved so much time. The collaboration features are top-notch, and the performance is reliable. I did encounter a small bug, but the support team resolved it quickly. Definitely worth trying out if you’re looking to boost productivity.',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[var{--background}] py-10">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-4">Words for the World</h1>
        <div className="flex justify-center mb-8">
          <Link href="/register">
            <button className="px-6 py-3 bg-white/6 backdrop-blur-md border border-white/12 rounded-sm text-white font-semibold hover:bg-white/12 transition-all duration-300">
              I HAVE SOMETHING TO SAY
            </button>
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
          {users.map((user) => (
            <UserCard
              key={user.id}
              name={user.name}
              city={user.city}
              state={user.state}
              country={user.country}
              comment={user.comment}
            />
          ))}
        </div>
      </div>
    </div>
  );
}