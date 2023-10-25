/**
 * This script is to insert initial data inside the collection memes of the database
 * MemeMaker you can use it with the cloud cluster interface
 */
 
// Insert blank meme array
db.getCollection('memes').insertMany([
    {
        titre: "Two Buttons",
        dragboxesDatas: [
            {left: 52, top: 106, rot: 348, width: 190, height: 100},
            {left: 269, top: 78, rot: 346, width: 150, height: 86},
            {left: 165, top: 791, rot: 0, width: 273, height: 71},
        ]
    }
]);


// display the final initial data
db.getCollection('memes').find({});