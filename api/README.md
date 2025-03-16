## Run Locally

Install project with yarn

```bash
   yarn
``` 

to initilize Prisma
``` 
    yarn db:init   
``` 

to run DataBase migrations
``` 
    yarn db:migrate   
``` 

if you want to create DataBase migration
``` 
    yarn db:migrate:create migration-name   
``` 

to see your database while running  

``` 
   yarn db:view   
```

to Run the project 

``` 
    yarn dev   
```  

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT=5000` 

`DATABASE_URL = file:../sqlite-data/task.db`

## Docker

to Run docker compose
``` 
    docker compose up
``` 

## Stept to run


after running docker compose 

first you need to create inital migration if it is not there, if it is there just run migrate file and it will create db