import { Migration } from '@mikro-orm/migrations';

export class Migration20240501132827 extends Migration {

  async up(): Promise<void> {
    this.addSql('create type "user_role" as enum (\'admin\', \'simple_user\');');
    this.addSql('create type "order_status" as enum (\'created\', \'completed\');');
    this.addSql('alter table "order" drop constraint if exists "order_status_check";');

    this.addSql('alter table "user" add column "email" varchar(255) not null, add column "password" text not null, add column "role" "user_role" not null;');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');

    this.addSql('alter table "order" alter column "status" type "order_status" using ("status"::"order_status");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop constraint "user_email_unique";');
    this.addSql('alter table "user" drop column "email", drop column "password", drop column "role";');

    this.addSql('alter table "order" alter column "status" type text using ("status"::text);');
    this.addSql('alter table "order" add constraint "order_status_check" check("status" in (\'created\', \'completed\'));');

    this.addSql('drop type "user_role";');
    this.addSql('drop type "order_status";');
  }

}
