#!/bin/sh
# wait-for-mysql.sh

echo "Waiting for mysql"
until mysql -h 127.0.0.1 -P 3306 -u root -p <password> &> /dev/null
do
  printf "."
  sleep 1
done

echo -e "MySql is up - executing command"
