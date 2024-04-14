\echo 'Delete and recreate FoodieFit db?'
\prompt 'Return for yes or control-C to cancel > ' foo 

DROP DATABASE foodie_fit;
CREATE DATABASE foodie_fit;
\connect foodie_fit

\i schema_setup.sql
\i seed.sql

\echo 'Delete and recreate foodie_fit_test?'
\prompt 'Return for yes or control-C to cancel >' foo

DROP DATABASE foodie_fit_test;
CREATE DATABASE foodie_fit_test;
\connect foodie_fit_test

\i schema_setup.sql
