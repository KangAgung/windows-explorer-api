/*
 Navicat Premium Data Transfer

 Source Server         : localhost_postgre
 Source Server Type    : PostgreSQL
 Source Server Version : 140000
 Source Host           : localhost:5432
 Source Catalog        : windows_explorer
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 140000
 File Encoding         : 65001

 Date: 11/10/2024 13:43:49
*/


-- ----------------------------
-- Sequence structure for files_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."files_id_seq";
CREATE SEQUENCE "public"."files_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for folders_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."folders_id_seq";
CREATE SEQUENCE "public"."folders_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for files
-- ----------------------------
DROP TABLE IF EXISTS "public"."files";
CREATE TABLE "public"."files" (
  "id" int4 NOT NULL DEFAULT nextval('files_id_seq'::regclass),
  "name" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "folder_id" int4 NOT NULL
)
;

-- ----------------------------
-- Table structure for folders
-- ----------------------------
DROP TABLE IF EXISTS "public"."folders";
CREATE TABLE "public"."folders" (
  "id" int4 NOT NULL DEFAULT nextval('folders_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "parent_id" int4
)
;

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."files_id_seq"
OWNED BY "public"."files"."id";
SELECT setval('"public"."files_id_seq"', 4, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."folders_id_seq"
OWNED BY "public"."folders"."id";
SELECT setval('"public"."folders_id_seq"', 10, true);

-- ----------------------------
-- Primary Key structure for table files
-- ----------------------------
ALTER TABLE "public"."files" ADD CONSTRAINT "files_pk" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table files
-- ----------------------------
ALTER TABLE "public"."files" ADD CONSTRAINT "files_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."folders" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Primary Key structure for table folders
-- ----------------------------
ALTER TABLE "public"."folders" ADD CONSTRAINT "folders_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table folders
-- ----------------------------
ALTER TABLE "public"."folders" ADD CONSTRAINT "fk_parent" FOREIGN KEY ("parent_id") REFERENCES "public"."folders" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
