import React, { useState, useEffect } from 'react';
import { Users, Heart, MessageCircle, Send, Plus } from 'lucide-react';

interface CommunityPost {
  id: string;
  text: string;
  author: string;
  timestamp: Date;
  reactions: {
    felt: number;
    helped: number;
  };
  comments: Comment[];
}

interface Comment {
  id: string;
  text: string;
  author: string;
  timestamp: Date;
}

export const FeelLessAlone: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [newPost, setNewPost] = useState('');
  const [showPostForm, setShowPostForm] = useState(false);
  const [commentTexts, setCommentTexts] = useState<{[key: string]: string}>({});
  const [showComments, setShowComments] = useState<{[key: string]: boolean}>({});

  // Generate cute anonymous names
  const generateAnonymousName = () => {
    const adjectives = ['sleepy', 'gentle', 'wandering', 'quiet', 'soft', 'dreamy', 'cozy', 'tender', 'peaceful', 'starry'];
    const nouns = ['soul', 'bean', 'heart', 'wanderer', 'dreamer', 'spirit', 'moon', 'star', 'flower', 'cloud'];
    const numbers = Math.floor(Math.random() * 999) + 1;
    
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    
    return `${adj} ${noun} #${numbers}`;
  };

  // Sample posts to start with
  const initialPosts: CommunityPost[] = [
    {
      id: '1',
      text: "lol telling myself 'future me will handle it' is why my life's a mess rn. but hey. future me's a champ.",
      author: 'anonymous soul #238',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      reactions: { felt: 12, helped: 3 },
      comments: [
        {
          id: 'c1',
          text: "felt. future me has a bigger backpack.",
          author: 'anonymous wanderer',
          timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000)
        },
        {
          id: 'c2',
          text: "sending you a gentle head bump.",
          author: '🌸 sleepy bean',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000)
        }
      ]
    },
    {
      id: '2',
      text: "3am anxiety brain: 'remember that thing you said in 2019?' me: 'no please' brain: 'let's analyze it for 3 hours' 😭",
      author: 'overthinking moon #492',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      reactions: { felt: 28, helped: 1 },
      comments: [
        {
          id: 'c3',
          text: "why is 3am brain so MEAN",
          author: 'tired star #156',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000)
        }
      ]
    },
    {
      id: '3',
      text: "started naming my plants and having full conversations with them. they're honestly better listeners than most humans 🌱",
      author: 'plant parent #67',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      reactions: { felt: 8, helped: 15 },
      comments: []
    },
    {
      id: '4',
      text: "that feeling when you want to text someone but don't want to be 'too much' so you just... don't. and then feel worse. 💔",
      author: 'gentle heart #891',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      reactions: { felt: 34, helped: 2 },
      comments: [
        {
          id: 'c4',
          text: "you're not too much. you're exactly enough. 💜",
          author: 'soft soul #23',
          timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000)
        }
      ]
    },
    {
      id: '5',
      text: "4-7-8 breathing saved me during my last panic attack. 4 seconds in, 7 hold, 8 out. sounds basic but it works ✨",
      author: 'breathing buddy #445',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      reactions: { felt: 5, helped: 22 },
      comments: []
    },
    {
      id: '6',
      text: "sunday scaries hitting at 2pm on saturday now. capitalism really said 'let's speed this up' huh",
      author: 'weekend warrior #778',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      reactions: { felt: 41, helped: 0 },
      comments: [
        {
          id: 'c5',
          text: "felt this in my BONES",
          author: 'tired bean #334',
          timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000)
        }
      ]
    },
    {
      id: '7',
      text: "sometimes i just sit in my car after work and cry for no reason. is that normal? asking for a friend (the friend is me) 🚗",
      author: 'car crier #123',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      reactions: { felt: 19, helped: 4 },
      comments: []
    },
    {
      id: '8',
      text: "i write letters to my future self when i'm sad. it gives me hope that things will be different someday 💌",
      author: 'hopeful writer #556',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      reactions: { felt: 7, helped: 18 },
      comments: [
        {
          id: 'c6',
          text: "this is so beautiful. gonna try this tonight.",
          author: 'inspired soul #99',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
        }
      ]
    }
  ];

  // Load posts from localStorage on mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('soulscript-community-posts');
    if (savedPosts) {
      const parsedPosts = JSON.parse(savedPosts);
      // Convert timestamp strings back to Date objects
      const postsWithDates = parsedPosts.map((post: any) => ({
        ...post,
        timestamp: new Date(post.timestamp),
        comments: post.comments.map((comment: any) => ({
          ...comment,
          timestamp: new Date(comment.timestamp)
        }))
      }));
      setPosts(postsWithDates);
    } else {
      setPosts(initialPosts);
    }
  }, []);

  // Save posts to localStorage
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('soulscript-community-posts', JSON.stringify(posts));
    }
  }, [posts]);

  const handleSubmitPost = () => {
    if (!newPost.trim()) return;

    const newCommunityPost: CommunityPost = {
      id: Date.now().toString(),
      text: newPost,
      author: generateAnonymousName(),
      timestamp: new Date(),
      reactions: { felt: 0, helped: 0 },
      comments: []
    };

    setPosts([newCommunityPost, ...posts]);
    setNewPost('');
    setShowPostForm(false);
  };

  const addReaction = (postId: string, type: 'felt' | 'helped') => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, reactions: { ...post.reactions, [type]: post.reactions[type] + 1 } }
        : post
    ));
  };

  const addComment = (postId: string) => {
    const commentText = commentTexts[postId];
    if (!commentText?.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      text: commentText,
      author: generateAnonymousName(),
      timestamp: new Date()
    };

    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    ));

    setCommentTexts({ ...commentTexts, [postId]: '' });
  };

  const toggleComments = (postId: string) => {
    setShowComments({ ...showComments, [postId]: !showComments[postId] });
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-orange-600">Feel Less Alone 💛</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A cozy anonymous space to vent or share tiny wisdom. Raw thoughts, gentle hearts, modern vibes.
        </p>
      </div>

      {/* Post Button */}
      <div className="text-center">
        <button
          onClick={() => setShowPostForm(!showPostForm)}
          className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-orange-600 hover:to-pink-600 transition-all shadow-lg flex items-center space-x-2 mx-auto"
        >
          <Plus className="w-5 h-5" />
          <span>Share Your Vibe 💛</span>
        </button>
      </div>

      {/* Post Form */}
      {showPostForm && (
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-400">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            What's weighing on your heart lately? Or what's one tiny thing that's helped you cope — even for a moment? 💛
          </h3>
          
          <div className="space-y-4">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="that 3am overthinking spiral when everything feels too much... or maybe something that actually helped today..."
              className="w-full h-24 p-4 border-2 border-orange-200 rounded-lg focus:border-orange-400 focus:outline-none resize-none text-gray-700"
              maxLength={280}
            />
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {280 - newPost.length} characters left
              </span>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowPostForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitPost}
                  disabled={!newPost.trim()}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-600 hover:to-pink-600 transition-all flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Post Anonymously</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Community Feed */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center">
          <Users className="w-6 h-6 mr-2 text-orange-500" />
          Anonymous Vibes 💫
        </h3>
        
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-purple-600">
                  {post.author}
                </span>
                <span className="text-xs text-gray-500">
                  {getTimeAgo(post.timestamp)}
                </span>
              </div>
              
              {/* Post Content */}
              <p className="text-gray-800 leading-relaxed mb-4 text-lg">
                {post.text}
              </p>
              
              {/* Reactions and Comments Bar */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => addReaction(post.id, 'felt')}
                    className="flex items-center space-x-1 text-yellow-500 hover:text-yellow-600 transition-colors group"
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform">💛</span>
                    <span className="text-sm font-medium">{post.reactions.felt}</span>
                    <span className="text-xs text-gray-500">felt this</span>
                  </button>
                  
                  <button
                    onClick={() => addReaction(post.id, 'helped')}
                    className="flex items-center space-x-1 text-green-500 hover:text-green-600 transition-colors group"
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform">🌱</span>
                    <span className="text-sm font-medium">{post.reactions.helped}</span>
                    <span className="text-xs text-gray-500">this helped</span>
                  </button>
                </div>
                
                <button
                  onClick={() => toggleComments(post.id)}
                  className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">{post.comments.length}</span>
                  <span className="text-xs">comments</span>
                </button>
              </div>

              {/* Comments Section */}
              {showComments[post.id] && (
                <div className="mt-4 space-y-3 border-t border-gray-100 pt-4">
                  {/* Existing Comments */}
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-purple-600">
                          {comment.author}
                        </span>
                        <span className="text-xs text-gray-500">
                          {getTimeAgo(comment.timestamp)}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {comment.text}
                      </p>
                    </div>
                  ))}
                  
                  {/* Add Comment */}
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={commentTexts[post.id] || ''}
                      onChange={(e) => setCommentTexts({ ...commentTexts, [post.id]: e.target.value })}
                      placeholder="add a gentle comment..."
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:border-orange-400 focus:outline-none text-sm"
                      maxLength={140}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addComment(post.id);
                        }
                      }}
                    />
                    <button
                      onClick={() => addComment(post.id)}
                      disabled={!commentTexts[post.id]?.trim()}
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Gentle Reminder */}
      <div className="bg-gradient-to-r from-orange-400 to-pink-500 p-6 rounded-xl text-white text-center">
        <h3 className="text-xl font-semibold mb-3">Gentle Reminder 🌸</h3>
        <p className="leading-relaxed">
          Every feeling you've shared here matters. Every tiny thing that helps is worth celebrating. 
          You're part of a beautiful community of humans just trying to figure it out, one day at a time.
        </p>
        <p className="mt-3 text-orange-100">
          Wanna leave your own little heart print here? 🌸 It might help someone feel less alone.
        </p>
      </div>
    </div>
  );
};