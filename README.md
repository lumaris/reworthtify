# REWORTHTIFY API
Base api for spotify data consumption

### Requirements

* Docker v 20.10.5
* docker-compose v 1.28.5

### Document content

* [Run in local environmet with docker-compose](#run-local-environmet)
* [Run test](#test)
* [Documentation](#documentation)

#run-local-environmet

1.- Step-by-step shell commands
```shell
git clone https://github.com/lumaris/api.git
cd reworthtify
npm install
docker-compose up
```
**Note: in the .env file your access credentials to spotify api CLIENT_ID CLIENT_SECRET
### test

To execute e2e test scripts with api up use the following command:

```
npm run test
```

### Documentation

You can see the documentation in https://documenter.getpostman.com/view/2186949/UVXknugL