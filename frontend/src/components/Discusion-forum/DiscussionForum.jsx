// DiscussionForum.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CommentsCard from './CommentsCard';

const DiscussionForum = () => {
    const { register, handleSubmit, reset } = useForm();
    const [clicked, setClicked] = useState(false);
    const [commentsData, setCommentsData] = useState([]);
    
  
   

     const userId =  Math.random().toString(36).substring(2, 6);
    const isAdmin = userId === "admin";

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/blogs/comment/all-comments');
                const data = await res.json();
                if (res.ok) {
                    setCommentsData(data.comments);
                }
            } catch (error) {
                console.error("Error loading comments", error);
            }
        };
        fetchComments();
    }, []);

    const handleAddBtn = () => setClicked(true);

    const onSubmit = async (formData) => {
        try {
            const res = await fetch('http://localhost:5000/api/blogs/comment/add-comment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, userId }),
            });

            const data = await res.json();
            if (res.ok) {
                setCommentsData((prev) => [data.comment, ...prev]);
            }
        } catch (error) {
            console.error("Error posting comment", error);
        }

        setClicked(false);
        reset();
    };

    const handleDelete = (id) => {
        setCommentsData((prev) => prev.filter(c => c._id !== id));
    };

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Discussion Forum</h2>
                <button 
                    onClick={handleAddBtn} 
                    className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg text-white font-medium"
                >
                    Add Comment
                </button>
            </div>

            {clicked && (
                <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 mb-6">
                    <input 
                        {...register('comments', { required: true })} 
                        placeholder="Write your comment..."
                        className="flex-1 p-3 border border-gray-300 rounded-lg outline-none focus:ring focus:ring-blue-300"
                    />
                    <button 
                        type="submit" 
                        className="bg-green-500 hover:bg-green-400 px-4 py-2 rounded-lg text-white font-medium"
                    >
                        Post
                    </button>
                </form>
            )}

            <div className="space-y-4">
                {commentsData.length > 0 ? (
                    commentsData.map((comment) => (
                        <CommentsCard 
                            key={comment._id} 
                            comment={comment} 
                            isAdmin={isAdmin}
                            onDelete={() => handleDelete(comment._id)}
                        />
                    ))
                ) : (
                    <p className="text-gray-500 text-center">Be the first one to engage</p>
                )}
            </div>
        </div>
    );
};

export default DiscussionForum;

