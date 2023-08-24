import 'dotenv/config';

interface IConfig {
  SERVER: {
    readonly PORT: number | any | undefined;
    readonly VERSION: number | any | undefined;
  };
  DB: {
    readonly DB_TYPE: string | any | undefined;
    readonly SECRET_KEY: string | undefined;
    readonly MAILGUN: string | undefined;
  };
  KEY: {
    readonly SECRET_KEY: string | undefined;
    readonly MAILGUN: string | undefined;
  };
}

const config: IConfig = {
  SERVER: {
    PORT: process.env.PORT,
    VERSION: process.env.VERSION,
  },
  DB: {
    DB_TYPE: process.env.DB_TYPE,
    SECRET_KEY: process.env.DB_TYPE,
    MAILGUN: process.env.DB_TYPE,
  },
  KEY: {
    SECRET_KEY: process.env.SECRET_KEY,
    MAILGUN: process.env.MAILGUN_API_KEY,
  },
};

export default config;
