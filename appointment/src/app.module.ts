import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentModule } from './appointment/appointment.module';
import { configValidationSchema } from './config/config.schema';
import env from './config/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
      validationSchema: configValidationSchema,
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const useSSL = configService.get('STAGE') === 'prod' || configService.get('STAGE') === 'dev';
      return {
        ssl:  useSSL,
        extra: {
          ssl: useSSL ? { rejectUnauthorized: false } : null,
        },
        type: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
        host: env.postgres_server,
        port: env.postgres_port,
        username: env.postgres_username,
        password: env.postgres_password,
        database: env.postgres_database,
      };
    },
  }),
    AppointmentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
