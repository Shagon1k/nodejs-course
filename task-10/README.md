# Summary

Congratulations, we are almost on the finish line! In this task you will need to modify your Node.js application to make it production ready.

# Acceptance criteria

**Note:** TypeScript should be used.

1. Application has proper config management: environment variables are used instead of any hardcoded values
2. Graceful shutdown is implemented
3. Healthcheck API endpoint is implemented. It checks if server is running and if connection with database is established. It returns status code 200 if everything is ok, otherwise 500.
4. Winston is used for all application logs. All logs are reviewed, proper log levels are set for all of them. Application logs are written to console.
5. Logging of incoming requests is added: it contains date, log level, request method, request path and request duration. The format is the following:

```
[Mon, 01 Jan 2024 14:00:00] INFO GET /api/profile/cart - 112ms
[Mon, 01 Jan 2024 14:00:00] INFO PUT /api/profile/cart - 45ms
```

6. Update npm the scripts for running application to support production and non-productions environments.
   - If `NODE_ENV=production`, no DEBUG logs are printed
   - If `NODE_ENV=test`, all logs are printed
7. Dockerize the application according to best practices, try getting an image with as minimal size as possible.

# Notes

## Application Pre-setup

1. Create `.env.dev` file with variables:
   - `APP_PORT`: Application port to use;
   - `POSTGRES_DB`: PostgreSQL database name _(keep naming, used for Docker configuration)_;
   - `POSTGRES_USER`: PostgreSQL root username _(keep naming, used for Docker configuration)_;
   - `POSTGRES_PASSWORD`: PostgreSQL root password _(keep naming, used for Docker configuration)_;
   - `POSTGRES_HOST`: PostgreSQL host name _("localhost" with default Docker config)_;
   - `POSTGRES_PORT`: PostgreSQL database port _(e.g. "5435", keep aligning with Docker config)_;
   - `AUTH_TOKEN_KEY`: Secret key used for JWT token generation;
2. To setup your PostgreSQL use `npm run db:start:local`.
3. Application includes **migrations** _(for DDLs)_ and **seeds** _(for DMLs)_:
   - (optional) If migrations do not exist/deleted accidentally - use: `npx mikro-orm migration:create`;
   - To create tables in database use: `npx mikro-orm migration:up`;
   - To fill tables with predefined testing data use: `npx mikro-orm seeder:run`;
   - Alternatively instead of 2 previous points `npx mikro-orm migration:fresh --seed` could be used, which will drop database, re-create migration and run seeds.
4. Then you are ready to go.
5. (optional) Application is also adapted to work with "production" config. You can handle it by using `.env.prod` configuration file.

# Additional tasks (not evaluated)

1. Use Docker compose for all the local infrastructure (app and DB)
2. Add few [husky](https://www.npmjs.com/package/husky) hooks to your app to: check the [commit](https://www.npmjs.com/package/@commitlint/config-conventional) message, run linting script on commit, run unit tests on push; setup any static code analyser and perform quality scan over your app; check whether you have secure npm dependencies
3. Set up a [local](https://docs.docker.com/registry/) or any free container registry ([DockerHub](https://hub.docker.com/), [AWS ECR](https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html), [Azure Container Registry](https://azure.microsoft.com/en-us/products/container-registry/), or [Google Artifact Registry](https://cloud.google.com/blog/products/application-development/understanding-artifact-registry-vs-container-registry)) and publish your image there; pull image from registry and run it; publish few different versions of your app (with proper tags) to the registry
4. Create a repository in internal GitBud.epam.com; push the code of your Node.js app there; based on the sample template create [.gitlab-ci.yml](https://docs.gitlab.com/ee/ci/index.html#the-gitlab-ciyml-file) template to run a simple CI/CD which will contain all the jobs from the mandatory part (`eslit`, `tests`, `npm audit`, `build stage` (dockerise the app), and (optionally) `static code analysis`) that will be executed by shared worker; investigate [GitLab CI/CD capabilities](https://docs.gitlab.com/ee/ci/), and push the template to start and test the pipeline (note, that your pipeline can be executed with some delay due to a limited capacity of shared workers); providing you created a cloud container registry (AWS ECR, DockerHub, etc.), configure credentials and push the built docker image to the container registry from the pipeline.
