/* make sure to create a database locally: createdb `jobfusion` */
/* make sure to run schema: psql -d jobfusion < database/schema.sql  */
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS appliedjobs;
DROP TABLE IF EXISTS aboutme;

CREATE TABLE IF NOT EXISTS appliedjobs (
  job_id varchar(20),
  date_applied TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  site varchar(10),
  notes varchar(250),
  PRIMARY KEY (job_id, site)
);

CREATE TABLE IF NOT EXISTS jobs (
  job_id varchar(20),
  href varchar(300),
  description varchar(300),
  subtitle varchar(100),
  metadata varchar(100),
  title varchar(100),
  site varchar(10),
  status varchar(10),
  datescraped TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (job_id, site)
);

CREATE TABLE IF NOT EXISTS aboutme (
  id SERIAL PRIMARY KEY,
  linkedin varchar(25),
  portfolio varchar(25),
  github varchar(25),
  education varchar(50),
  educationyear varchar(15),
  jobonetitle varchar(20),
  joboneyear varchar(15),
  jobonedescription varchar(50),
  jobtwotitle varchar(20),
  jobtwoyear varchar(15),
  jobtwodescription varchar(50),
  keywords varchar(50)
);