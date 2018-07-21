const BASE_URL = "https://api.protecc.us/api"

exports.reauthenticate = async function(){
  try{
    let res = await fetch(BASE_URL+"/user/reauthenticate", {
      method: "GET",
      credentials: "include",
    });

    return res
  }catch (err) {
    throw err;
  } 
}

exports.reauthenticate()
