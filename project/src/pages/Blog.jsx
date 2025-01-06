import { useState } from 'react';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/blogData';
import BlogPost from '../components/blog/BlogPost';
import EyeFacts from '../components/blog/EyeFacts';

function Blog() {
  const [expandedPost, setExpandedPost] = useState(null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center text-green-700 mb-8"
      >
        Suggestions & Eye Facts
      </motion.h1>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-6">Expert Recommendations</h2>
          <div className="space-y-6">
            {blogPosts.map((post) => (
              <BlogPost
                key={post.id}
                post={post}
                isExpanded={expandedPost === post.id}
                onToggle={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
              />
            ))}
          </div>
        </section>

        <EyeFacts />
      </div>
    </div>
  );
}

export default Blog;