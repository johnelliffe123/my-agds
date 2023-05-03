import { Fragment } from 'react';
import { InferGetServerSidePropsType } from 'next';
import { DocumentTitle } from '../../../../components/DocumentTitle';
import clientPromise from '../../../../lib/mongodb';
import { PropertyMgtPropertyTable } from '../../../../components/PropertyMgt/PropertyMgtPropertyTable';
// import  { Mssql } from 'mssql';
//import mssql from 'mssql';


import {
	SqlClient
  } from 'msnodesqlv8'

  const sql: SqlClient = require('msnodesqlv8')


export interface IProperty {
	borough: string;
	cuisine: string;
	name: string;
	restaurant_id: string;
}

export default function PropertyMgtPropertyList({
	propertyList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<Fragment>
			<DocumentTitle title="Property Management | Property List" />
			<p>fish</p>
			<PropertyMgtPropertyTable propertyList={propertyList} />
		</Fragment>
	);
}

const sqlConfig = {
	user: process.env.DB_USER,
	password: process.env.DB_PWD,
	database: process.env.DB_NAME,
	server: 'localhost',
	pool: {
		max: 10,
		min: 0,
		idleTimeoutMillis: 30000,
	},
	options: {
		encrypt: true, // for azure
		trustServerCertificate: false, // change to true for local dev / self-signed certs
	},
};

export async function getServerSideProps() {
	console.log('getServerSideProps');

	let properties: IProperty[] = [];

		try {
			// make sure that any items are correctly URL encoded in the connection string
			//await mssql.connect(sqlConfig);
			//await mssql.connect('Server=Localhost;Database=JohnTest;Trusted_Connection=True;');
			//await mssql.connect('Server=Localhost;Database=JohnTest;User Id=developeradmin;Password=Ladder202303!');
			//await mssql.connect('Server=Localhost; Initial Catalog=master;Integrated Security=true;');

			//const sql: SqlClient = require('msnodesqlv8');

			const conn = 'Server=Localhost;Database=Master;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}';

			const query = "SELECT name FROM sys.databases";

		sql.query(conn, query, (err, rows) => {
    		console.log(rows);
		});

			const result = await mssql.query(`select * from dbo.PropertyMgt`);

			//properties = result.recordset.map((r) => (
			//	return { r.text }
			//));


			console.dir(result);
		} catch (error) {
			console.log('error');
			console.log(error);
		}

	return { props: { propertyList: properties } };



	/*
	const client = await clientPromise;
	await client.connect();
	const db = client.db('property_management');

	const properties: IProperty[] = await db
		.collection<IProperty>('properties')
		.find(
			{}
		)
		.limit(100)
		.toArray();

		return { props: { propertyList: properties } };
		*/
	// return { props: {} };
}
