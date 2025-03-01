export type Config = {
  database: DatabaseEnvs;
};

export type DatabaseEnvs = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};
