/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'dotenv/config';

const env ={
    stage: String(process.env.STAGE),
    port: Number(process.env.PORT),
    postgres_server: String(process.env.POSTGRES_SERVER),
    postgres_port: Number(process.env.POSTGRES_PORT),
    postgres_username: String(process.env.POSTGRES_USERNAME),
    postgres_password: String(process.env.POSTGRES_PASSWORD),
    postgres_database: String(process.env.POSTGRES_DB),
    jwt_secret: String(process.env.JWT_SECRET),
    jwt_expiry_date: String(process.env.JWT_EXPIRY_DATE)
    
};

export default env
