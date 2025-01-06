import { useState } from 'react';
import CommunityHeader from '../components/community/CommunityHeader';
import CommunityTabs from '../components/community/CommunityTabs';
import NewDiscussionForm from '../components/community/NewDiscussionForm';
import DiscussionPost from '../components/community/DiscussionPost';
import EventsList from '../components/community/EventsList';
import ResourceLibrary from '../components/community/ResourceLibrary';
import GroupsList from '../components/community/GroupsList';
import { communityGroups } from '../data/communityData';

function Community() {
  const [activeTab, setActiveTab] = useState('discussions');
  const [showNewDiscussion, setShowNewDiscussion] = useState(false);
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      title: "Managing diabetes and eye health",
      author: "User123",
      content: "What strategies do you use to maintain good eye health with diabetes?",
      replies: 5,
      likes: 12,
      tags: ["Eye Health", "Management"],
      date: "2 hours ago",
      isAuthor: true,
      comments: [
        { id: 1, content: "Regular exercise helps me maintain stable blood sugar levels.", author: "HealthyLife", date: "1 hour ago" },
        { id: 2, content: "I found that a low-carb diet works best for me.", author: "DiabetesFighter", date: "30 mins ago" }
      ]
    },
    {
      id: 2,
      title: "Tips for regular screening",
      author: "User456",
      content: "Looking for advice on making eye screening a regular habit.",
      replies: 3,
      likes: 8,
      tags: ["Screening", "Prevention"],
      date: "5 hours ago",
      isAuthor: false,
      comments: [
        { id: 3, content: "I set calendar reminders every 3 months.", author: "EyeCare", date: "4 hours ago" }
      ]
    }
  ]);

  const [notifications] = useState([
    { id: 1, text: "New reply to your discussion", time: "5 mins ago" },
    { id: 2, text: "You earned a new badge!", time: "1 hour ago" },
    { id: 3, text: "Upcoming community event", time: "2 hours ago" }
  ]);

  const [events] = useState([
    { id: 1, title: "Eye Health Webinar", date: "March 15, 2024", time: "2:00 PM EST" },
    { id: 2, title: "Q&A with Dr. Smith", date: "March 20, 2024", time: "3:30 PM EST" },
    { id: 3, title: "Support Group Meeting", date: "March 25, 2024", time: "1:00 PM EST" }
  ]);

  const [resources] = useState([
    { id: 1, title: "Diabetic Retinopathy Guide", type: "PDF", downloads: 125 },
    { id: 2, title: "Diet and Eye Health", type: "Video", views: 342 },
    { id: 3, title: "Exercise Recommendations", type: "Article", reads: 567 }
  ]);

  const handleNewDiscussion = (formData) => {
    const newPost = {
      id: discussions.length + 1,
      ...formData,
      author: "CurrentUser",
      replies: 0,
      likes: 0,
      tags: formData.tags.split(',').map(tag => tag.trim()),
      date: "Just now",
      isAuthor: true,
      comments: []
    };
    setDiscussions([newPost, ...discussions]);
    setShowNewDiscussion(false);
  };

  const handleDelete = (postId) => {
    setDiscussions(discussions.filter(post => post.id !== postId));
  };

  const handleLike = (postId) => {
    setDiscussions(discussions.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleComment = (postId, comment) => {
    setDiscussions(discussions.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, {
            id: post.comments.length + 1,
            content: comment,
            author: "CurrentUser",
            date: "Just now"
          }]
        };
      }
      return post;
    }));
  };

  const handleJoinGroup = (groupId) => {
    console.log(`Joined group ${groupId}`);
  };

  const handleWatchGroup = (groupId) => {
    console.log(`Watching group ${groupId}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <CommunityHeader notifications={notifications} />
      <CommunityTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex justify-end mb-6">
        {activeTab === 'discussions' && (
          <button
            onClick={() => setShowNewDiscussion(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Start Discussion
          </button>
        )}
      </div>

      {showNewDiscussion && (
        <NewDiscussionForm
          onSubmit={handleNewDiscussion}
          onCancel={() => setShowNewDiscussion(false)}
        />
      )}

      {activeTab === 'discussions' && (
        <div className="space-y-6">
          {discussions.map(post => (
            <DiscussionPost
              key={post.id}
              post={post}
              onDelete={handleDelete}
              onLike={handleLike}
              onComment={handleComment}
            />
          ))}
        </div>
      )}

      {activeTab === 'groups' && (
        <GroupsList 
          groups={communityGroups} 
          onJoinGroup={handleJoinGroup}
          onWatchGroup={handleWatchGroup}
        />
      )}

      {activeTab === 'events' && <EventsList events={events} />}
      {activeTab === 'resources' && <ResourceLibrary resources={resources} />}
    </div>
  );
}

export default Community;