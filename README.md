# ReignDesign - Test

### Running the app

- Install [Docker](https://www.docker.com/get-docker).
- Install [Docker Compose](https://docs.docker.com/compose/install/).

- Run

```bash
docker-compose up
```

- Visit `http://localhost:3000`

### Caveats

- If you want to make updates to the app, you should install all dependencies locally to make tooling work like `eslint`, `husky`, `prettier`, etc.

```bash
npm i
```

- Make sure to ports are open
  - 3000 (app)
  - 4000 (dev-server)
  - 9229 (server debugging)
