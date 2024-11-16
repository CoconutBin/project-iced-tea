class GamePack {
    name;
    category;
    thumbnail;
    words;
    constructor(name, words, thumnail, category) {
        this.name = name;
        this.words = words;
        this.thumbnail = thumnail;
        this.category = category;
    }
}
class Game {
    static gameEndModal = document.getElementById('gameEndDialog');
    static gameTextElement;
    static gamePackItems;
    static correctAnswers = 0;
    static isChecking = true;
    static initialized = false;
    static deviceOrientation;
    static start() {
        Game.gameTextElement.parentElement.addEventListener('click', calibration);
        function calibration(e) {
            window.addEventListener("deviceorientation", setOrientation);
            function setOrientation(e) {
                Game.deviceOrientation = Game.findRotation(e.gamma, e.beta);
                console.log(e.gamma, e.beta);
                window.removeEventListener("deviceorientation", setOrientation);
            }
            let seconds = 3;
            const intervalId = setInterval(() => {
                Game.gameTextElement.innerText = seconds.toString();
                seconds--;
                if (seconds < 0) {
                    clearInterval(intervalId);
                    Game.nextWord();
                    window.addEventListener("deviceorientation", Game.manageTilt);
                }
            }, 1000);
            Game.gameTextElement.parentElement.removeEventListener('click', calibration);
        }
    }
    static end() {
        window.removeEventListener("deviceorientation", Game.manageTilt);
        document.getElementById("correctAnswersCount").innerText = Game.correctAnswers.toString();
        Game.gameEndModal.showModal();
    }
    static nextWord() {
        if (Game.gamePackItems.length < 1) {
            Game.end();
            return;
        }
        Game.isChecking = false;
        setTimeout(() => {
            Game.gameTextElement.parentElement.classList.remove("correct");
            Game.gameTextElement.parentElement.classList.remove("skip");
            Game.gameTextElement.innerText = Game.gamePackItems.shift();
        }, 500);
    }
    static findRotation(centerGamma, centerBeta) {
        // Case if Landscape
        if (window.innerWidth > window.innerHeight) {
            if (Math.abs(centerGamma) <= 60) {
                alert('Please center your device');
                return;
            }
            if (centerGamma < 0 || (centerGamma > 0 && centerBeta && centerBeta < 0)) {
                return 'landscape';
            }
            else if (centerGamma > 0 || (centerGamma < 0 && centerBeta && centerBeta > 0)) {
                return 'rlandscape';
            }
            else {
                console.error("Unexpected landscape gamma or beta");
            }
        }
        else {
            // Case if Portrait
            if (centerBeta && Math.abs(centerBeta) > 50 && Math.abs(centerBeta) < 100) {
                return centerBeta > 0 ? 'portrait' : 'rportrait';
            }
            else
                alert('Please center your device');
        }
    }
    static manageTilt(e) {
        function correct() {
            Game.correctAnswers++;
            Game.gameTextElement.parentElement.classList.add("correct");
            Game.gameTextElement.innerText = "Correct";
        }
        function skip() {
            Game.gameTextElement.parentElement.classList.add("skip");
            Game.gameTextElement.innerText = "Skipped";
        }
        if (e.gamma == undefined) {
            window.removeEventListener("deviceorientation", Game.manageTilt);
            return;
        }
        if (e.gamma > -60 && e.gamma < 20 && Game.isChecking) {
            console.log(Game.deviceOrientation == "rlandscape" ? "down" : "up");
            if (Game.deviceOrientation == "rlandscape")
                correct();
            else
                skip();
            Game.nextWord();
        }
        else if (e.gamma > 20 && e.gamma < 60 && Game.isChecking) {
            console.log(Game.deviceOrientation == "landscape" ? "down" : "up");
            if (Game.deviceOrientation == "landscape")
                correct();
            else
                skip();
            Game.nextWord();
        }
        else if (!Game.isChecking && Math.abs(e.gamma) > 60) {
            Game.isChecking = true;
            console.log("center");
        }
    }
    static loadGamePack(gamePack) {
        const gamePackItems = [...gamePack.words];
        const gamePackItemsShuffled = [];
        while (gamePackItems.length > 0) {
            const randomIndex = Math.floor(Math.random() * gamePackItems.length);
            gamePackItemsShuffled.push(gamePackItems.splice(randomIndex, 1)[0]);
        }
        Game.gamePackItems = gamePackItemsShuffled;
        Game.start();
    }
    static init(gameTextElement) {
        if (Game.initialized)
            throw new Error("Attempted to initialize while already initialized");
        Game.gameTextElement = gameTextElement;
        Game.initialized = true;
    }
}
