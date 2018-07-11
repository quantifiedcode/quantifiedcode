#!/bin/bash
ps -ef | grep "python manage.py runworker" |grep -v grep > /dev/null
if [ $? != 0 ]
then
       
       cd  /root/quantifiedcode
       python manage.py runworker & > /dev/null
fi

ps -ef | grep "python manage.py runserver" |grep -v grep > /dev/null
if [ $? != 0 ]
then
       
       cd  /root/quantifiedcode
       python manage.py runserver & > /dev/null
fi


