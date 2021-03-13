A To-do-list app using 

- a Postgresql database 
- an Active Record MVC API using Sequelize
- an Express server
- a dynamic vanilla JS front

To initialise:

- make sure postgresql is installed, then run ```psql -U postgres``` in a terminal.
- Then enter the following command: ```CREATE ROLE yourname WITH ENCRYPTED PASSWORD 'yourpassword';```
- To create the DB file and give the user owner rights: ```CREATE DATABASE databasename OWNER yourname;```
- Then ```ALTER ROLE yourname WITH LOGIN```

Now that your database is created, you can fill it up with tables.
Run ```psql -U yourname -f therelativepathleadingto/create_tables.sql ```
And to insert values, ```psql -U yourname -f therelativepathleadingto/import_data.sql ```

Now you can launch ```node index``` at the project root, and start filling your list.


