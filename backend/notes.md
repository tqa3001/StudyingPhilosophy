# Some comments on the internet

**Perfomance**
[Large collections](https://www.mongodb.com/community/forums/t/storing-possible-millions-of-comments-in-a-single-collection/183010)
- I believe as long as the collection is indexed properly (see Create Indexes to Support Your Queries 4) and if the working set fit in RAM, it should be fast enough. Of course this is also subject to the hardware spec, and whether the hardware can handle the workload or not.
- "Before committing to any one solution, I’d recommend you to simulate the workload first to see if the design would work or not" 

[Storing ObjectIds in a schema](https://stackoverflow.com/questions/72596362/mongoose-best-way-to-store-a-set-of-ids-in-a-document-map-array)
- "Make the MongoDB server do most of the work. With the right aggregation pipeline, all the filtering/etc. can be done by the server and simplify your post-processing. Filtering at the server will also reduce the amount of data returned and save a lot of network communication time." 

**Read later**
[MongoDB edge cases](https://kb.objectrocket.com/mongo-db/mongodb-null-or-empty-a-look-at-some-edge-cases-for-mongodb-and-how-to-query-for-them-470)