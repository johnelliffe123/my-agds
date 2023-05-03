import { MongoClient, ServerApiVersion } from 'mongodb';

if (!process.env.MONGODB_URI) {
	throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
const optionsX = {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: false,
		deprecationErrors: true,
	},
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

console.log('about to connect to MongoDB!');
console.log('uri: ' + uri);
async function run() {
	try {
		client = new MongoClient(uri, {});

		// Connect the client to the server	(optional starting in v4.7)
		await client.connect();
		await listDatabases(client);

		// Send a ping to confirm a successful connection
		await client.db('admin').command({ ping: 1 });
		console.log(
			'Pinged your deployment. You successfully connected to MongoDB!'
		);
	} catch (error) {
		console.log('error');
		console.log(error);
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}
run().catch(console.dir);

if (process.env.NODE_ENV === 'development') {
	console.log('MongoDB developmemt mode');
	// In development mode, use a global variable so that the value
	// is preserved across module reloads caused by HMR (Hot Module Replacement).
	let globalWithMongo = global as typeof globalThis & {
		_mongoClientPromise?: Promise<MongoClient>;
	};

	if (!globalWithMongo._mongoClientPromise) {
		client = new MongoClient(uri, options);
		globalWithMongo._mongoClientPromise = client.connect();
	}
	clientPromise = globalWithMongo._mongoClientPromise;
} else {
	console.log('MongoDB production mode');
	// In production mode, it's best to not use a global variable.
	client = new MongoClient(uri, options);
	clientPromise = client.connect();
}

console.log('MongoDB got a client promise');


/**
 * Print the names of all available databases
 * @param {MongoClient} client A MongoClient that is connected to a cluster
 */
async function listDatabases(client: MongoClient) {
    console.log("Databases 1:");
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases 2:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
