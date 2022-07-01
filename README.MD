## Dynamodb Knowledge Sharing
- [Slide](https://docs.google.com/presentation/d/1GX2dxHTsok3OhC6wYEbQi-YoLTzTIXjp141ICED3r8Y/edit?usp=sharing)

## Set up aws cli
https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
```
aws configure
```

## Set up dynamodb local
```
docker pull amazon/dynamodb-local
docker run -p 65000:8000 amazon/dynamodb-local
```

## Run code
```
npm i
npm run init
npm run query
```
