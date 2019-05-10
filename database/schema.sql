/* make sure to create a database locally: createdb `jobfusion` */
/* make sure to run schema: psql -d jobfusion < database/schema.sql  */

CREATE TABLE IF NOT EXISTS jobs (
  job_id PRIMARY KEY,
  href varchar(250),
  description varchar(250),
  subtitle varchar(100),
  metadata varchar(100),
  title varchar(100),
  site varchar(10)
);

CREATE TABLE IF NOT EXISTS appliedJobs (
  job_id PRIMARY KEY,
  href varchar(250),
  description varchar(250),
  date_applied DATE NOT NULL DEFAULT CURRENT_DATE,
  subtitle varchar(100),
  metadata varchar(100),
  title varchar(100),
  site varchar(10),
  notes varchar(250)
);