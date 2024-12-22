"use client";

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Comment {
    id: number;
    text: string;
}

export default function Post() {
    const { slug } = useParams();
    const router = useRouter();

    const [comments, setComments] = useState<Comment[]>([]);
    const [commentText, setCommentText] = useState('');

    const addComment = () => {
        if (!commentText.trim()) return;
        setComments([
            ...comments,
            { id: Date.now(), text: commentText.trim() },
        ]);
        setCommentText('');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Back Button */}
                <button
                    onClick={() => router.push('/')}
                    className="flex items-center mb-6 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Home
                </button>

                {/* Hero Section */}
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                        {slug.toString().replace(/-/g, ' ')}
                    </h1>
                    <div className="flex items-center mb-6">
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                            <span className="text-white font-medium">A</span>
                        </div>
                        <div className="ml-3">
                            <p className="text-gray-900 font-medium">Author Name</p>
                            <p className="text-gray-500 text-sm">Posted on {new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="prose max-w-none">
                        <p className="text-gray-700 text-lg leading-relaxed">
                            This is the content of the blog post. Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, fuga! Voluptatibus, praesentium laboriosam quis itaque tempore asperiores ullam voluptas blanditiis cupiditate id placeat ratione iusto in. Eos, nesciunt et. Magnam?
                            Expedita quasi est eligendi cum ab magnam nulla laborum odit illo quo aut dicta nemo amet corrupti laboriosam veritatis excepturi, tempora ipsum laudantium assumenda aliquam consequuntur consequatur facilis! Explicabo, iste!
                            Neque eum mollitia eius. Ex delectus similique nemo adipisci! Eveniet mollitia numquam dicta quis hic distinctio dolorum veritatis dolor, facilis cum, a soluta odit voluptate. Voluptas temporibus hic natus sunt.
                        </p>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Discussion ({comments.length})</h2>
                    
                    {/* Comment Input */}
                    <div className="mb-8">
                        <div className="flex items-start space-x-4">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0" />
                            <div className="flex-grow">
                                <textarea
                                    className="w-full text-black border-2 border-gray-200 rounded-lg p-4 h-24 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 resize-none"
                                    placeholder="Add to the discussion..."
                                    value={commentText}
                                    required
                                    onChange={(e) => setCommentText(e.target.value)}
                                />
                                <button
                                    onClick={addComment}
                                    className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Comment
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Comments List */}
                    <div className="space-y-6">
                        {comments.map((comment) => (
                            <div key={comment.id} className="flex items-start space-x-4">
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0" />
                                <div className="flex-grow">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-gray-900">{comment.text}</p>
                                        <p className="text-gray-500 text-sm mt-2">
                                            {new Date(comment.id).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
