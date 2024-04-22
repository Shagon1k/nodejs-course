import { Migration } from '@mikro-orm/migrations';

export class Migration20240422080803 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "product" ("id" uuid not null default gen_random_uuid(), "title" varchar(255) not null, "description" varchar(255) not null, "price" numeric(6, 2) not null, constraint "product_pkey" primary key ("id"));');

    this.addSql('create table "user" ("id" uuid not null default gen_random_uuid(), constraint "user_pkey" primary key ("id"));');

    this.addSql('create table "cart" ("id" uuid not null default gen_random_uuid(), "user_id" uuid not null, "is_deleted" boolean not null default true, "items" jsonb not null, constraint "cart_pkey" primary key ("id"));');

    this.addSql('create table "order" ("id" uuid not null default gen_random_uuid(), "cart_id" uuid not null, "user_id" uuid not null, "items" jsonb not null, "payment" jsonb not null, "delivery" jsonb not null, "comments" varchar(255) not null, "status" text check ("status" in (\'created\', \'completed\')) not null, "total" numeric(8, 2) not null, constraint "order_pkey" primary key ("id"));');
    this.addSql('alter table "order" add constraint "order_cart_id_unique" unique ("cart_id");');

    this.addSql('alter table "cart" add constraint "cart_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "order" add constraint "order_cart_id_foreign" foreign key ("cart_id") references "cart" ("id") on update cascade;');
    this.addSql('alter table "order" add constraint "order_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "cart" drop constraint "cart_user_id_foreign";');

    this.addSql('alter table "order" drop constraint "order_user_id_foreign";');

    this.addSql('alter table "order" drop constraint "order_cart_id_foreign";');

    this.addSql('drop table if exists "product" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "cart" cascade;');

    this.addSql('drop table if exists "order" cascade;');
  }

}
