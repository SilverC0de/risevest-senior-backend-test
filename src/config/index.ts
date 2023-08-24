import 'dotenv/config';

interface IConfig {
  SERVER: {
    readonly PORT: number | any | undefined;
    readonly VERSION: number | any | undefined;
    readonly KEY: number | any | undefined;
  };
  DB: {
    readonly POSTGRES: string | any | undefined;
  };
  KEY: {
    readonly MAILGUN: string | undefined;
  };
}

const config: IConfig = {
  SERVER: {
    PORT: process.env.PORT,
    VERSION: process.env.VERSION,
    KEY: process.env.KEY
  },
  DB: {
    POSTGRES: process.env.POSTGRES
  },
  KEY: {
    MAILGUN: process.env.MAILGUN_API_KEY,
  },
};

export default config;
