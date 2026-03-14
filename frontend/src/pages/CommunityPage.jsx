import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, MoreHorizontal, Plus, Search, Image as ImageIcon, X, Send } from 'lucide-react';
import { fetchPosts, createPost, toggleLikePost, addComment, fetchComments } from '../api';
import { useToast } from '../components/Toast';

const CommunityPage = () => {
    const toast = useToast();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newPostContent, setNewPostContent] = useState('');
    const [newPostImage, setNewPostImage] = useState('');
    const [commentingOn, setCommentingOn] = useState(null); // ID of post being commented on
    const [comments, setComments] = useState({}); // { postId: [comments] }
    const [commentText, setCommentText] = useState('');

    const user = JSON.parse(localStorage.getItem('profile'))?.result;

    const loadPosts = async () => {
        try {
            const res = await fetchPosts();
            setPosts(res.data.posts);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPosts();

        const handleOpenModal = () => setShowCreateModal(true);
        window.addEventListener('open-create-post', handleOpenModal);
        return () => window.removeEventListener('open-create-post', handleOpenModal);
    }, []);

    const handleCreatePost = async (e) => {
        e.preventDefault();
        try {
            await createPost({ content: newPostContent, image: newPostImage });
            setNewPostContent('');
            setNewPostImage('');
            setShowCreateModal(false);
            loadPosts();
        } catch (err) {
            toast({ message: 'Failed to create post', type: 'error' });
        }
    };

    const handleLike = async (postId) => {
        try {
            await toggleLikePost(postId);
            loadPosts();
        } catch (err) {
            console.error(err);
        }
    };

    const handleToggleComments = async (postId) => {
        if (commentingOn === postId) {
            setCommentingOn(null);
        } else {
            setCommentingOn(postId);
            if (!comments[postId]) {
                try {
                    const res = await fetchComments(postId);
                    setComments({ ...comments, [postId]: res.data.comments });
                } catch (err) {
                    console.error(err);
                }
            }
        }
    };

    const handleAddComment = async (e, postId) => {
        e.preventDefault();
        if (!commentText.trim()) return;
        try {
            await addComment({ postId, text: commentText });
            setCommentText('');
            const res = await fetchComments(postId);
            setComments({ ...comments, [postId]: res.data.comments });
        } catch (err) {
            toast({ message: 'Failed to add comment', type: 'error' });
        }
    };



    return (
        <div className="community-page">
            <header className="community-header">
                <div className="search-bar-rounded">
                    <Search size={18} color="#9CA3AF" />
                    <input type="text" placeholder="Search posts, pets or friends..." />
                </div>
            </header>



            <section className="feed-section">
                {loading ? (
                    <div className="placeholder-view">Loading feed...</div>
                ) : posts.length === 0 ? (
                    <div className="placeholder-view">No posts yet. Be the first!</div>
                ) : (
                    posts.map(post => (
                        <div key={post._id} className="post-card">
                            <div className="post-header">
                                <div className="post-user">
                                    <div className="user-avatar-small">
                                        <img src={`https://ui-avatars.com/api/?name=${post.user?.name || 'Unknown'}&background=random`} alt={post.user?.name || 'User'} />
                                    </div>
                                    <div className="user-meta">
                                        <h5>{post.user?.name || 'Unknown User'}</h5>
                                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <button className="icon-button"><MoreHorizontal size={20} color="#9CA3AF" /></button>
                            </div>

                            <div className="post-content">
                                <p>{post.content}</p>
                                {post.image && (
                                    <div className="post-image">
                                        <img src={post.image} alt="Post content" />
                                    </div>
                                )}
                            </div>

                            <div className="post-actions">
                                <div className="action-group">
                                    <button
                                        className={`action-btn ${post.likes.includes(user?._id) ? 'liked' : ''}`}
                                        onClick={() => handleLike(post._id)}
                                    >
                                        <Heart size={20} fill={post.likes.includes(user?._id) ? "#F87171" : "none"} color={post.likes.includes(user?._id) ? "#F87171" : "#4B5563"} />
                                        <span>{post.likes.length}</span>
                                    </button>
                                    <button className="action-btn" onClick={() => handleToggleComments(post._id)}>
                                        <MessageCircle size={20} />
                                        <span>{comments[post._id] ? comments[post._id].length : "Comments"}</span>
                                    </button>
                                </div>
                            </div>

                            {commentingOn === post._id && (
                                <div className="comments-section scrollable">
                                    <div className="comments-list">
                                        {comments[post._id]?.map((c, i) => (
                                            <div key={i} className="comment-item">
                                                <strong>{c.user?.name || 'Unknown User'}: </strong>
                                                <span>{c.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <form className="comment-input-row" onSubmit={(e) => handleAddComment(e, post._id)}>
                                        <input
                                            type="text"
                                            placeholder="Write a comment..."
                                            value={commentText}
                                            onChange={(e) => setCommentText(e.target.value)}
                                        />
                                        <button type="submit" className="send-btn"><Send size={18} color="#79e5f7" /></button>
                                    </form>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </section>

            {/* Create Post Modal */}
            {showCreateModal && (
                <div className="modal-overlay">
                    <div className="modal-content card slideUp">
                        <div className="modal-header">
                            <h3>Create Post</h3>
                            <button className="icon-button" onClick={() => setShowCreateModal(false)}><X size={24} /></button>
                        </div>
                        <form className="create-post-form" onSubmit={handleCreatePost}>
                            <textarea
                                placeholder="What's on your mind today?"
                                value={newPostContent}
                                onChange={(e) => setNewPostContent(e.target.value)}
                                required
                            />

                            <div className="image-preview-area">
                                {newPostImage ? (
                                    <div className="preview-box">
                                        <img src={newPostImage} alt="Preview" />
                                        <button type="button" className="remove-img" onClick={() => setNewPostImage('')}><X size={16} /></button>
                                    </div>
                                ) : (
                                    <label className="upload-placeholder">
                                        <ImageIcon size={32} color="#9CA3AF" />
                                        <span>Add Photo</span>
                                        <input
                                            type="file"
                                            style={{ display: 'none' }}
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => setNewPostImage(reader.result);
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                    </label>
                                )}
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ width: '100%', height: '56px' }}>Share Post</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommunityPage;
