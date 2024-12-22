import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();
        console.log('Received login request:', username, password);

        if (username === 'user' && password === 'user') {
            return NextResponse.json(
                { success: true, token: 'yourAuthToken' },
                { status: 200 }
            );
        }
        
        return NextResponse.json(
            { success: false, message: 'Invalid credentials' },
            { status: 401 }
        );
    } catch (error) {
        console.error('Error parsing request body:', error);
        return NextResponse.json(
            { success: false, message: 'Invalid request' },
            { status: 400 }
        );
    }
}
