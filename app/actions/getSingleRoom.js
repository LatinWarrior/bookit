'use server';

import { createAdminClient } from '@/config/appwrite';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function getSingleRoom(id) {
  try {
    const { databases } = await createAdminClient();

    // console.log(databases);

    const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE;
    const roomsCollection = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS;

    // console.log(`databaseId: ${databaseId}`);
    // console.log(`roomsCollection: ${roomsCollection}`);

    // Fetch room.
    const room = await databases.getDocument(
      databaseId,
      roomsCollection,
      id
    );

    // console.log(`rooms: ${JSON.stringify(rooms)}`);

    // Revalidate the cache for this path.
    // revalidatePath('/', 'layout');

    return room;
  } catch (error) {
    console.log(`Failed to get single room `, error);
    redirect('/error');
  }
}

export default getSingleRoom;
