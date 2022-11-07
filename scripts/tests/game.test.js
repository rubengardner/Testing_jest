
/**
 * @jest-environment jsdom
 */

const { TestScheduler } = require("jest");
const { game, newGame, addTurn, showScore, lightsOn, showTurns, playerTurn} = require("../game");

jest.spyOn(window,'alert').mockImplementation(() =>{})

beforeAll(() => {
    let fs =require('fs');
    let fileContents = fs.readFileSync('index.html', 'utf-8');
    document.open();
    document.write(fileContents);
    document.close();
});

describe('game object contains corrrect keya', () =>{
    test('score key exists', () => {
        expect('score' in game).toBe(true);
    });
    test('currentGame key exists', () => {
        expect('currentGame' in game).toBe(true);
    });
    test('playerMoves key exists', () => {
        expect('playerMoves' in game).toBe(true);
    });
    test('choices key exists', () => {
        expect('choices' in game).toBe(true);
    });
    test('turnNumber key exists', () => {
        expect('turnNumber' in game).toBe(true);
    });
    test('choices contain correct ids', () => {
        expect(game.choices).toEqual(['button1','button2', 'button3', 'button4']);

    });
    test('turnInProgress key exists', () => {
        expect('turnInProgress' in game).toBe(true);
    });
    test('lastButton key exists', () => {
        expect('lastButton' in game).toBe(true);
    });
});

describe('newGame works correctly', () => {
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ["button1", "button2"];
        game.currentGame = ["button1", "button2"];
        document.getElementById("score").innerText = "42";

        newGame();
    });

    test('should set game score to zero', ()=> {
        expect(game.score).toEqual(0);
    });
    test('should clear playerMoves array', ()=> {
        expect(game.playerMoves).toEqual([]);
    });
    test('should be one elememnt in currentGame arrat', ()=> {
        expect(game.currentGame.length).toBe(1);
    });
    test("Should display 0 for the element eith id = score", () => {
        expect(document.getElementById("score").innerText).toBe(0);
    });
    test("expect data-listener to be true", () => {
        const elements = document.getElementsByClassName("circle");
        for (let element of elements){
            expect(element.getAttribute("data-listener")).toEqual("true");
        }
    });
});

describe('gameplay works correctly', ()=> {
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    })
    test("addTurn adds a new turn to the game", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test("Should add correct class to light up buttons", () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain('light')
    })
    test("showTurns should update game.turnNumber", () => {
        turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
    test("Should increment the score if the turn is correct", () =>{
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });
    test("Should call an alert if the move is wrong", () => {
        game.playerMoves.push("wrong");
        playerTurn();
        expect(window.alert).toBeCalledWith("Wrong move!");
    });
    test("Checks turnInProgress is true", () => {
        showTurns();
        expect(game.turnInProgress).toBe(true);
    });
    test("clicking during computer sequence should fail", () => {
        showTurns();
        game.lastButton = "";
        document.getElementById("button2").click();
        expect(game.lastButton).toEqual("");
    })
})


