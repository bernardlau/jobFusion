/* make sure to create a database locally: createdb `jobfusion` */
/* make sure to run schema: psql -d jobfusion < database/schema.sql  */
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS appliedjobs;

CREATE TABLE IF NOT EXISTS jobs (
  job_id varchar(20),
  href varchar(1250),
  description varchar(250),
  subtitle varchar(100),
  metadata varchar(100),
  title varchar(100),
  site varchar(10),
  PRIMARY KEY(job_id, site)
);

CREATE TABLE IF NOT EXISTS appliedjobs (
  job_id varchar(20),
  href varchar(1250),
  description varchar(250),
  date_applied DATE NOT NULL DEFAULT CURRENT_DATE,
  subtitle varchar(100),
  metadata varchar(100),
  title varchar(100),
  site varchar(10),
  notes varchar(250),
  PRIMARY KEY(job_id, site)
);