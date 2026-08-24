#!/bin/bash

clear

CN="postgresql://root@club.local:26257/defaultdb?sslmode=disable"

#psql "$CN" -c "SELECT * FROM clubkvs.kvs;"
psql "$CN" -c "SELECT workspace,namespace,key,convert_from(value,'UTF8') AS value, encode(md5,'hex') AS md5 \
FROM clubkvs.kvs ORDER BY namespace, key;"

