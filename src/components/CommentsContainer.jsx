import React, { useState, useEffect } from 'react';
import userIcon from '../images/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8-removebg-preview.png';
import conf from '../utils/conf';

const Comment = ({ data, onReplySubmit }) => {
    const { name, text, replies, id } = data;
    const [showReplies, setShowReplies] = useState(false);
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [replyText, setReplyText] = useState('');

    const toggleReplies = () => {
        setShowReplies(!showReplies);
    };

    const toggleReplyInput = () => {
        setShowReplyInput(!showReplyInput);
    };

    const handleReplySubmit = () => {
        if (replyText.trim()) {
            onReplySubmit(id, replyText);
            setReplyText('');
            setShowReplyInput(false);
        }
    };

    return (
        <div className='flex shadow-sm p-2 my-2'>
            <img className='w-12 h-12' src={userIcon} alt="user" />
            <div className='px-3'>
                <p className='font-bold'>{name}</p>
                <p>{text}</p>

                {replies && replies.length > 0 && (
                    <button
                        className="text-black m-2"
                        onClick={toggleReplies}
                    >
                        {showReplies ? 'Hide Replies' : 'Show Replies'}
                    </button>
                )}

                {showReplies && replies && replies.length > 0 && (
                    <div className='pl-5 border-l-2 ml-5'>
                        {replies.map((reply, index) => (
                            <Comment key={index} data={reply} onReplySubmit={onReplySubmit} />
                        ))}
                    </div>
                )}

                <button
                    className="text-black mt-2"
                    onClick={toggleReplyInput}
                >
                    {showReplyInput ? 'Cancel' : 'Reply'}
                </button>

                {showReplyInput && (
                    <div className='mt-2'>
                        <input
                            className="w-full p-1 border rounded-lg"
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write your reply..."
                        />
                        <button
                            className="mt-2 p-1 bg-blue-500 text-white rounded"
                            onClick={handleReplySubmit}
                        >
                            Submit
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const CommentsList = ({ comments, onReplySubmit }) => {
    return comments.map((comment, index) => (
        <div key={index}>
            <Comment data={comment} onReplySubmit={onReplySubmit} />
        </div>
    ));
};

const CommentsContainer = ({ videoId }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const youtubeApiKey = conf.googleApi;
                const params = new URLSearchParams({
                    part: 'snippet,replies',
                    videoId: videoId,
                    key: youtubeApiKey,
                });

                const response = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?${params.toString()}`);
                const data = await response.json();

                if (data.error) {
                    throw new Error(data.error.message);
                }

                const commentsData = data.items.map(item => ({
                    id: item.id,
                    name: item.snippet.topLevelComment.snippet.authorDisplayName,
                    text: item.snippet.topLevelComment.snippet.textDisplay,
                    replies: item.replies
                        ? item.replies.comments.map(reply => ({
                            id: reply.id,
                            name: reply.snippet.authorDisplayName,
                            text: reply.snippet.textDisplay,
                            replies: reply.replies ? reply.replies.comments.map(subReply => ({
                                id: subReply.id,
                                name: subReply.snippet.authorDisplayName,
                                text: subReply.snippet.textDisplay,
                                replies: [],
                            })) : [],
                        }))
                        : [],
                }));

                setComments(commentsData);
                setLoading(false);
            } catch (err) {
                setError('Failed to load comments: ' + err.message);
                setLoading(false);
            }
        };

        fetchComments();
    }, [videoId]); 

    const handleReplySubmit = (parentId, replyText) => {
        const newReply = {
            id: Math.random().toString(36).substr(2, 9),
            name: "You",
            text: replyText,
            replies: [],
        };

        const updateComments = (comments) => {
            return comments.map(comment => {
                if (comment.id === parentId) {
                    return {
                        ...comment,
                        replies: [...comment.replies, newReply],
                    };
                }

                if (comment.replies && comment.replies.length > 0) {
                    return {
                        ...comment,
                        replies: updateComments(comment.replies),
                    };
                }

                return comment;
            });
        };

        setComments(prevComments => updateComments(prevComments));
    };

    if (loading) return <div>Loading comments...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='mr-1 p-1 w-[1000px]'>
            <h1 className='text-2xl font-bold'>Comments:</h1>
            <CommentsList comments={comments} onReplySubmit={handleReplySubmit} />
        </div>
    );
};

export default CommentsContainer;
