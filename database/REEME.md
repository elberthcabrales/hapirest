-create models in new database
knex migrate:latest
-run seeder for create the first user 
knex seed:run
    note: when you runs seeder will delete all users in table and create initial user with password en md5

-se crea el usario elberthcanrales@gmail.com con la contraseña cabrales