import Dexie, { Table } from 'dexie';

export interface UserData {
  id: string;
  name: string;
  email: string;
  image: string;
  // Add other user data properties as needed
}

export interface PageData {
  id: string;
  name: string;
}

export class MyDexieDB extends Dexie {
  users!: Table<UserData>;
  pages!: Table<PageData>;

  constructor() {
    super('myDatabase');
    this.version(1).stores({
      users: '&id', // Primary key is the 'id' property
      pages: '++id, slug', // Primary key is the 'id' property
    });
  }
}

const db = new MyDexieDB();

export default db;
