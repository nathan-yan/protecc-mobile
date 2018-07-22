import io from 'socket.io-client';

BASE_URL = "https://api.protecc.us"

const socket = io(BASE_URL);

socket.on('locationUpdate', (data) => {
  console.log('\n\n\n')
  console.log(data);
  console.log("DATA ^^^^");
  console.log('\n\n\n')

 /* let members = partyDataContext.members;

  for (var i = 0; i < members.length; i++){
    if (members[i].id == data.id){
      // Update that member
     // partyDataContext.members[i].location = data.location;
      break;
    }
  }*/ 
})