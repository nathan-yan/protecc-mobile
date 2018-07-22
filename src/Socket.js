window.navigator.userAgent = 'react-native';
import io from 'socket.io-client';
import { setPartyStateDirectly, getPartyState } from '../App.js'
import { getParty, initiateHeadcount } from './Api.js';

import { headcountResponse, setNear, initiateHeadCount_ } from './Dashboard/Main.js';

BASE_URL = "https://api.protecc.us"

const socket = io(BASE_URL);

socket.on('locationUpdate', (data) => {

  let partyData = getPartyState();

  if (partyData){
    let members = partyData.members;

    for (var i = 0; i < members.length; i++){
      if (members[i]._id.toString() == data.id.toString()){
        // Update that member
        partyData.members[i].location = data.location;
        break;
      }
    }

    setPartyStateDirectly({partyData:partyData});
  }
})

socket.on("notifyHeadcount", (data) => {
  console.log(data);
  initiateHeadCount_();
  setNear(data);
})

socket.on("notifyHeadcountResponse", (data) => {
  const memberId = data.id;
  // this is the memberId that is represented in this headcount response
  
  headcountResponse('response', memberId);

});

socket.on("notifyHeadcountEnd", (data) => {
  // data.near are those near the headcount
  // data.far are those that responded to the headcount
  // data.unresponsive are those that didn't respond at all

});
