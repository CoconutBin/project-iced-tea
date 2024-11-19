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
    static gameTimerElement: HTMLElement
    static gamePackItems: string[]
    static correctAnswers: number = 0
    static gameTimerSeconds: number = 60
    static isChecking: boolean = true
    static initialized: boolean = false
    static deviceOrientation: 'portrait' | 'landscape' | 'rportrait' | 'rlandscape' | null

    static async start() {
        console.log(Settings.options.controlScheme)
        if (Settings.options.controlScheme === 'motion') {
            Game.setCalibration();
        } else {
            Game.countdown()
        }
    }

    static countdown() {
        let seconds = 3;

        const intervalId = setInterval(() => {
            Game.gameTextElement.innerText = seconds.toString();
            seconds--;

            if (seconds < 0) {
                Game.gameTextElement.parentElement.classList.remove("correct")
                clearInterval(intervalId);
                Game.nextWord();
                if (Settings.options.controlScheme === 'motion') window.addEventListener("deviceorientation", Game.manageTilt)
                else window.addEventListener('click', Game.manageTouch)
                let gameTimerSecondsLocal = Game.gameTimerSeconds
                const gameTimer = setInterval(() => {
                    if (gameTimerSecondsLocal < 1) {
                        Game.end()
                        if (Settings.options.controlScheme === 'motion') window.removeEventListener("deviceorientation", Game.manageTilt)
                        else window.removeEventListener('click', Game.manageTouch)
                        clearInterval(gameTimer)
                    }
                    Game.gameTimerElement.innerText = gameTimerSecondsLocal.toString()
                    gameTimerSecondsLocal--
                }, 1000)
            }
        }, 1000);
    }

    static setCalibration() {
        Game.gameTextElement.parentElement.addEventListener('click', calibration)


        function permission() {
            if (typeof (DeviceMotionEvent) !== "undefined" && typeof ((DeviceMotionEvent as any).requestPermission) === "function") {
                // (optional) Do something before API request prompt.
                (DeviceMotionEvent as any).requestPermission()
                    .then(response => {
                        // (optional) Do something after API prompt dismissed.
                        if (response == "granted") {
                            calibration()
                        }
                    })
                    .catch(error => document.getElementById("errors").innerText = error)
            } else {
                alert("DeviceMotionEvent is not defined");
            }
        }

        if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
            Game.gameTextElement.parentElement.removeEventListener('click', calibration)
            Game.gameTextElement.parentElement.addEventListener("click", permission);
        }

        async function calibration() {
            Game.gameTextElement.parentElement.classList.add("correct")
            window.addEventListener("deviceorientation", setOrientation)

            function setOrientation(e: DeviceOrientationEvent) {
                Game.deviceOrientation = Game.findRotation(e.gamma, e.beta)
                console.log(e.gamma, e.beta)
                window.removeEventListener("deviceorientation", setOrientation)
                if (Game.deviceOrientation == undefined) {
                    Settings.modify("controlScheme", "touch")
                    Game.gameTextElement.parentElement.removeEventListener('click', calibration)
                    Game.start()
                }
            }

            Game.gameTextElement.parentElement.removeEventListener('click', calibration)
            Game.countdown()
        }
    }

    static end() {
        window.removeEventListener("deviceorientation", Game.manageTilt)
        document.getElementById("correctAnswersCount").innerText = Game.correctAnswers.toString()
        Game.gameEndModal.showModal()
    }

    static nextWord() {
        if (Game.gamePackItems.length <= 1) {
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
            if (Math.abs(centerGamma) <= Game.tiltAngles.landscapeTurnPointGamma) {
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

    static tiltAngles = {
        landscapeMidPointGamma: 20,
        landscapeTurnPointGamma: 45,
        portraitTurnUpBeta: 50,
        portraitTurnDownBeta: 110
    }

    static gameActions = {
        correct() {
            Game.correctAnswers++
            Game.gameTextElement.parentElement.classList.add("correct")
            Game.gameTextElement.innerText = "Correct"
        },

        skip() {
            Game.gameTextElement.parentElement.classList.add("skip")
            Game.gameTextElement.innerText = "Skipped"
        }
    }

    static manageTilt(e: DeviceOrientationEvent) {

        if (e.gamma == undefined) {
            window.removeEventListener("deviceorientation", Game.manageTilt)
            return
        }
        
        if (window.innerWidth > window.innerHeight) {
            if (e.gamma > -Game.tiltAngles.landscapeTurnPointGamma && e.gamma < Game.tiltAngles.landscapeMidPointGamma && Game.isChecking) {
                console.log(Game.deviceOrientation == "rlandscape" ? "down" : "up")
                if (Game.deviceOrientation == "rlandscape") Game.gameActions.correct()
                else Game.gameActions.skip()
                Game.nextWord()
            } else if (e.gamma > Game.tiltAngles.landscapeMidPointGamma && e.gamma < Game.tiltAngles.landscapeTurnPointGamma && Game.isChecking) {
                console.log(Game.deviceOrientation == "landscape" ? "down" : "up")
                if (Game.deviceOrientation == "landscape") Game.gameActions.correct()
                else Game.gameActions.skip()
                Game.nextWord()
            } else if (!Game.isChecking && Math.abs(e.gamma) > 60) {
                Game.isChecking = true
                console.log("center")
            }
        }
        else {
            if (Math.abs(e.beta) > Game.tiltAngles.portraitTurnDownBeta && Game.isChecking) {
                console.log("down")
                Game.gameActions.correct()
                Game.nextWord()
            } else if (Math.abs(e.beta) < Game.tiltAngles.portraitTurnUpBeta && Game.isChecking) {
                console.log("up")
                Game.gameActions.skip()
                Game.nextWord()
            } else if (!Game.isChecking && e.beta < Game.tiltAngles.portraitTurnDownBeta && e.beta > Game.tiltAngles.portraitTurnUpBeta) {
                Game.isChecking = true
                console.log("center")
            }
        }
    }

    static manageTouch(e: PointerEvent): void {
        if(e.x > window.innerWidth / 2) {
            Game.gameActions.correct()
            Game.nextWord()
        } else{
            Game.gameActions.skip()
            Game.nextWord()
        }
    }

    static loadGamePack(gamePack: GamePack) {
        if (gamePack.words.length < 1) return
        const gamePackItems = [...gamePack.words]
        const gamePackItemsShuffled: string[] = []
        while (gamePackItems.length > 0) {
            const randomIndex = Math.floor(Math.random() * gamePackItems.length)
            gamePackItemsShuffled.push(gamePackItems.splice(randomIndex, 1)[0])
        }
        Game.gamePackItems = gamePackItemsShuffled
        Game.start()
    }

    static init(gameTextElement: HTMLElement, gameTimerElement: HTMLElement, gameTimerSeconds: number) {
        if (Game.initialized) throw new Error("Attempted to initialize while already initialized")

        Game.gameTimerSeconds = gameTimerSeconds
        Game.gameTimerElement = gameTimerElement
        Game.gameTextElement = gameTextElement
        Game.initialized = true
    }
}

class Settings {
    static init() {
        const localStorageSettings = localStorage.getItem("settings")

        if (localStorageSettings != null) {
            Settings.options = JSON.parse(localStorageSettings)
        } else {
            Settings.options = {
                controlScheme: 'motion',
                timerSeconds: 60
            }
        }
    }

    static modify(setting, value) {
        Settings.options[setting] = value
        localStorage.setItem("settings", JSON.stringify(Settings.options))
        console.log("Settings modified", Settings.options)
    }

    static options: {
        controlScheme: 'motion' | 'touch',
        timerSeconds: number
    } = {
            controlScheme: undefined,
            timerSeconds: undefined
        }
}

Settings.init()