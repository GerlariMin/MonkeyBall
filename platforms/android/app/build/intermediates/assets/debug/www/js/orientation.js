var x=0;
var y=0;
var z=0;


if(window.DeviceOrientationEvent) {
    window.addEventListener("devicemotion", process, false);
} else {
    // Le navigateur ne supporte pas l'événement deviceorientation
}
function process(event) {
    x = event.accelerationIncludingGravity.x;
    y = event.accelerationIncludingGravity.y;
    z = event.accelerationIncludingGravity.z;
    document.getElementById("log").innerHTML = "<ul><li>X : " + x + "</li><li>Y : " + y + "</li><li>Z : " + z + "</li></ul>"; 
  }