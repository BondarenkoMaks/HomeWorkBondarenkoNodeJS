var requests =[];
db.club_activities.find({}).snapshot().forEach(function(document) {
    document.club_activities_scheduling.forEach(function(element) {
               
    requests.push(
            {
                updateOne : { 
                    "filter": {"_id": document._id , "club_activities_scheduling": element}, 
                    "update": {"$set": {"club_activities_scheduling.$.booking_till_hours": 0}}, 
                    "upsert": true 
                } 
            } 
        ); 
    });
});
db.club_activities.bulkWrite(requests);