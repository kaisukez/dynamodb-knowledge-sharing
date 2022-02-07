## dynamodb-playground

## set up aws cli
https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
```
aws configure
```

## set up dynamodb local
```
docker pull amazon/dynamodb-local
docker run -p 65000:8000 amazon/dynamodb-local
```

## run code
```
npm i
npm run init
npm run query
```