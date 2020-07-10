function countLectures(ID,courseName,startDate,endDate){
    return new Promise(function(resolve,reject){

    
    daysOfTheWeek = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
    days = [];
    firebase.database().ref("/StudentsLLT/" + ID + "/" + courseName).once('value').then(function(snap){
        snap.forEach(function(subSnap){
            if(subSnap.val().Lecture!=null){
                days.push(subSnap.key)
            }
        })
    }).then(function(){
        if(startDate!=null)
        startDate = new Date(startDate);
        else
        startDate = new Date("January 2 2020");

        endDate = new Date("April 29 2020");
        
        holidays = setHolidays();
        lectures = 0;
        while(new Date(startDate).getTime()!=new Date(endDate).getTime() && flag!=100)
        {   startDay = convertToDay(startDate)
            i=0;
            if(startDay!="Sunday"){
                for(i=0;i<holidays.length;++i){
                    if(new Date(startDate).getTime() == holidays[i].getTime())
                    {
                        
                    break;
                    }
                }
                if(i==holidays.length)
                {
                    for(j=0;j<days.length;++j){
                        if(startDay == days[j]){
                            ++lectures;
                        }
                    }
                    ++flag;
                }
                
            }
            startDate = new Date(startDate).setDate(new Date(startDate).getDate() + 1)
            
        }
        
        resolve(lectures);
    })

});
    

}
function countLabs(ID,courseName,startDate,endDate){
    return new Promise(function(resolve,reject){

    
    daysOfTheWeek = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
    days = [];
    firebase.database().ref("/StudentsLLT/" + ID + "/" + courseName).once('value').then(function(snap){
        snap.forEach(function(subSnap){
            if(subSnap.val().Lab!=null){
                days.push(subSnap.key)
            }
        })
    }).then(function(){
        if(startDate!=null)
        startDate = new Date(startDate);
        else
        startDate = new Date("January 2 2020");
        endDate = new Date("April 29 2020");
        
        holidays = setHolidays();
        labs = 0;
        while(new Date(startDate).getTime()!=new Date(endDate).getTime() && flag!=100)
        {   startDay = convertToDay(startDate)
            i=0;
            if(startDay!="Sunday"){
                for(i=0;i<holidays.length;++i){
                    if(new Date(startDate).getTime() == holidays[i].getTime())
                    {
                        
                    break;
                    }
                }
                if(i==holidays.length)
                {
                    for(j=0;j<days.length;++j){
                        if(startDay == days[j]){
                            ++labs;
                        }
                    }
                    ++flag;
                }
                
            }
            startDate = new Date(startDate).setDate(new Date(startDate).getDate() + 1)
            
        }
        resolve(labs)
    })
    
})
}
function countTutes(ID,courseName,startDate,endDate){
    return new Promise(function(resolve,reject){

    
    daysOfTheWeek = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
    days = [];
    firebase.database().ref("/StudentsLLT/" + ID + "/" + courseName).once('value').then(function(snap){
        snap.forEach(function(subSnap){
            if(subSnap.val().Tute!=null){
                days.push(subSnap.key)
            }
        })
    }).then(function(){
        if(startDate!=null)
        startDate = new Date(startDate);
        else
        startDate = new Date("January 30 2020");
        endDate = new Date("April 29 2020");
        
        holidays = setHolidays();
        Tutes = 0;
        while(new Date(startDate).getTime()!=new Date(endDate).getTime() && flag!=100)
        {   startDay = convertToDay(startDate)
            i=0;
            if(startDay!="Sunday"){
                for(i=0;i<holidays.length;++i){
                    if(new Date(startDate).getTime() == holidays[i].getTime())
                    {
                       
                    break;
                    }
                }
                if(i==holidays.length)
                {
                    for(j=0;j<days.length;++j){
                        if(startDay == days[j]){
                            ++Tutes;
                        }
                    }
                    ++flag;
                }
                
            }
            startDate = new Date(startDate).setDate(new Date(startDate).getDate() + 1)
            
        }
        resolve(Tutes);
       
    })
    
})
}
function convertToDay(date){
    date = new Date(date);
    if(date.getDay()==0)
        return "Sunday";
    else if(date.getDay()==1)
    return "Monday";
    else if(date.getDay()==2)
    return "Tuesday";
    else if(date.getDay()==3)
    return "Wednesday";
    else if(date.getDay()==4)
    return "Thursday";
    else if(date.getDay()==5)
    return "Friday";
    else if(date.getDay()==6)
    return "Saturday";
    
    

}

function setHolidays(){
    //start= 2-1-2020, end - 29-5-2020
    // 28-1-2020, 24-28(feb), 9-13(march)
    holidays = [];
    holidays.push(new Date(2020,0,26));

    startTemp = new Date(2020,1,24);
    endTemp = new Date(2020,1,28);
flag =0;
    while(new Date(startTemp).getTime()!=new Date(endTemp).getTime() )
    {
        holidays.push(new Date(startTemp));
        startTemp = new Date(startTemp).setDate(new Date(startTemp).getDate()+1);
        
        
    }
    holidays.push(new Date(endTemp));
    startTemp = new Date(2020,2,9)
    endTemp = new Date(2020,2,13)
    
    while(new Date(startTemp).getTime()!=new Date(endTemp).getTime() )
    {
        holidays.push(new Date(startTemp));
        startTemp = new Date(startTemp).setDate(new Date(startTemp).getDate()+1);
     
    }
    holidays.push(new Date(endTemp));
    
    return holidays;
}
function countLLT(ID,courseName,startDate,endDate){
    return new Promise(function(resolve,reject){
    var classTypesCount = new Object();
    countLectures(ID,courseName,startDate,endDate).then(function(lectureCount){
        classTypesCount.lectures=lectureCount;
    }).then(function(){
        countLabs(ID,courseName,startDate,endDate).then(function(labCount){
            classTypesCount.labs=labCount;
        }).then(function(){
            countTutes(ID,courseName,startDate,endDate).then(function(tuteCount){
                classTypesCount.tutes = tuteCount;
            }).then(function(){
                firebase.database().ref("/Attendance/" + ID +  "/" + courseName + "/" + "TotalClasses").set({
                  Lecture:classTypesCount.lectures,
                  Lab:classTypesCount.labs,
                  Tute:classTypesCount.tutes

                }).then(function(){
                    resolve();
                })
            })
        })
    })
})
}
function run(){
   countLLT("sn178","CSD204").then(function(){
       missableClasses("sn178","CSD204")
   })
}

function missableClasses(ID,courseName){
    var lectures,tutes,labs,totalPoints,newTotal;
    var lecturesInitial,tutesInitial,labsInitial;
    var weightLecture,weightLab,weightTute;
    var flagL=0;var flagLab=0; var flagT=0;var flagTest = 0
    console.log("in missable classes");
    firebase.database().ref("/Attendance/" + ID + "/" + courseName).once('value').then(function(snap){
      lectures = snap.val().Lecture;lecturesInitial=lectures
      labs = snap.val().Lab;labsInitial=labs;
      tutes = snap.val().Tute;tutesInitial=tutes;
      console.log(lectures + " " + labs + " " + tutes);
    }).then(function(){
        checkWeight("Lecture",courseName).then(function(lectureWeight){
            weightLecture=lectureWeight;
        }).then(function(){
            checkWeight("Lab",courseName).then(function(labWeight){
                weightLab=labWeight;
            }).then(function(){
                checkWeight("Tute",courseName).then(function(tuteWeight){
                    weightTute=tuteWeight;
                }).then(function(){
                    
                console.log("after checking weights")
                totalPoints = findTotal(lectures,labs,tutes);
                console.log(totalPoints)
                newTotal = totalPoints;
                attendance = (newTotal/totalPoints)*100;
                console.log(attendance);
                while((flagL!=1 || flagLab!=1 || flagT!=1) && flagTest<10)
                {
                    if(lectures!=0 && attendance>75 && flagL!=1){
                        lectures = lectures-1;
                        newTotal = findTotal(lectures,labs,tutes);
                        attendance = findAttendance(newTotal);
                        if(attendance<75){
                            lectures = lectures+1;flagL=1;
                        }
                    }
                    else if(lectures==0)
                    flagL=1;
                    
                    
                    if(labs!=0 && attendance>75 && flagLab!=1){
                        labs = labs-1;
                        newTotal = findTotal(lectures,labs,tutes);
                        attendance = findAttendance(newTotal);
                        if(attendance<75){
                            labs = labs+1;flagLab=1;
                        }
                    }
                    else if(labs==0)
                    flagLab=1;
                    
                    if(tutes!=0 && attendance>75 && flagT!=1){
                        tutes = tutes-1;
                        newTotal = findTotal(lectures,labs,tutes);
                        attendance = findAttendance(newTotal);
                        if(attendance<75){
                            tutes = tutes+1;flagT=1;
                        }
                    }
                    else if(tutes==0)
                    flagT=1
        
                    ++flagTest;
                }
                console.log((lecturesInitial - lectures) + " " + (labsInitial - labs) + " "  + (tutesInitial - tutes))
                missableClasses = [lecturesInitial - lectures,labsInitial - labs,tutesInitial - tutes]
                firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissableClasses").set({
                    Lecture:missableClasses[0],
                    Lab:missableClasses[1],
                    Tute:missableClasses[2]

                });
            })
            })
        })
        })
    function findTotal(lectures,labs,tutes){
        return lectures*weightLecture + labs*weightLab + tutes*weightTute;
    }
    function findAttendance(newTotal){
        return (newTotal/totalPoints)*100;
    }
}
function checkWeight(subject,courseName){
    var subjectTimings,brokenSlots;
    var subject = subject;
    console.log("in check weight")
return new Promise(function(resolve,reject){
    firebase.database().ref("/StudentsLLT/" + ID  + "/" + courseName).once('value').then(function(snap){
        snap.forEach(function(subSnap){
            
            if(subject=="Lecture"){
            
            if(subSnap.val().Lecture!=null){
                subjectTimings = subSnap.val().Lecture;
                
              }
            }
            else if(subject=="Lab"){
                if(subSnap.val().Lab!=null){
                    subjectTimings = subSnap.val().Lab;
                    
                  }
            }
            else if(subject=="Tute"){
                if(subSnap.val().Tute!=null){
                    subjectTimings = subSnap.val().Tute;
                    
                  }
            }
            
        })
        
    }).then(function(){
        if(subjectTimings!=null){
            
        brokenSlots = BreakTimings(subjectTimings)
        resolve(brokenSlots/2);
        }
        else
        resolve(0);
    })
})

}

function BreakTimings(timings){
    var totalLength = 0;
    time = timings.split("-");
 start = time[0];
 end = time[1];
 while(start!=end)
 {
     prevStart = start;
     tempSplit = start.split(':');
     if(tempSplit[1]=="00"){
         tempSplit[1] = "30"
        start = tempSplit[0] +":" + tempSplit[1];
        ++totalLength;
        }
        else if(tempSplit[1]=="30"){
            tempSplit[1] = "00";
            tempSplit[0] = (parseInt(tempSplit[0]) + 1).toString();
           start = tempSplit[0] +":" + tempSplit[1];
          ++totalLength;
           }
 }

 return totalLength;
}
ID = "sn178";

function testPromise(){
    return new Promise(function(resolve,reject){
        var k=0;
        for(i=0;i<10;++i)
        {
            firebase.database().ref("/testing/" +i).set({
                test:i
            }).then(function(){
                ++k;
               if(k==10)
               resolve("nigaaa"); 
                /*if(i==9){
                resolve("nigaaaa");
                console.log("resolved")}
                */
            })
        }
    })
}
