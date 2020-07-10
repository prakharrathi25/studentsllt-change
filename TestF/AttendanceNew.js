function missed(ID,courseName){
    var lecture,lab,tute;
    var missableLectures, missableLabs, missableTutes;
    var missedLect =0; var missedLab=0; var missedTut=0;
    courseName=document.getElementById("courseName").value;
    lecture = document.getElementById("LectureMissed");
    lab = document.getElementById("LabMissed");
    tute = document.getElementById("TuteMissed");
    
    firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissableClasses").once('value').then(function(snapshot){
        missableLectures = snapshot.val().Lecture;  missableLabs = snapshot.val().Lab;   missableTutes = snapshot.val().Tute;
        if(lecture.checked == true){ // handling the code when lectures or tutes become 0
        missableLectures = missableLectures -1;
        missedLect=1}
        if(lab.checked == true){
        missableLabs = missableLabs -1;
        missedLab=1}
        if(tute.checked == true){
        missableTutes = missableTutes -1;
        missedTut=1}

        firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissableClasses").set({
            Lecture:missableLectures,
            Lab:missableLabs,
            Tute:missableTutes
        }).then(function(){
            firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissedClasses").once('value').then(function(snap){
                if(snap.val()==null){
                    console.log("in null");
                firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissedClasses").set({
                    Lecture:missedLect,
                    Lab:missedLab,
                    Tute:missedTut
                })
            }
                else
                {   if(missedLect ==1)
                    missedLect = snap.val().Lecture +1;
                    else
                    missedLect = snap.val().Lecture
                    if(missedLab==1)
                    missedLab = snap.val().Lab +1;
                    else
                    missedLab = snap.val().Lab
                    if(missedTut==1)
                    missedTut = snap.val().Tute +1;
                    else
                    missedTut = snap.val().Tute;
                    firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissedClasses").set({
                        Lecture:missedLect,
                        Lab:missedLab,
                        Tute:missedTut
                    })
                }

            })
            /*firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" +" MissedClasses").once('value').then(function(snapshot){
             
                 console.log(snapshot.val());
                if(snapshot.val()==null){
                    console.log("yes")
                    firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissedClasses").set({
                        Lecture:missedLect,
                        Lab:missedLab,
                        Tute:missedTut
                    }).then(function(){  }) //then
                }
                //else{
                    console.log("nope")
                    missedLect = snapshot.val().Lecture +1;
                    missedLab = snapshot.val().Lab +1;
                    missedTut = snapshot.val().Tute +1;
                    firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissedClasses").set({
                        Lecture:missedLect,
                        Lab:missedLab,
                        Tute:missedTut
                    }).then(function(){}) //then
                //}
                })
                */
        })

    })
    
    
    
}
function run(){
    ID="sn178"
    courseName=document.getElementById("courseName").value;
    missed(ID,courseName)
    //condoned(ID,courseName);
   // holiday();
  
   
   
}

function TradeForLecture(){
    courseName=document.getElementById("courseName").value;
    var missableLectures, missableLabs, missableTutes;
    var weightLecture, weightLab, weightTute;
    ID = "sn178"
    firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissableClasses").once('value').then(function(snapshot){
        missableLectures = snapshot.val().Lecture;  missableLabs = snapshot.val().Lab;   missableTutes = snapshot.val().Tute;
        
            checkWeight("Lecture",courseName).then(function(lectureWeight){
                weightLecture = lectureWeight;
                if(weightLecture==0)
                {
                    window.alert(courseName + " " + "does not have a lecture")
                    return;
                }
                checkWeight("Lab",courseName).then(function(labWeight){
                    weightLab = labWeight;
                    checkWeight("Tute",courseName).then(function(tuteWeight){
                        weightTute = tuteWeight;
                        if(missableLabs!=0){
                        var trade;
                        if(weightLab >= weightLecture){
                            trade = Math.floor(weightLab/weightLecture);
                            missableLectures = missableLectures + trade;
                            missableLabs = missableLabs -1;
                        }
                        else{
                            trade = Math.ceil(weightLecture/weightLab)
                            if(missableLabs >=trade){
                                missableLabs = missableLabs - trade
                                missableLectures = missableLectures + 1
                            }
                            else{
                                weight1 = weightLab*missableLabs;
                                if(missableTutes==0)
                                window.alert("Nigga F");
                                else{
                                    if(weightTute >=weightLecture){
                                        trade = Math.floor(weightTute/weightLecture);
                                        missableLectures = missableLectures + trade;
                                        missableTutes = missableTutes -1;
    
                                    }
                                    else if(weightTute < weightLecture){
                                        trade = Math.ceil(weightLecture/weightTute);
                                        if(missableTutes >= trade){
                                            missableTutes = missableTutes - trade;
                                            missableLectures = missableLectures + 1;
                                        }
                                        else {
                                            if(missableTutes*weightTute + weight1 >= weightLecture){
                                            var i;
                                            for(i=1;i<=missableTutes;++i){
                                                trade = Math.ceil(weightLecture/(weight1 + i*weightTute))
                                                if(trade ==1)
                                                break;
                                            }
                                            missableTutes = missableTutes - i;
                                            missableLabs = 0;
                                            missableLectures = missableLectures +1
                                        }
                                        else{
                                            window.alert("Nigga F");
                                        }
                                        }
                                    }
                                    
                                    
                                }
                            }
    
                        }
                       
                    
                        
                }
                else {
                    if(missableTutes==0){
                        window.alert("nigga F");
                    }
                    else{
                        if(weightTute >=weightLecture){
                            
                            trade = Math.floor(weightTute/weightLecture);
                            missableLectures = missableLectures + trade;
                            missableTutes = missableTutes -1;
        
                        }
                        else if(weightTute < weightLecture){
                            trade = Math.ceil(weightLecture/weightTute);
                            if(missableTutes >= trade){
                                missableTutes = missableTutes - trade;
                                missableLectures = missableLectures + 1;
                            }
                            else {
                                window.alert("Nigga F")
                            }
                        }
                        
                    }
                }
                console.log(missableLectures + " " + missableLabs + " " + missableTutes);
                firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissableClasses").set({
                    Lecture:missableLectures,
                    Lab:missableLabs,
                    Tute:missableTutes
                })
            })
                    
                })
            })
        
        
        
        /*firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissableClasses").set({
            Lecture:missableLectures,
            Lab:missableLabs,
            Tute:missableTutes
        }).then(function(){
            console.log()
        })
        */
    })
}
function TradeForLab(){
    courseName=document.getElementById("courseName").value;
    var missableLectures, missableLabs, missableTutes;
    var weightLecture, weightLab, weightTute;
    ID = "sn178"
    firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissableClasses").once('value').then(function(snapshot){
        missableLectures = snapshot.val().Lecture;  missableLabs = snapshot.val().Lab;   missableTutes = snapshot.val().Tute;
        
            checkWeight("Lecture",courseName).then(function(lectureWeight){
                weightLecture = lectureWeight;
                checkWeight("Lab",courseName).then(function(labWeight){
                    weightLab = labWeight;
                    if(weightLab == 0){
                        window.alert(courseName + " " + "does not have a lab")
                    return;
                    }
                    checkWeight("Tute",courseName).then(function(tuteWeight){
                        weightTute = tuteWeight;
                        if(missableLectures!=0){
                        var trade;
                        if(weightLecture >= weightLab){
                            trade = Math.floor(weightLecture/weightLab);
                            missableLabs = missableLabs + trade;
                            missableLectures = missableLectures -1;
                        }
                        else{
                            trade = Math.ceil(weightLab/weightLecture)
                            if(missableLectures >=trade){
                                missableLectures = missableLectures - trade
                                missableLabs = missableLabs + 1
                            }
                            else{
                                weight1 = weightLecture*missableLectures;
                                if(missableTutes==0)
                                window.alert("Nigga F");
                                else{
                                    if(weightTute >=weightLab){
                                        trade = Math.floor(weightTute/weightLab);
                                        missableLabs = missableLabs + trade;
                                        missableTutes = missableTutes -1;
    
                                    }
                                    else if(weightTute < weightLab){
                                        trade = Math.ceil(weightLab/weightTute);
                                        if(missableTutes >= trade){
                                            missableTutes = missableTutes - trade;
                                            missableLabs = missableLabs + 1;
                                        }
                                        else {
                                            if(missableTutes*weightTute + weight1 >= weightLab){
                                            var i;
                                            for(i=1;i<=missableTutes;++i){
                                                trade = Math.ceil(weightLab/(weight1 + i*weightTute))
                                                if(trade ==1)
                                                break;
                                            }
                                            missableTutes = missableTutes - i;
                                            missableLectures = 0;
                                            missableLabs = missableLabs +1
                                        }
                                        else{
                                            window.alert("Nigga F");
                                        }
                                        }
                                    }
                                    
                                    
                                }
                            }
    
                        }
                       
                    
                        
                }
                else {
                    if(missableTutes==0){
                        window.alert("nigga F");
                    }
                    else{
                        if(weightTute >=weightLab){
                            
                            trade = Math.floor(weightTute/weightLab);
                            missableLabs = missableLabs + trade;
                            missableTutes = missableTutes -1;
        
                        }
                        else if(weightTute < weightLab){
                            trade = Math.ceil(weightLab/weightTute);
                            if(missableTutes >= trade){
                                missableTutes = missableTutes - trade;
                                missableLabs = missableLabs + 1;
                            }
                            else {
                                window.alert("Nigga F")
                            }
                        }
                        
                    }
                }
                console.log(missableLectures + " " + missableLabs + " " + missableTutes);
                firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissableClasses").set({
                    Lecture:missableLectures,
                    Lab:missableLabs,
                    Tute:missableTutes
                })
            })
                    
                })
            })
        
        
        
        /*firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissableClasses").set({
            Lecture:missableLectures,
            Lab:missableLabs,
            Tute:missableTutes
        }).then(function(){
            console.log()
        })
        */
    })
}
function TradeForTute(){
    courseName=document.getElementById("courseName").value;
    var missableLectures, missableLabs, missableTutes;
    var weightLecture, weightLab, weightTute;
    ID = "sn178"
    firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissableClasses").once('value').then(function(snapshot){
        missableLectures = snapshot.val().Lecture;  missableLabs = snapshot.val().Lab;   missableTutes = snapshot.val().Tute;
        
            checkWeight("Lecture",courseName).then(function(lectureWeight){
                weightLecture = lectureWeight;
                checkWeight("Lab",courseName).then(function(labWeight){
                    weightLab = labWeight;
                    checkWeight("Tute",courseName).then(function(tuteWeight){
                        weightTute = tuteWeight;
                        if(weightTute==0){
                            window.alert(courseName + " " + "does not have a Tute")
                            return;
                        }
                        if(missableLectures!=0){
                        var trade;
                        if(weightLecture >= weightTute){
                            trade = Math.floor(weightLecture/weightTute);
                            missableTutes = missableTutes + trade;
                            missableLectures = missableLectures -1;
                        }
                        else{
                            trade = Math.ceil(weightTute/weightLecture)
                            if(missableLectures >=trade){
                                missableLectures = missableLectures - trade
                                missableTutes = missableTutes + 1
                            }
                            else{
                                weight1 = weightLecture*missableLectures;
                                if(missableLabs==0)
                                window.alert("Nigga F");
                                else{
                                    if(weightLab >=weightTute){
                                        trade = Math.floor(weightLab/weightTute);
                                        missableTutes = missableTutes + trade;
                                        missableLabs = missableLabs -1;
    
                                    }
                                    else if(weightLab < weightTute){
                                        trade = Math.ceil(weightTute/weightLab);
                                        if(missableLabs >= trade){
                                            missableLabs = missableLabs - trade;
                                            missableTutes = missableTutes + 1;
                                        }
                                        else {
                                            if(missableLabs*weightLab + weight1 >= weightTute){
                                            var i;
                                            for(i=1;i<=missableLabs;++i){
                                                trade = Math.ceil(weightTute/(weight1 + i*weightLab))
                                                if(trade ==1)
                                                break;
                                            }
                                            missableLabs = missableLabs - i;
                                            missableLectures = 0;
                                            missableTutes = missableTutes +1
                                        }
                                        else{
                                            window.alert("Nigga F");
                                        }
                                        }
                                    }
                                    
                                    
                                }
                            }
    
                        }
                       
                    
                        
                }
                else {
                    if(missableLabs==0){
                        window.alert("nigga F");
                    }
                    else{
                        if(weightLab >=weightTute){
                            
                            trade = Math.floor(weightLab/weightTute);
                            missableTutes = missableTutes + trade;
                            missableLabs = missableLabs -1;
        
                        }
                        else if(weightLab < weightTute){
                            trade = Math.ceil(weightTute/weightLab);
                            if(missableLabs >= trade){
                                missableLabs = missableLabs - trade;
                                missableTutes = missableTutes + 1;
                            }
                            else {
                                window.alert("Nigga F")
                            }
                        }
                        
                    }
                }
                console.log(missableLectures + " " + missableLabs + " " + missableTutes);
                firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissableClasses").set({
                    Lecture:missableLectures,
                    Lab:missableLabs,
                    Tute:missableTutes
                })
            })
                    
                })
            })
        
        
        
        /*firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissableClasses").set({
            Lecture:missableLectures,
            Lab:missableLabs,
            Tute:missableTutes
        }).then(function(){
            console.log()
        })
        */
    })
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

function condoned(ID,courseName){
    var lecture,lab,tute;
    var TotalLectures,TotalLabs,TotalTutes;
    var condonedL =0 ; var condonedLab = 0; var condonedT=0;
    lecture = document.getElementById("LectureCondoned");
    lab = document.getElementById("LabCondoned");
    tute = document.getElementById("TuteCondoned");
    firebase.database().ref("/Attendance" + "/" + ID + "/" + courseName + "/" + "TotalClasses").once('value').then(function(snap){
        TotalLectures = snap.val().Lecture; 
        TotalLabs = snap.val().Lab; 
        TotalTutes= snap.val().Tute;
        if(lecture.checked == true){ 
            if(TotalLectures!=0){
            TotalLectures = TotalLectures -1;
            condonedL=1;
            
            }
            else{
            window.alert(courseName + " " + "does not have a lecture to be condoned")
            return;}
        }
            if(lab.checked == true){
                if(TotalLabs!=0){
                    TotalLabs = TotalLabs -1;
                    condonedLab=1;
                    }
                    else{
                        window.alert(courseName + " " + "does not have a lab to be condoned")
                        return;
                    }

        }
            if(tute.checked == true){
                if(TotalTutes!=0){
                    TotalTutes = TotalTutes -1;
                    condonedT=1;
                    }
                    else{
                        window.alert(courseName + " " + "does not have a tute to be condoned")
                        return;
                    }
                }

                firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "TotalClasses").set({
                    Lecture:TotalLectures,
                    Lab:TotalLabs,
                    Tute:TotalTutes
                }).then(function(){
                    firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "CondonedClasses").once('value').then(function(snap){
                        if(snap.val()==null){
                            firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "CondonedClasses").set({
                                Lecture:condonedL,
                                Lab:condonedLab,
                                Tute:condonedT
                            })
                        }
                        else{
                            if(condonedL==1)
                            codonedL = snap.val().Lecture + 1
                            else
                            codonedL = snap.val().Lecture
                            if(condonedLab ==1)
                            condonedLab = snap.val().Lab + 1
                            else
                            condonedLab = snap.val().Lab
                            if(condonedT ==1)
                            condonedT = snap.val().Tute + 1
                            else
                            condonedT = snap.val().Tute

                            firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "CondonedClasses").set({
                                Lecture:codonedL,
                                Lab: condonedLab,
                                Tute:condonedT
                            });
                        }
                    })
                })

    })

}

function holiday(ID){
    holidayYes = document.getElementById("HolidayYes")
    objs = [];
    ID = "sn178"
    if(holidayYes.checked){
        currentDate = document.getElementById("date").value;
        if(currentDate){
            currentDate= new Date(currentDate);
            month = currentDate.getMonth();
            day=currentDate.getDate();
            year=currentDate.getYear() + 1900;
            Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            currentDate = Months[month] + " " + day + " " + year;
        }
        day = convertToDay(currentDate);
        console.log(day);
        holidays = setHolidays();
        flagPartOfHolidays = 0;
        for(i=0;i<holidays.length;++i){
            if(new Date(holidays[i]).getTime()==new Date(currentDate).getTime())
            {
                flagPartOfHolidays = 1; break;
            }
        }
        
        if(flagPartOfHolidays==1)
        {
            window.alert("Today is already a holiday");
            return;
        }
        else{
         firebase.database().ref("/StudentsLLT/" + ID).once('value').then(function(snapshot){
             console.log(snapshot.val())
             snapshot.forEach(function(snap){
                 day = day.toString()
                 if(snap.val().day!=null)
                 console.log(snap.val().day)
                 else
                 console.log("null")

             })
         })
        }

    }
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