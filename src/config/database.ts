import { Client } from 'pg';
import Config from './index';

const client = new Client({
  connectionString: Config.DB.POSTGRES
});

client.connect();

const database = {
  query: (text : any, params : any) => client.query(text, params)
};

export default database;