window.navigator.userAgent = 'react-native';
import io from 'socket.io-client';
import { setPartyStateDirectly, getPartyState } from '../App.js'
import { getParty } from './Api.js';

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