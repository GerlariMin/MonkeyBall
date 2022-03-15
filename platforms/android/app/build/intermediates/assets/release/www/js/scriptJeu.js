$(document).ready(function() {
    /*
        VARIABLES
                    */
    //let score=0;
    var canvas = document.getElementById("myCanvas");
    var navbar = document.getElementById("navbar");
    var footer = document.getElementById("footer");
    canvas.width=window.innerWidth-4;
    canvas.height=window.innerHeight-canvas.offsetTop-footer.offsetHeight;
    var context = canvas.getContext("2d");
    var x = canvas.width/2,y = canvas.height/2;
    var vx = Math.random()*10.0,vy = Math.random()*10.0;
    var ax = 0,ay = 0;
    var d = .5, e= .004;
    var diametreBalle = 20;
    var trous = new Array();
    var nombreTrous = 8;
    var pause=0;

    var eventX = 0 ;
    var eventY = 0 ;
    var eventZ = 0 ;

    var score = 0;
    var defaite = 0;
    var victoire = 0;
    var serieVictoire = 0;
    var serieDefaite = 0;

    var myInterval;

    var sonVictoire = new sound("sound/win.mp3");
    var sonDefaite = new sound("sound/lose.mp3");

    jeu();

    /*
        FONCTIONS
                    */
    $("#myCanvas").click(function(){
        touch();
    });
    $("#reload").click(function(){
        clearInterval(myInterval);
        jeu();
    })
    /*$("#theme").click(function(){
        theme();
    });
    $("#mode").click(function(){
        mode();
    });*/

    function animate(){
        mode();
        theme();
        update();
        dessine();
        drawCircle(context);
        $('#score').text(score);
        $('#victoire').text(victoire+"("+serieVictoire+")");
        $('#defaite').text(defaite+"("+serieDefaite+")");
    }

    function dessine() {
        //context.clearRect(0,0,canvas.width,canvas.height);
        //context.strokeRect(x, y, canvas.width, canvas.height);
        context.fillStyle="#FF0000";
        //context.fillRect(x, y, canvas.width, canvas.height);
        drawBall(context);
    }

    function drawBall(context){
        gradient=context.createRadialGradient(Math.floor(x),Math.floor(y), diametreBalle/10,Math.floor(x),Math.floor(y), diametreBalle/2);
        var numcouleur=0;
        switch($('#couleurBalle').val()){
            case 'multicouleur':
                numcouleur = Math.floor(Math.random() * Math.floor(5));
                break;
            case '1':
                numcouleur=1;
                break;            
            case '2':
                numcouleur = 2
                break;
            case '3':
                numcouleur = 3;
                break;
            case '4':
                numcouleur = 4;
                break;
            case '5':
                numcouleur = 5;
                break;
            default: 
                numcouleur = 0;
                break;
        }
        
        switch(numcouleur){
            case 1:
                gradient.addColorStop(0, '#ff6400');
                gradient.addColorStop(1, '#00ffde');
                break

            case 2:
                gradient.addColorStop(0, '#00ffde');
                gradient.addColorStop(1, '#ff6400');
                break

            case 3:
                gradient.addColorStop(0, '#f0fff0');
                gradient.addColorStop(1, '#fcff00');
                break
    
            case 4:
                gradient.addColorStop(0, '#ff00fd');
                gradient.addColorStop(1, '#0300ff');
                break
    
            case 5:
                gradient.addColorStop(0, '#0300ff');
                gradient.addColorStop(1, '#ff00fd');
                break

            default:
                gradient.addColorStop(0, '#f0fff0');
                gradient.addColorStop(1, '#000000');
                break
        }
       
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(Math.floor(x),Math.floor(y), diametreBalle/2, 0, Math.PI*2,true);
        context.fill();
    }

    function drawCircle(context){

        for(i = 0; i < nombreTrous; i++){
            if(i==0){
                context.fillStyle="#00ff00";
            }else {
                context.fillStyle="#000000";
            }
            context.beginPath();
            context.arc(Math.floor(trous[i].x),Math.floor(trous[i].y), diametreBalle/1.5, 0, Math.PI*2);
            context.fill();
        }
    }

    function gagne(){
        bool = false;
        //if( (parseInt(x) < parseInt(trous[0].x)+parseInt(Math.PI*2) && (parseInt(x) > parseInt(trous[0].x)-parseInt(Math.PI*2)) && (parseInt(y) < parseInt(trous[0].y)+parseInt(Math.PI*2))) && (parseInt(y) > parseInt(trous[0].y)-parseInt(Math.PI*2)) ){
        if( (x < trous[0].x+(diametreBalle/1.5) && (x > trous[0].x-(diametreBalle/1.5)) && (y < trous[0].y+(diametreBalle/1.5))) && (y > trous[0].y-(diametreBalle/1.5)) ){
            bool = true;
            sonVictoire.play();
        }
        return bool;
    }

    function initTrous(){
        for(var i = 0 ; i < nombreTrous; i++){
            trous[i] = new Object();
            trous[i].x = ( (canvas.offsetLeft+canvas.width-(Math.PI*2)-8)-(canvas.offsetLeft+(Math.PI*2)+8) )*Math.random() + (canvas.offsetLeft+(Math.PI*2)+8);
            trous[i].y = ( (canvas.offsetTop+canvas.height-(Math.PI*2)-footer.offsetHeight-8)-(canvas.offsetTop+(Math.PI*2)+8) )*Math.random() + (canvas.offsetTop+(Math.PI*2)+8);
        }
        drawCircle(context);
    }

    function jeu(){
        x = canvas.width/2;
        y = canvas.height/2;
        if(!context) {
            alert("Impossible de récupérer le contexte");
            return;
        }
    
        if(window.DeviceOrientationEvent) {
            window.addEventListener("devicemotion", process, false);
        } else{
            Swal.fire({
                type: 'error',
                position: 'center',
                title: '<b class="text-danger">Oops...</b>',
                text: 'Vous ne pouvez pasprofiter pleinement du jeu!',
                footer: '<a href>Pourquoi?</a>',
                timer: 10000,
                padding: '3em',
                backdrop: `
                  rgba(0,0,123,0.4)
                  url("img/open.gif") 
                  center
                  no-repeat
                `
              })
        }
        
        initTrous();
        myInterval = setInterval(animate, 10);
    }

    function mode(){
        var mode = "";
        var text ="";
        switch($('#mode').val()){
            case 'clair':
                mode = "light";
                text = "dark";
                break;
            case 'sombre':
                mode = "dark";
                text = "light";
                break;
            default:
                mode = "light";
                text = "dark";
                break;
        }
        document.getElementById('navbar').className="navbar navbar-"+mode+" bg-"+mode+" text-"+text;
        document.getElementById('footer').className="navbar navbar-"+mode+" bg-"+mode+" text-"+text;
        document.getElementById('mode').className="custom-select bg-"+mode+" text-"+text;
        document.getElementById('theme').className="custom-select bg-"+mode+" text-"+text;
        document.getElementById('couleurBalle').className="custom-select bg-"+mode+" text-"+text;
        document.getElementById('labelMode').className="input-group-text bg-"+mode+" text-"+text;
        document.getElementById('labelTheme').className="input-group-text bg-"+mode+" text-"+text;
        document.getElementById('labelCouleurBalle').className="input-group-text bg-"+mode+" text-"+text;
        $('body').css("background-color", mode);
        //document.style.backgroundColor = "#343a40";
    }

    function perdu(){
        bool = false;
        for(var i = 1 ; i < nombreTrous; i++){
            //if( (parseInt(x) < parseInt(trous[i].x)+parseInt(Math.PI*2) && (parseInt(x) > parseInt(trous[i].x)-parseInt(Math.PI*2)) && (parseInt(y) < parseInt(trous[i].y)+parseInt(Math.PI*2))) && (parseInt(y) > parseInt(trous[i].y)-parseInt(Math.PI*2)) ){
            if( (x < trous[i].x+(diametreBalle/1.5) && (x > trous[i].x-(diametreBalle/1.5)) && (y < trous[i].y+(diametreBalle/1.5))) && (y > trous[i].y-(diametreBalle/1.5)) ){
                bool = true;
                sonDefaite.play();
            }
        }
        return bool;
    }

    function process(event) {
        eventX = event.accelerationIncludingGravity.x;
        eventY = event.accelerationIncludingGravity.y;
        eventZ = event.accelerationIncludingGravity.z;
        ax = -eventX;ax = (Math.random()*(0.1))*ax;
        ay = eventY;ay = (Math.random()*(0.1))*ay;
        //document.getElementById("log").innerHTML = "<ul class='list-group list-group-horizontal-sm rounded-lg shadow-lg'><li class='list-group-item'>X : " + eventX + "</li class='list-group-item'><li>Y : " + eventY + "</li><li class='list-group-item'>Z : " + eventZ + "</li></ul>";
        //document.getElementById("log2").innerHTML = "<ul class='list-group list-group-horizontal-sm rounded-lg shadow-lg'><li class='list-group-item'>X-balle : " + x + "</li class='list-group-item'><li>Y-balle : " + y + /*"</li><li class='list-group-item'>AX : " + ax + "</li><li>AY : " + ay + */"</li></ul>"; 
    }

    function sound(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play = function(){
            this.sound.play();
        }
        this.stop = function(){
            this.sound.pause();
        }    
    }

    function touch(){
        /*ax = Math.floor(Math.random()*(5-(-5)+1));
        ay = Math.floor(Math.random()*(5-(-5)+1));*/
        
        pause++;
        if(pause%2==1){
            clearInterval(myInterval);

            Swal.fire({
                title: '<p><i class="fas fa-pause"></i> PAUSE</p>',
                confirmButtonText: "<i class='fas fa-play'></i> Reprendre",
                onClose: () => {
                    myInterval = setInterval(animate, 10);
                }
            })
            
        }else{
            
        }
    }

    function theme(){
        var bgImg = "";
        switch($('#theme').val()){
            case '1':
                bgImg = "fond1.png";
                break;
            case '2':
                bgImg = "trees.png";
                break;
            default:
                bgImg = "trees.png";
                break
        }
        document.getElementById('myCanvas').style.background='url(img/'+bgImg+')';
        document.getElementById('myCanvas').style.backgroundRepeat='no-repeat'; 
        document.getElementById('myCanvas').style.backgroundSize='cover';
    }

    function update(){
        context.clearRect(0,0,canvas.width,canvas.height);

        if(gagne()){
            score++;
            victoire++;
            serieVictoire++;
            serieDefaite=0;
            clearInterval(myInterval);
            Swal.fire({
                //type: 'success',
                position: 'bottom',
                title: '<b class="text-success">BAM!</b>',
                text: 'Vous avez gagné!',
                footer: '<a href>Pourquoi je suis aussi fort?</a>',
                //timer: 5000,
                width: 600,
                padding: '3em',
                background: '#fff url(img/trees.png)',
                confirmButtonText: 'REJOUER',
                onClose: () => {
                    sonVictoire.stop();
                    jeu();
                  },
                backdrop: `
                  rgba(0,0,123,0.4)
                  url("img/hologram.gif")
                  center
                  no-repeat
                `
            })
            
        }if(perdu()){
            score--;
            defaite++;
            serieVictoire=0;
            serieDefaite++;
            clearInterval(myInterval);
            Swal.fire({
                //type: 'error',
                position: 'bottom',
                title: '<b class="text-danger">Oops...</b>',
                text: 'Vous avez perdu la partie!',
                footer: '<a href>Pourquoi je suis aussi nul?</a>',
                //timer: 5000,
                width: 600,
                padding: '3em',
                background: '#fff url(img/trees.png)',
                confirmButtonText: 'REJOUER',
                onClose: () => {
                    sonDefaite.stop();
                    jeu();
                },
                //https://sweetalert2.github.io/images/nyan-cat.gif")
                backdrop: `
                  rgba(0,0,123,0.4)
                  url("img/open.gif") 
                  center
                  no-repeat
                `
            })

        }

        x = x + d*vx;
        y = y + d*vy;
        vx = vx + d*ax;
        vy = vy + d*ay;
         
        ax = - e*vx;
        ay = - e*vy;
                    
        if(x>canvas.width-canvas.offsetLeft-(Math.PI*2)-2){vx = -vx}
        if(x<canvas.offsetLeft+2+(Math.PI*2)){vx = -vx}
        if(y>canvas.height-canvas.offsetTop+navbar.offsetHeight-(Math.PI*2)-2){vy = -vy}
        if(y<canvas.offsetTop-navbar.offsetHeight+2+(Math.PI*2)){vy = -vy}

    }
    
});