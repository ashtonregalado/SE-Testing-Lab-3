To run locally:

1. Create a database in MongoDB Compass
2. Create a .env file inside the backend folder
3. Add this inside the .env file: MONGO_URI_DEV = {connection_string}{your_database_name}, for example, MONGO_URI_DEV = mongodb://localhost:43433/xxxx
4. Run npm i
5. In a separate terminal, run 'npm run dev' in the root directory
6. In another separate terminal, enter 'cd backend' and then run 'npm run dev'

To run the tests:

1. Create a database in MongoDB Compass to use for testing
2. Create a .env file inside the SE-TESTING-LAB-3 folder
3. Add this inside the .env file: MONGO_URI_TEST = {connection_string}{your_database_name}, for example, MONGO_URI_TEST = mongodb://localhost:43433/xxxx
4. Run npm i
5. In the SE-TESTING-LAB-3 directory, run 'npm run test' or 'yarn test'
