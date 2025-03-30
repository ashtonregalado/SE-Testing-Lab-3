To run locally:

1. Create a database in MongoDB Compass
2. Create a .env file inside the backend folder
3. Add this inside the .env file: MONGO_URI_DEV = mongodb://localhost:27017/your_database_name
4. Run npm i
5. In a separate terminal, run 'npm run dev' in the root directory
6. In another separate terminal, enter 'cd backend' and the run 'npm run dev'

To run the tests:

1. Create a database in MongoDB Compass to use for testing
2. Create a .env file inside the backend folder(if not yet created)
3. Add this inside the .env file: MONGO_URI_TEST = mongodb://localhost:27017/your_database_name
4. Run npm i
5. in the root directory, run 'npm run test'
