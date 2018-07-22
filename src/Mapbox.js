import Mapbox from "@mapbox/react-native-mapbox-gl";

console.log("DONE!");
console.log(Mapbox);
Mapbox.setAccessToken(process.env.PROTECC_MAPBOX);

export default Mapbox;
