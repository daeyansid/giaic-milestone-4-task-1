import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();
        console.log('Received login request:', username, password);

        // Replace with your actual authentication logic
        if (username === 'user' && password === 'user') {
            return NextResponse.json({ success: true, token: 'yourAuthToken' });
        } else {
            return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
        }
    } catch (error) {
        console.error('Error parsing request body:', error);
        return NextResponse.json({ success: false, message: 'Invalid request' }, { status: 400 });
    }
}

// Restrict other methods
export function middleware(request: Request) {
    if (request.method !== 'POST') {
        return NextResponse.json({ success: false, message: 'Method Not Allowed' }, { status: 405 });
    }
}
