'use server';

import { createAdminClient } from '@/config/appwrite';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function getAllRooms() {
  try {
    const { databases } = await createAdminClient();

    console.log(databases);

    const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE;
    const roomsCollection = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS;

    console.log(`databaseId: ${databaseId}`);
    console.log(`roomsCollection: ${roomsCollection}`);

    // Fetch rooms.
    const { documents: rooms } = await databases.listDocuments(
      databaseId,
      roomsCollection
    );

    console.log(`rooms: ${JSON.stringify(rooms)}`);

    // Revalidate the cache for this path.
    // revalidatePath('/', 'layout');

    return rooms;
  } catch (error) {
    console.log(`Failed to get rooms`, error);
    redirect('/error');
  }
}

export default getAllRooms;
