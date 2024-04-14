\echo 'Delete and recreate FoodieFit db?'
\prompt 'Return for yes or control-C to cancel > ' foo 

DROP DATABASE foodie_fit;
CREATE DATABASE foodie_fit;
\connect foodie_fit

\i schema_setup.sql
\i seed.sql