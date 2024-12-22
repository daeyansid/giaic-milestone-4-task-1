"use client";

import Navbar from "../components/Navbar";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Post {
    id: number;
    title: string;
    body: string;
}

async function fetchPosts(): Promise<Post[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        cache: 'force-cache',
    });
    const posts: Post[] = await response.json();
    return posts.slice(0, 5); // Fetch the first 5 posts only
}

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Check authentication status
        const token = localStorage.getItem('authToken');
        setIsLoggedIn(!!token);

        // Fetch posts
        const getPosts = async () => {
            try {
                const postsData = await fetchPosts();
                setPosts(postsData);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        getPosts();
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="max-w-3xl mx-auto p-4 mt-16">
                <h1 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
                    Welcome to the Dashboard
                </h1>
                <p className="text-black text-center mb-8">
                    This is the dashboard page Using Server Side Rendering by `https://jsonplaceholder.typicode.com/posts`. <br /> You can view posts here.
                </p>

                {loading ? (
                    <div className="flex justify-center items-center">
                        <p className="text-gray-500">Loading posts...</p>
                    </div>
                ) : isLoggedIn ? (
                    <div className="space-y-4">
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="bg-white shadow-sm rounded-lg p-4 hover:shadow-md transition"
                            >
                                <h2 className="text-lg font-semibold text-gray-800">{post.title}</h2>
                                <p className="text-gray-600">{post.body}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-red-500 font-medium mb-4">
                            You are not logged in. Please log in to view content.
                        </p>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
                            onClick={() => {router.push('/');}}
                        >
                            Log In
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
