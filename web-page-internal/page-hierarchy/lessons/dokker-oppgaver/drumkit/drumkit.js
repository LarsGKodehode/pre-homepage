let keyRegister = {};
let drumKit = [];

class drum {
  // create drums
  constructor(name, type, icon, sound, keyCode) {
    this.name = name;
    this.type = type; // instrument group
    this.icon = icon; // icon path
    this.sound = sound; // sound path
    this.keyCode = keyCode; // key to listen for
  };

  playSound =  () => this.sound.play();
};



/*
// trying to import json
document.getElementById("drumkit-file").addEventListener("change", handleFiles, false);

function handleFiles() {
  const fileToRead = this.files[0];
  let readFile = new FileReader();
  console.log("reading file");
  readFile.onload = (e) => {
    let content = e.target.result;
    console.log(content);
  };
};
*/



drumKit.push(new drum(
  "bass-drum",
  "floor",
  "bass-drum.svg",
  new Audio("/content/audio/drumkit/bass-drum.wav"),
  "KeyA",
));
  
drumKit.push(new drum(
  "floor-tom",
  "tom",
  "floor-tom.svg",
  new Audio("/content/audio/drumkit/tom-floor.wav"),
  "KeyS",
));
  
drumKit.push(new drum(
  "clap",
  "cymbal",
  "cymbal-clap.svg",
  new Audio("/content/audio/drumkit/cymbal-clap.wav"),
  "KeyD",
));
  
drumKit.push(new drum(
  "tink",
  "tom",
  "tink.svg",
  new Audio("/content/audio/drumkit/tink.wav"),
  "KeyF",
));
  
drumKit.push(new drum(
  "snare-drum",
  "snare",
  "snare-drum-svg",
  new Audio("/content/audio/drumkit/snare-snare.wav"),
  "KeyG",
));
  
drumKit.push(new drum(
  "open-hat",
  "cymbal",
  "open-hat.svg",
  new Audio("/content/audio/drumkit/cymbal-open-hat.wav"),
  "KeyG",
));

drumKit.push(new drum(
  "ride-cymbal",
  "cymbal",
  "ride-cymbal.svg",
  new Audio("/content/audio/drumkit/cymbal-ride.wav"),
  "KeyH",
));
  
drumKit.push(new drum(
  "hi-hat",
  "cymbal",
  "hi-hat.svg",
  new Audio("/content/audio/drumkit/cymbal-hi-hat.wav"),
  "KeyJ",
));
    
drumKit.push(new drum(
  "big-bada-boom",
  "explosives",
  "explosion.svg",
  "explosion.ogg",
  "KeyL"
));
   
// initialize controll
function playDrum (drum) {
  drum.sound.play();
};

// keyboard input
document.addEventListener("keydown", (keyDownEvent) => {
  keyRegister[`${keyDownEvent.code}`]();
});

// install drums
function addDrums(drums, target) {
  const fragment = new DocumentFragment();
  const node = document.createElement("div");
  node.id = "drum-kit"
  
  for (const drum of drums) {
    // add to HTML and set meta tags
    const newDrum = document.createElement("div");
    adjustMeta(drum, newDrum);
    node.appendChild(newDrum);
    
    // add on clik for drum
    newDrum.addEventListener("click", () => playDrum(drum));
    // add keybeinding for drum
    keyRegister[`${drum.keyCode}`] = drum.playSound;
  };
  
  fragment.appendChild(node);
  target.appendChild(fragment);
};

function adjustMeta(drum, newDrum) {
  newDrum.id = drum.name;
  newDrum.className = `${drum.type} sound-tool`;
  newDrum.textContent = drum.icon;
};

const drumKitWrapper = document.getElementById("drumkit-wrapper");
addDrums(drumKit, drumKitWrapper);
