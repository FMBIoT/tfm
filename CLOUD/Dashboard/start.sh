#!/bin/bash
cp ./.env app/client/.env

docker-compose -p dataports up -d