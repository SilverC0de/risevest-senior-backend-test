import { Client, QueryResult } from 'pg';
import Config from './index';

const client = new Client({
  connectionString: Config.DB.POSTGRES
});

client.connect();


interface Database {
  query(text: string, params?: any[]): Promise<QueryResult>;
}

const database: Database = {
  query: (text, params) => client.query(text, params)
};

export default database;