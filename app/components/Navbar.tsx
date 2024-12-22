"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        router.push('/');
    };

    return (
        <nav className="p-4 bg-gray-800 text-white flex justify-between">
            <Link href="/">
                <p className="font-bold">Home</p>
            </Link>
            <div>
                {isLoggedIn ? (
                    <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
                        Logout
                    </button>
                ) : (
                    <Link href="/login">
                        <p className="bg-blue-500 px-4 py-2 rounded">Login</p>
                    </Link>
                )}
            </div>
        </nav>
    );
}
