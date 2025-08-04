import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class DbConnectionInfrastructure {
  private dataSource?: DataSource;

  create(): DataSource {
    if (!this.dataSource) {
      this.dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_DEFAULT_HOST,
        port: Number(process.env.DB_DEFAULT_PORT),
        username: process.env.DB_DEFAULT_USERNAME,
        password: process.env.DB_DEFAULT_PASSWORD,
        database: process.env.DB_DEFAULT_DATABASE,
        entities: [],
        synchronize: false,
        logging: false,
        subscribers: []
      });
    }

    return this.dataSource;
  }

  async disconnect (): Promise<void> {
    if (this.dataSource?.isInitialized) {
      await this.dataSource.destroy();
      this.dataSource = undefined;
    }
  }

  isConnected (): boolean {
    return !!this.dataSource?.isInitialized;
  }

  getDataSource (): DataSource | undefined {
    return this.dataSource;
  }
}