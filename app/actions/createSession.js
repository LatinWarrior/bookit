'use server';

import { createAdminClient } from '@/config/appwrite';
import { sendError } from 'next/dist/server/api-utils';
import { cookies } from 'next/headers';

async function createSession(previousState, formData) {
  // console.log(formData);
  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || !password) {
    return {
      error: 'Please fill out all fields.'
    };
  }
  // console.log(email, password);

  // Get account instance.
  const { account } = await createAdminClient();

  try {
    // Generate a session.
    const session = await account.createEmailPasswordSession(email, password);

    // Create the cookie.
    cookies().set(
      'appwrite-session',
      session.secret, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(session.expire),
      path: '/'
    });

    return {
      success: true
    };
  } catch (error) {
    console.log(`Authentication error: ${error}`);
    return {
      error: 'Invalid credentials'
    };
  }
}

export default createSession;