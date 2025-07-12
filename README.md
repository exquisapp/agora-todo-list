## Local setup

### Installation

Clone the repository:

```bash
git clone https://github.com/exquisapp/agora-todo-list

OR

git clone git@github.com:exquisapp/agora-todo-list
```

Run the following commands:

```bash
cd agora-todo-list
```

```bash
npm install
```

### Start the application

Run the code:

```bash
npm run dev
```

This will start the frontend application:

- Open the application with the URL http://localhost:5173 in the browser

### Testing

Run the test suite:

```bash
npm test
```

## Package with docker

Run the commands

```bash
docker build -t agora-todo-app .
```

```bash
docker run -p 8080:80 agora-todo-app
```

- Access the dockerized application using the URL http://localhost:8080
