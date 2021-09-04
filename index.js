"use strict";

const wayedges = require('./wayedges_test.json');

const { writeFileSync } = require('fs');

console.log(`Going to process ${wayedges.length} line-data`);


for(let i = 0; i < wayedges.length; i++){

    const { from_point, to_point } = wayedges[i];

    
    const isLineBi = wayedges.find( elem => elem.from_point === to_point && elem.to_point === from_point );


    wayedges[i].biDirectional = isLineBi ? true : false;


}


writeFileSync('wayedges_export.json', JSON.stringify(wayedges));
console.log("\n File exported to 'wayedges_export.json' \n");
