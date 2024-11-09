import { Client, Databases, Account, Storage } from 'node-appwrite';

// Admin Client
const createAdminClient = async () => {

  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) // Your API Endpoint
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)   // Your project ID
      .setKey(process.env.NEXT_APPWRITE_KEY);                 // Your secret API key

    // console.log(`client: `, client);

    return {
      get account() {
        return new Account(client);
      },
      get databases() {
        return new Databases(client);
      },
      get storage() {
        return new Storage(client);
      }
    };

  } catch (error) {
    console.log(`error: `, error);
  }

};

// Session Client
const createSessionClient = async (session) => {

  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) // Your API Endpoint
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);  // Your project ID

    if (session) {
      client.setSession(session);
    }

    return {
      get account() {
        return new Account(client);
      },
      get databases() {
        return new Databases(client);
      },
    };
  } catch (error) {
    console.log(`error: `, error);
  }

};

export { createAdminClient, createSessionClient };
