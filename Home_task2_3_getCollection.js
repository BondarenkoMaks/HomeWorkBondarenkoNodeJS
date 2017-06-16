var club_facility_ids = ["c68c39f0-a5ae-11e6-87d4-0763f85bc821", "c68c39f0-a5ae-11e6-87d4-0763f85bc824"];
db.getCollection('club_facilities').aggregate([
                                {$unwind:"$club_facilities"},  
                                {$lookup: {
                                            from: "club_rules",
                                            localField: "club_id",
                                            foreignField: "club_id",
                                            as: "rulesAll"}},
                                 {$unwind:"$rulesAll"},
                                
                                 {$project:{  _id: 0,                                               
                                              club_facility_name_en: "$club_facilities.club_facility_name_en",
                                              club_facility_name_it: "$club_facility_name_it",
                                              club_facility_id: "$club_facilities.club_facility_id",
                                              club_facility_rule_id: "$club_facilities.club_facility_rule_id",                          
                                              rule:{
                                                $filter: {
                                                    input: "$rulesAll.rules",
                                                    as: "item",
                                                    cond: { $eq: [ "$$item.rule_id", "$club_facilities.club_facility_rule_id" ] }}
                                              }
                                           }
                                  },
                                 {$match: {club_facility_id: {$in: club_facility_ids}}}
                                 ])     
       