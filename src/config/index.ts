import 'dotenv/config';

interface IConfig {
  SERVER: {
    readonly PORT: number | any | undefined;
    readonly VERSION: number | any | undefined;
  };
  DB: {
    readonly POSTGRES: string | any | undefined;
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
    POSTGRES: process.env.POSTGRES
  },
  KEY: {
    SECRET_KEY: process.env.SECRET_KEY,
    MAILGUN: process.env.MAILGUN_API_KEY,
  },
};

export default config;
