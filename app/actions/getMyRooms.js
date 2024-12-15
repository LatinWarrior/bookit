'use server';

import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';
import { Query } from 'node-appwrite';
import { redirect } from 'next/navigation';

async function getMyRooms() {
  const sessionCookie = await cookies().get('appwrite-session');

  if (!sessionCookie) {
    redirect('/login');
  }

  try {
    const { account, databases } = await createSessionClient(sessionCookie.value);

    // console.log(databases);

    const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE;
    const roomsCollection = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS;

    // console.log(`databaseId: ${databaseId}`);
    // console.log(`roomsCollection: ${roomsCollection}`);

    // Get the user's Id.
    const user = await account.get();
    const userId = user.$id;

    // Fetch user rooms.
    const { documents: rooms } = await databases.listDocuments(
      databaseId,
      roomsCollection,
      [Query.equal('user_id', userId)]
    );

    return rooms;
  } catch (error) {
    console.log(`Failed to get user rooms `, error);
    redirect('/error');
  }
}

export default getMyRooms;
