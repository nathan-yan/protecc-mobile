import io from 'socket.io-client';
import { setPartyStateDirectly, getPartyState } from '../App.js'
import { getParty } from './Api.js';

BASE_URL = "https://api.protecc.us"

const socket = io(BASE_URL);

socket.on('locationUpdate', (data) => {
  console.log('\n\n\n')
  console.log(getPartyState());
  console.log("DATA ^^^^");
  console.log('\n\n\n')

  let partyData = getPartyState();

  let members = partyData.members;

  for (var i = 0; i < members.length; i++){
    if (members[i]._id.toString() == data.id.toString()){
      // Update that member
      partyData.members[i].location = data.location;
      break;
    }
  }

  setPartyStateDirectly({partyData:partyData});
})