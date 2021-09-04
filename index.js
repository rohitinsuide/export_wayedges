"use strict";


const yargs = require("yargs");

const argv = yargs
        .option('appName', {
            alias: 'a',
            demandOption: true,
            describe: 'Appname to export route data for',
            type: 'string'
        })
        .argv;


const { MongoClient } = require('mongodb'),
      { writeFileSync } = require('fs');


const client = new MongoClient('mongodb://localhost:27017');


async function main() {
    await client.connect();
    console.log('Connected successfully to mongo');
    const database = client.db('insuide');
    
    const edge_collection = database.collection('wayedges'),
          point_collection = database.collection('waypoints');

    const result = {
        "success": true,
        "edges": [],
        "markers": []
    };

    const appname = argv.appName;
    
    const wayedges = await edge_collection.find({appname}).toArray();
    
    console.log(`Going to process ${wayedges.length} line-data`);


    for(let i = 0; i < wayedges.length; i++){

        const { _id, from_point, to_point } = wayedges[i];
        
        const isLineBi = wayedges.find( elem => elem.from_point === to_point && elem.to_point === from_point );

        const body = { _id, from_point, to_point, biDirectional: isLineBi ? true : false };

        result.edges.push(body);

    }

    const waypoints =  await point_collection.find({appname}).toArray();

    for(let i = 0; i < waypoints.length; i++){

        const {_id, lat, level, lng, terminal} = waypoints[i];

        result.markers.push({_id, lat, level, lng, terminal});

    }



    writeFileSync('result.json', JSON.stringify(result));



    return "\n File exported to 'result.json' \n";
  }


  main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
  