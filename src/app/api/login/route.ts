import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/app/models/User'; // Adjust the import based on your models
import { connectDB } from '@/app/libs/mongodb';
await connectDB();

// POST: Login route
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Find the user in the database
    const user = await User.findOne({ email }).select('+password');

    if (!user || !user.isVerified) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 400 }
      );
    }
    // Compare the password if stored password exists
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 400 }
      );
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.TOKEN_SECRET as string,
      {
        expiresIn: '365d',
      }
    );
    console.log(3);
    // Set the cookie
    const headers = new Headers();
    headers.append(
      'Set-Cookie',
      `jwt=${token}; Max-Age=31536000; HttpOnly; Secure; SameSite=None; Path=/`
    );
    console.log(4);

    return NextResponse.json(
      {
        success: true,
        message: 'Logged in successfully',
      },
      { status: 200, headers }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
