function makeid(length) {
    var text = [];
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-";
  
    for (var i = 0; i < length; i++)
      text.push(possible.charAt(Math.floor(Math.random() * possible.length)));
    return text.join("");
}
let startscreen = document.createElement("div")
// startscreen.style.display = "block"
let resiverB = document.createElement("button")
resiverB.addEventListener("click", (e) => {
    peer = new Peer(makeid(100), {debug:3})
    console.log("id:", peer.id)
    conn = peer.connect(peer.id)
    // conn.on('open', function(){
    //     // here you have conn.id
    //     conn.send('ping');
    // });
    conn.on('error', (err) => {
        console.log("error:", err)
    });
    peer.on('connection', function(conn2) {
        console.log("connr")
        conn2.on('data', function(data){
            // Will print 'hi!'
            console.log(data);
            conn2.send("ping")
            // return "ping"
            console.log("sent")
        });
    });
})
resiverB.innerText = "resiver"
startscreen.appendChild(resiverB)
let senderB = document.createElement("button")
senderB.addEventListener("click", (e) => {
    idinput = document.getElementById("id")
    peer = new Peer(makeid(100), {debug:3})
    console.log("id:", peer.id)
    console.log("otherId:", idinput.value)
    conn = peer.connect(idinput.value)
    conn.on('open', function(){
        // here you have conn.id
        conn.send('pong');
    });
    conn.on('error', (err) => {
        console.log("error:", err)
    });
    conn.on('data', function(data){
        // Will print 'hi!'
        console.log(data);
        console.log("resived")
        conn.send("pong")
    });
})
senderB.innerText = "sender"
startscreen.appendChild(senderB)
let rIdInput = document.createElement("input")
rIdInput.id = "id"
rIdInput.type = "text"
startscreen.appendChild(rIdInput)
document.body.appendChild(startscreen)