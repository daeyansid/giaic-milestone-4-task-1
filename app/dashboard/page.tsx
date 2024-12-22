"use client";

import Navbar from "../components/Navbar";
import { useEffect, useState } from 'react';

interface Post {
    id: number;
    title: string;
    body: string;
}

async function fetchPosts(): Promise<Post[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        cache: 'force-cache', // Ensures static fetching
    });
    const posts: Post[] = await response.json();
    return posts.slice(0, 10); // Fetch the first 10 posts
}

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        <div className="p-6 max-w-5xl mx-auto">
            <Navbar />
            <h1 className="text-4xl font-bold mb-6">Static Site Generation (SSG)</h1>

            {isLoggedIn ? (
                <ul>
                    {posts.map((post) => (
                        <li key={post.id} className="border-b py-2">
                            <h2 className="text-xl font-semibold">{post.title}</h2>
                            <p className="text-gray-700">{post.body}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-red-600 mb-4">You are not logged in. Please log in to access more features.</p>
            )}
        </div>
    );
}
