let accountBtn = document.getElementById("accsvg")
let playBtn = document.getElementById("playImage")
let pauseBtn = document.getElementById("pauseImage")
let nextBtn = document.getElementById("Next")
let previousBtn = document.getElementById("Previous")
let audioSlider = document.getElementById("myRange")
let volumeSlider = document.getElementById("range-slider")
let likedSongs = document.getElementById("likedSongsCounter")
let playHeadSongTitle1 = document.getElementById("playheadSongTitle")
let playHeadSongTitle2 = document.getElementById("songTitle")
let playHeadSongArtist1 = document.getElementById("playheadSongArtist")
let playHeadSongArtist2 = document.getElementById("songArtist")
let songCover1 = document.getElementById("songCover1")
let songCover2 = document.getElementById("songCover2")
let queueList = document.getElementById("queuelist")
let shuffleBtn = document.getElementById("shuffle")
let loopBtn = document.getElementById("loop")
let clickC = 0;             // Used to make the shuffle btn green
let clickL = 0;               // Same for the loop btn 
let queueListBox = document.getElementById("queuelist")
loopBtn.addEventListener("click", ()=>{
    clickL ++
    clickL%2==0 ? loopBtn.style.fill="#C4BFB6" : loopBtn.style.fill="#1DC65A";
})
const mainFunction = {
    convertedUrls: [], // Contains all the urls of the files
    songQueue: [],
    songQueueDup: [],   // The Duplicate of songQueue Array
    count: 0,
    currentSong : null, 
    extractFiles: async function(){
        const dir = await window.showDirectoryPicker()
        try{
            for await (const file of dir.values()) {
                if(file.kind=='file'){
                    if(file.name.slice((Math.max(0, file.name.lastIndexOf(".")) || Infinity) + 1) === "mp3" || file.name.slice((Math.max(0, file.name.lastIndexOf(".")) || Infinity) + 1) === "m4a"){
                        let fileUrl = URL.createObjectURL(await file.getFile())
                        mainFunction.convertedUrls.push(fileUrl)
                        
                    }
                    
                    else{
                        console.error("Not a Playable file")
                    }
                }
                
            }
            console.log(mainFunction.convertedUrls);
        }
        catch(error){
            console.error("Unable to extract files ", error)
        }
    },
    
    extractMetadata: async function() {
        for await (const fileUrl of mainFunction.convertedUrls) {
            const audio = new Audio(fileUrl);
            const fileBlob = await fetch(fileUrl).then(res => res.blob());
            
            await new Promise((resolve, reject) => {
                jsmediatags.read(fileBlob, {
                    onSuccess: function(tag) {
                        let songData;
                        const artist = tag.tags.artist || 'Unknown Artist';
                        const title = tag.tags.title || 'Unknown Title';
                        const duration = tag.tags.duration || 'Unknown Duration';
                        let imageUrl = null;
                        
                        if (tag.tags.picture) {
                            const picture = tag.tags.picture; imageUrl = URL.createObjectURL(new Blob([new Uint8Array(picture.data)], { type: picture.format })); } else { console.log('No picture found in the metadata.'); } songData = {
                                songArtist: artist,
                                songTitle: title,
                                songImage: imageUrl,
                                songAudio: audio,
                                songDuration: Math.round(audio.duration)  // To roundOff the number so that it can be detected when the audio is over
                            };
                            resolve(songData); // Resolve the Promise with the extracted songData
                            mainFunction.songQueue.push(songData)
                            console.log(songData); // Now this will print the songData
                        },
                        onError: function(error) {
                            console.error('Error reading metadata:', error);
                            reject(error); // Reject the Promise if an error occurs
                        }
                });
            });
        }
    },

    songDisplay: function(title, artist, image){
        
        let newSongDiv = document.createElement('div');
        newSongDiv.classList.add('flex', 'align-middle', 'mt-2', 'mb-3');
        let albumArtDiv = document.createElement('div');
        albumArtDiv.style.width = '3rem';  
        albumArtDiv.style.height = '3rem'; 
        albumArtDiv.style.backgroundImage = `url(${image})`; 
        albumArtDiv.style.backgroundSize = 'cover';
        albumArtDiv.style.backgroundRepeat = 'no-repeat';
        albumArtDiv.style.borderRadius = '0.5rem'; 
        albumArtDiv.style.marginLeft = '1rem';
        albumArtDiv.classList.add('flex-shrink-0');
        
        let songInfoDiv = document.createElement('div');
        songInfoDiv.style.marginLeft = '0.5rem'; 
        songInfoDiv.style.color = 'white';
        songInfoDiv.style.fontSize = '1.125rem'; 
        songInfoDiv.style.fontWeight = 'bold';
        songInfoDiv.style.display = 'flex'; 
        songInfoDiv.style.flexDirection = 'column'; 
        
        songInfoDiv.textContent = title;
        
        let artistDiv = document.createElement('div');
        artistDiv.style.color = 'gray'; 
        artistDiv.style.fontSize = '0.875rem'; 
        artistDiv.style.fontWeight = 'normal';
        artistDiv.textContent = artist;
        
        songInfoDiv.appendChild(artistDiv);
        newSongDiv.appendChild(albumArtDiv);
        newSongDiv.appendChild(songInfoDiv);
        queueList.appendChild(newSongDiv);
    },
    
    displaySongsInQueue: function(){
        queueList.innerHTML = '';
            for(let i=this.count+1; i>mainFunction.count && i<mainFunction.songQueue.length; i++){
            
            let currentSong = mainFunction.songQueue[i]
            let title = currentSong.songTitle
            let artist = currentSong.songArtist
            let image = currentSong.songImage
            mainFunction.songDisplay(title, artist, image)
        }
    }, 

    namingSongs: function(){
        playHeadSongTitle1.innerText = mainFunction.currentSong.songTitle
        playHeadSongTitle2.innerText = mainFunction.currentSong.songTitle
        playHeadSongArtist1.innerText = mainFunction.currentSong.songArtist
        playHeadSongArtist2.innerText = mainFunction.currentSong.songArtist
        songCover1.style.backgroundImage = `url('${mainFunction.currentSong.songImage}')`;
        songCover1.style.backgroundSize = 'cover'
        songCover2.style.backgroundImage = `url('${mainFunction.currentSong.songImage}')`;
        songCover2.style.backgroundSize = 'cover'
    },



    audioUpdationFunction: function() {

        mainFunction.currentSong.songAudio.removeEventListener("timeupdate", mainFunction.handleTimeUpdate);
    
        mainFunction.handleTimeUpdate = () => {
            audioSlider.max = mainFunction.currentSong.songDuration;
            audioSlider.value = mainFunction.currentSong.songAudio.currentTime;
    
            let intAudio = parseInt(audioSlider.value);
            
            if (mainFunction.currentSong.songDuration === intAudio) {
                    if(clickL%2==0){
                        mainFunction.count++; 
                        mainFunction.currentSong = mainFunction.songQueue[mainFunction.count];
                    }
                    
                    mainFunction.currentSong.songAudio.play(); 
                    audioSlider.value = 0
                    mainFunction.audioUpdationFunction(); 
                    mainFunction.namingSongs()    
                    mainFunction.displaySongsInQueue()
                    
                    if (mainFunction.count >= mainFunction.songQueue.length) {
                        mainFunction.count = 0; 
                    }
            }
        };
    
        mainFunction.currentSong.songAudio.addEventListener("timeupdate", mainFunction.handleTimeUpdate);

        audioSlider.addEventListener("input", () => {
            mainFunction.currentSong.songAudio.currentTime = audioSlider.value;
        });
    },

    unShuffleSongs: function(){
        mainFunction.songQueue = mainFunction.songQueueDup
    },

    shuffleSongs: function(){
        mainFunction.songQueue = mainFunction.songQueue.sort(() => Math.random() - 0.5);
        

    },  

    otherFunctions: async function(){       // PAPI FUNCTION
        queueListBox.style.height = 'auto'
        volumeSlider.min = 0
        volumeSlider.max = 100
        mainFunction.songQueueDup = mainFunction.songQueue           // Duplicating the song queue
        
        likedSongs.innerText = `${mainFunction.songQueue.length} songs` // This is to give how many songs present in the playlist to display near the liked songs section
        
        volumeSlider.addEventListener("input", ()=>{
            mainFunction.currentSong.songAudio.volume = volumeSlider.value/100
        })
        playBtn.addEventListener("click", ()=>{
            mainFunction.currentSong = mainFunction.songQueue[mainFunction.count]
            mainFunction.currentSong.songAudio.play()
            mainFunction.audioUpdationFunction()
            mainFunction.namingSongs()
            mainFunction.displaySongsInQueue()
        })
        
        pauseBtn.addEventListener("click", ()=>{
             mainFunction.currentSong = mainFunction.songQueue[mainFunction.count]
            mainFunction.currentSong.songAudio.pause()
            
        })
        
        nextBtn.addEventListener("click", ()=>{
            mainFunction.currentSong.songAudio.pause()
            mainFunction.count++
            if(mainFunction.songQueue.length === mainFunction.count){
                mainFunction.count=0
            }
            mainFunction.currentSong = mainFunction.songQueue[mainFunction.count]
            mainFunction.currentSong.songAudio.play()
            mainFunction.audioUpdationFunction()
            mainFunction.currentSong.songAudio.currentTime = 0
            mainFunction.namingSongs() 
            mainFunction.displaySongsInQueue()          
             
        })
        
        previousBtn.addEventListener("click", ()=>{
            mainFunction.currentSong.songAudio.pause()
            mainFunction.count--
            if(mainFunction.songQueue.length === mainFunction.count){
                mainFunction.count=0
            }
            mainFunction.currentSong = mainFunction.songQueue[mainFunction.count]
            
            mainFunction.currentSong.songAudio.play()
            mainFunction.audioUpdationFunction()
            mainFunction.currentSong.songAudio.currentTime = 0  
            mainFunction.namingSongs()
            mainFunction.displaySongsInQueue()          
        })

        shuffleBtn.addEventListener("click", ()=>{
           clickC ++
           if(clickC%2==0){
                shuffleBtn.style.fill="#C4BFB6"
                mainFunction.unShuffleSongs()
           }
           else{
            shuffleBtn.style.fill="#1DC65A" 
            mainFunction.shuffleSongs();
           }
        })    
    }
    
}



const arrayOfFunctions = [
    mainFunction.extractFiles,
    mainFunction.extractMetadata,
    mainFunction.otherFunctions
]
accountBtn.addEventListener("click", async()=>{
    for await (const func of arrayOfFunctions){
        await func()
    }
})