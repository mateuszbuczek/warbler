bcrypt to hash password
bodyparser to make post request and extract data from body of the request
jsonwebtoken to ensure that user is logged in
cors(cross-origin-resource-sharing) to make request to app from different ports

jwt generates token based on .env key. jwt authorize user, bcrypt authenticate

http localhost:8081
http POST localhost:8081/api/auth/signup data
http POST localhost:8081/api/auth/signin
