import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
    get mySqlUser() {
        return process.env.MYSQL_USER;
    }
    get mySqlPassword() {
        return process.env.MYSQL_PASSWORD;
    }
    get mySqlUrl() {
        return process.env.MYSQL_URL;
    }
    get mySqlDbName() {
        return process.env.MYSQL_DBNAME;
    }
}
