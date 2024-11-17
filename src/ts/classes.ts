class GamePack {
    name: string
    category?: string
    thumbnail?: string
    words: string[]

    constructor(name: string, words: string[], thumbnail?: string, category?: string) {
        this.name = name
        this.words = words
        this.thumbnail = thumbnail
        this.category = category
    }
}

class Game {
    static gameEndModal = document.getElementById('gameEndDialog') as HTMLDialogElement
    static gameTextElement: HTMLElement
    static gamePackItems: string[]
    static correctAnswers: number = 0
    static isChecking: boolean = true
    static initialized: boolean = false
    static deviceOrientation: 'portrait' | 'landscape' | 'rportrait' | 'rlandscape' | null

    static start() {

        Game.gameTextElement.parentElement.addEventListener('click', calibration)

        function calibration(){
            window.addEventListener("deviceorientation", setOrientation)

            function setOrientation(e: DeviceOrientationEvent){
                Game.deviceOrientation = Game.findRotation(e.gamma, e.beta)
                console.log(e.gamma, e.beta)
                window.removeEventListener("deviceorientation", setOrientation)
            }

            if(Game.deviceOrientation == undefined){
                window.addEventListener("deviceorientation", setOrientation)
            } else {
                let seconds = 3;

            const intervalId = setInterval(() => {
                Game.gameTextElement.innerText = seconds.toString();
                seconds--;

                if (seconds < 0) {
                    clearInterval(intervalId);
                    Game.nextWord();
                    window.addEventListener("deviceorientation", Game.manageTilt)
                }}, 1000);

            Game.gameTextElement.parentElement.removeEventListener('click', calibration)
            }
        }
    }

    static end() {
        window.removeEventListener("deviceorientation", Game.manageTilt)
        document.getElementById("correctAnswersCount").innerText = Game.correctAnswers.toString()
        Game.gameEndModal.showModal()
    }

    static nextWord() {
        if (Game.gamePackItems.length < 1) {
            Game.end()
            return
        }
        Game.isChecking = false
        setTimeout(() => {
        Game.gameTextElement.parentElement.classList.remove("correct")
        Game.gameTextElement.parentElement.classList.remove("skip")
        Game.gameTextElement.innerText = Game.gamePackItems.shift()
        }, 500)
    }

    static findRotation(centerGamma: number, centerBeta?: number): typeof Game.deviceOrientation {
        // Case if Landscape
        if (window.innerWidth > window.innerHeight) {
            if (Math.abs(centerGamma) <= 60) {
                alert('Please center your device');
                return;
            }
            if (centerGamma < 0 || (centerGamma > 0 && centerBeta && centerBeta < 0)) {
                return 'landscape';
            } else if (centerGamma > 0 || (centerGamma < 0 && centerBeta && centerBeta > 0)) {
                return 'rlandscape';
            } else {
                console.error("Unexpected landscape gamma or beta");
            }
        } else {
            // Case if Portrait
            if (centerBeta && Math.abs(centerBeta) > 50 && Math.abs(centerBeta) < 100) {
                return centerBeta > 0 ? 'portrait' : 'rportrait';
            } else alert('Please center your device');
        }
    }

    static manageTilt(e: DeviceOrientationEvent) {

        const angles = {
            landscapeMidPointGamma: 20,
            landscapeTurnPointGamma: 60,
            portraitTurnUpBeta: 50,
            portraitTurnDownBeta: 110
        }

        function correct(){
            Game.correctAnswers++
            Game.gameTextElement.parentElement.classList.add("correct")
            Game.gameTextElement.innerText = "Correct"
        }

        function skip(){
            Game.gameTextElement.parentElement.classList.add("skip")
            Game.gameTextElement.innerText = "Skipped"
        }

        if (e.gamma == undefined) {
            window.removeEventListener("deviceorientation", Game.manageTilt)
            return
        }
        if(window.innerWidth > window.innerHeight){
            if (e.gamma > -angles.landscapeTurnPointGamma && e.gamma < angles.landscapeMidPointGamma && Game.isChecking) {
                console.log(Game.deviceOrientation == "rlandscape"? "down":"up")
                if(Game.deviceOrientation == "rlandscape") correct()
                else skip()
                Game.nextWord()
            } else if (e.gamma > angles.landscapeMidPointGamma && e.gamma < angles.landscapeTurnPointGamma && Game.isChecking) {
                console.log(Game.deviceOrientation == "landscape"? "down":"up")
                if(Game.deviceOrientation == "landscape") correct() 
                else skip()
                Game.nextWord()
            } else if (!Game.isChecking && Math.abs(e.gamma) > 60) {
                Game.isChecking = true
                console.log("center")
            }
        }
        else {
            if(Math.abs(e.beta) > angles.portraitTurnDownBeta && Game.isChecking){
                console.log("down")
                correct()
            } else if(Math.abs(e.beta) < angles.portraitTurnUpBeta && Game.isChecking){
                console.log("up")
                skip()
            } else if(!Game.isChecking){
                Game.isChecking = true
                console.log("center")
            }
        }
    }

    static loadGamePack(gamePack: GamePack) {
        if(gamePack.words.length < 1) return
        const gamePackItems = [...gamePack.words]
        const gamePackItemsShuffled: string[] = []
        while (gamePackItems.length > 0) {
            const randomIndex = Math.floor(Math.random() * gamePackItems.length)
            gamePackItemsShuffled.push(gamePackItems.splice(randomIndex, 1)[0])
        }
        Game.gamePackItems = gamePackItemsShuffled
        Game.start()
    }

    static init(gameTextElement: HTMLElement) {
        if (Game.initialized) throw new Error("Attempted to initialize while already initialized")

        Game.gameTextElement = gameTextElement
        Game.initialized = true
    }
}