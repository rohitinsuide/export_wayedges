"use strict";


const { MongoClient } = require('mongodb');


const client = new MongoClient('mongodb://localhost:27017');


async function main() {
    await client.connect();
    console.log('Connected successfully to server');
    const collection = client.db('insuide').collection('wayedges');
    
    const wayedges = await collection.find({appname:'bud'}).toArray();
    
    console.log(wayedges);

    return 'done.';
  }


  main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());


// const { writeFileSync } = require('fs');

// console.log(`Going to process ${wayedges.length} line-data`);


// for(let i = 0; i < wayedges.length; i++){

//     const { from_point, to_point } = wayedges[i];

    
//     const isLineBi = wayedges.find( elem => elem.from_point === to_point && elem.to_point === from_point );


//     wayedges[i].biDirectional = isLineBi ? true : false;


// }


// writeFileSync('wayedges_export.json', JSON.stringify(wayedges));
// console.log("\n File exported to 'wayedges_export.json' \n");
