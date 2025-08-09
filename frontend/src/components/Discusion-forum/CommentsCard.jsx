
import React, { useState } from 'react';
import { Trash2, Heart, Reply, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

const CommentsCard = ({ comment, isAdmin, onDelete }) => {
    const [likes, setLikes] = useState(0);
    const [showReplies, setShowReplies] = useState(false);

    const formattedDate = new Date(comment.createdAt).toLocaleString();

    return (
        <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition flex gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                {comment.userId?.[0]?.toUpperCase() || "U"}
            </div>

            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <span className="font-semibold">{comment.userId}</span>
                    {isAdmin && <ShieldCheck size={16} className="text-green-500" />}
                    <span className="text-sm text-gray-500">{formattedDate}</span>
                </div>
                <p className="text-gray-800 mt-1">{comment.comments}</p>

                <div className="flex items-center gap-4 mt-2 text-gray-500">
                    <button onClick={() => setLikes(likes + 1)} className="flex items-center gap-1 hover:text-red-500">
                        <Heart size={18} /> {likes}
                    </button>
                    <button onClick={() => setShowReplies(!showReplies)} className="flex items-center gap-1 hover:text-blue-500">
                        <Reply size={18} /> Reply
                    </button>
                    {isAdmin && (
                        <button onClick={onDelete} className="flex items-center gap-1 hover:text-red-600">
                            <Trash2 size={18} /> Delete
                        </button>
                    )}
                </div>

                {showReplies && (
                    <div className="mt-3 ml-6 border-l pl-4 space-y-2">
                        <p className="text-sm text-gray-600">No replies yet.</p>
                    </div>
                )}

                <button 
                    onClick={() => setShowReplies(!showReplies)} 
                    className="text-sm text-blue-500 mt-2 flex items-center gap-1"
                >
                    {showReplies ? <>Hide Replies <ChevronUp size={14} /></> : <>View Replies <ChevronDown size={14} /></>}
                </button>
            </div>
        </div>
    );
};

export default CommentsCard;
