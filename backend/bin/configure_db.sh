#!/bin/bash
export PGPASSWORD='node_password'
echo "Configuring corgi stack db"
dropdb -U node_user corgistackdb
createdb -U node_user corgistackdb
psql -U node_user corgistackdb <'./bin/sql/generation.sql'
psql -U node_user corgistackdb <'./bin/sql/corgi.sql'
psql -U node_user corgistackdb <./bin/sql/trait.sql
psql -U node_user corgistackdb <./bin/sql/corgiTrait.sql
node ./bin/insertTraits.js
#  echo `pwd`
#  test -e /sql/generation.sql && echo True

echo "done Configuring corgi stack db"