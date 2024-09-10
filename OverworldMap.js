class OverworldMap {
    constructor(config) {
        this.overworld = null;
        this.gameObjects = config.gameObjects;
        this.cutsceneSpaces = config.cutsceneSpaces || {};
        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;

        this.isCutscenePlaying = false;
    }

    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.lowerImage,
            utils.withGrid(8) - cameraPerson.x,
            utils.withGrid(8) - cameraPerson.y
        )
    }

    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.upperImage,
            utils.withGrid(8) - cameraPerson.x,
            utils.withGrid(8) - cameraPerson.y
        )
    }

    isSpaceTaken(currentX, currentY, direction) {
        const {x,y} = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }

    mountObjects() {
        Object.keys(this.gameObjects).forEach(key => {

            let object = this.gameObjects[key];
            object.id = key;

            //TODO: determine if this object should actually mount
            object.mount(this);

        })
    }

    async startCutscene(events){
        this.isCutscenePlaying = true;

        for (let i=0; i<events.length; i++) {
            const eventHandler = new OverworldEvent({
                event: events[i],
                map: this
            })
            await eventHandler.init();
        }

        this.isCutscenePlaying = false;

        //Reset NPCs to their idle behavior
        Object.values(this.gameObjects).forEach(object => object.doBehaviorEvent(this))
    }

    checkForActionCutscene() {
        const hero = this.gameObjects["hero"];
        const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction);
        const match = Object.values(this.gameObjects).find(object => {
            return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`
        });
        if (!this.isCutscenePlaying && match && match.talking.length) {
            this.startCutscene(match.talking[0].events)
        }
    }

    checkForFootstepCutscene() {
        const hero = this.gameObjects["hero"];
        const match = this.cutsceneSpaces[`${hero.x},${hero.y}`];
        if (!this.isCutscenePlaying && match) {
            this.startCutscene(match[0].events)
        }
    }

    addWall(x,y) {
        this.walls[`${x},${y}`] = true;
    }
    removeWall(x,y) {
        delete this.walls[`${x},${y}`]
    }
    moveWall(wasX, wasY, direction) {
        this.removeWall(wasX, wasY);
        const {x,y} = utils.nextPosition(wasX, wasY, direction);
        this.addWall(x,y);
    }

}

window.OverworldMaps = {
    LivingRoom: {
        lowerSrc: "./assets/maps/LivingRoom/Lower.png",
        upperSrc: "./assets/maps/LivingRoom/Upper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(8),
                y: utils.withGrid(8),
                src: "./assets/npc_walk.png",
                width: 16,
                height: 16,
                shadow: "./assets/empty.png"
            }),
            npc1: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(5),
                src: "./assets/cats/cat (1).png",
                width: 32,
                height: 32,
                shadow: "./assets/empty.png",
                animations:{
                    "idle-down": [[1,0]],
                    "idle-right": [[1,2]],
                    "idle-up": [[1,3]],
                    "idle-left": [[1,1]],
                    "walk-down": [[0,0],[1,0],[2,0],[1,0]],
                    "walk-right": [[0,2],[1,2],[2,2],[1,2]],
                    "walk-up": [[0,3],[1,3],[2,3],[1,3]],
                    "walk-left": [[0,1],[1,1],[2,1],[1,1]]
                }
            }),
            npc2: new Person({
                x: utils.withGrid(14),
                y: utils.withGrid(9),
                src: "./assets/npc_walk.png",
                width: 16,
                height: 16,
                shadow: "./assets/empty.png",
                behaviorLoop: [
                    {type: "stand", direction: "right", time: 200},
                    {type: "stand", direction: "down", time: 800},
                    {type: "stand", direction: "left", time: 600},
                    {type: "stand", direction: "up", time: 1200},
                    {type: "stand", direction: "left", time: 2000}
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "I'm busy...", faceHero: "npc2"},
                            {type: "textMessage", text: "Go away!"},
                            {who: "npc2", type: "walk", direction: "up"},
                            {who: "npc2", type: "walk", direction: "up"},
                            {who: "npc2", type: "walk", direction: "up"},
                            {who: "npc2", type: "walk", direction: "up"},
                            {who: "npc2", type: "walk", direction: "down"},
                            {who: "npc2", type: "walk", direction: "down"},
                            {who: "npc2", type: "walk", direction: "down"},
                            {who: "npc2", type: "walk", direction: "down"},
                        ]
                    }
                ]
            })
        },
        walls:{
            [utils.asGridCoord(4,3)] : true,
            [utils.asGridCoord(5,3)] : true,
            [utils.asGridCoord(6,3)] : true,
            [utils.asGridCoord(7,3)] : true,
            [utils.asGridCoord(0,1)] : true,
            [utils.asGridCoord(0,2)] : true,
            [utils.asGridCoord(0,3)] : true,
            [utils.asGridCoord(0,4)] : true,
            [utils.asGridCoord(0,5)] : true,
            [utils.asGridCoord(0,6)] : true,
            [utils.asGridCoord(0,7)] : true,
            [utils.asGridCoord(0,8)] : true,
            [utils.asGridCoord(0,9)] : true,
            [utils.asGridCoord(0,10)] : true,
            [utils.asGridCoord(0,11)] : true,
            [utils.asGridCoord(0,12)] : true,
            [utils.asGridCoord(0,13)] : true,
            [utils.asGridCoord(0,14)] : true,
            [utils.asGridCoord(0,15)] : true,
            [utils.asGridCoord(1,16)] : true,
            [utils.asGridCoord(2,16)] : true,
            [utils.asGridCoord(3,16)] : true,
            [utils.asGridCoord(4,16)] : true,
            [utils.asGridCoord(5,16)] : true,
            [utils.asGridCoord(6,16)] : true,
            [utils.asGridCoord(7,16)] : true,
            [utils.asGridCoord(8,16)] : true,
            [utils.asGridCoord(9,16)] : true,
            [utils.asGridCoord(10,16)] : true,
            [utils.asGridCoord(11,16)] : true,
            [utils.asGridCoord(12,16)] : true,
            [utils.asGridCoord(13,16)] : true,
            [utils.asGridCoord(14,16)] : true,
            [utils.asGridCoord(15,16)] : true,
            [utils.asGridCoord(16,16)] : true,
            [utils.asGridCoord(1,0)] : true,
            [utils.asGridCoord(2,0)] : true,
            [utils.asGridCoord(3,0)] : true,
            [utils.asGridCoord(4,0)] : true,
            [utils.asGridCoord(5,0)] : true,
            [utils.asGridCoord(6,0)] : true,
            [utils.asGridCoord(7,0)] : true,
            [utils.asGridCoord(8,0)] : true,
            [utils.asGridCoord(9,0)] : true,
            [utils.asGridCoord(10,0)] : true,
            [utils.asGridCoord(11,0)] : true,
            [utils.asGridCoord(12,0)] : true,
            [utils.asGridCoord(13,0)] : true,
            [utils.asGridCoord(14,0)] : true,
            [utils.asGridCoord(15,0)] : true,
            [utils.asGridCoord(16,0)] : true,
            [utils.asGridCoord(17,1)] : true,
            [utils.asGridCoord(17,2)] : true,
            [utils.asGridCoord(17,3)] : true,
            [utils.asGridCoord(17,4)] : true,
            [utils.asGridCoord(17,5)] : true,
            [utils.asGridCoord(17,6)] : true,
            [utils.asGridCoord(17,7)] : true,
            [utils.asGridCoord(17,8)] : true,
            [utils.asGridCoord(17,9)] : true,
            [utils.asGridCoord(17,10)] : true,
            [utils.asGridCoord(17,11)] : true,
            [utils.asGridCoord(17,12)] : true,
            [utils.asGridCoord(17,13)] : true,
            [utils.asGridCoord(17,14)] : true,
            [utils.asGridCoord(17,15)] : true,
            [utils.asGridCoord(10,1)] : true,
            [utils.asGridCoord(10,2)] : true,
            [utils.asGridCoord(10,3)] : true,
            [utils.asGridCoord(11,3)] : true,
            [utils.asGridCoord(12,3)] : true,
            [utils.asGridCoord(13,3)] : true,
            [utils.asGridCoord(14,3)] : true,
            [utils.asGridCoord(15,4)] : true,
            [utils.asGridCoord(16,4)] : true,
            [utils.asGridCoord(15,15)] : true,
            [utils.asGridCoord(16,15)] : true,
            [utils.asGridCoord(4,11)] : true,
            [utils.asGridCoord(5,11)] : true,
            [utils.asGridCoord(4,12)] : true,
            [utils.asGridCoord(5,12)] : true,
        },
        cutsceneSpaces: {
            [utils.asGridCoord(6,4)]: [
                {
                    events: [
                        {who: "hero", type: "walk", direction: "down"},
                        {who: "hero", type: "stand", direction: "up"},
                        {who: "npc1", type: "walk", direction: "left"},
                        {type: "textMessage", text: "WAIT !...", faceHero: "npc1"},
                        {type: "textMessage", text: "You need to register before reading"},
                        {who: "npc1", type: "walk", direction: "right"},
                        {who: "npc1", type: "stand", direction: "down", time:100}
                    ]
                }
            ],
            [utils.asGridCoord(12,8)]: [
                {
                    events: [
                        {type: "changeMap", map: "OtherLivingRoom"}
                    ]
                }
            ]
        }
    },
    OtherLivingRoom: {
        lowerSrc: "./assets/maps/LivingRoom/Lower.png",
        upperSrc: "./assets/maps/LivingRoom/Upper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(11),
                y: utils.withGrid(8)+16,
                src: "./assets/npc_walk.png",
                width: 16,
                height: 16,
                shadow: "./assets/empty.png"
            }),
            npc2: new Person({
                x: utils.withGrid(14),
                y: utils.withGrid(9),
                src: "./assets/npc_walk.png",
                width: 16,
                height: 16,
                shadow: "./assets/empty.png",
                behaviorLoop: [
                    {type: "stand", direction: "right", time: 200},
                    {type: "stand", direction: "down", time: 800},
                    {type: "stand", direction: "left", time: 600},
                    {type: "stand", direction: "up", time: 1200},
                    {type: "stand", direction: "left", time: 2000}
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "How did you fell down?", faceHero: "npc2"},
                            {type: "textMessage", text: "Are you ok?"},
                            {who: "npc2", type: "walk", direction: "up"},
                            {who: "npc2", type: "walk", direction: "up"},
                            {who: "npc2", type: "walk", direction: "down"},
                            {who: "npc2", type: "walk", direction: "down"},
                            {type: "textMessage", text: "Do you need help?", faceHero: "npc2"},
                        ]
                    }
                ]
            })
        },
        walls:{
            [utils.asGridCoord(4,3)] : true,
            [utils.asGridCoord(5,3)] : true,
            [utils.asGridCoord(6,3)] : true,
            [utils.asGridCoord(7,3)] : true,
            [utils.asGridCoord(0,1)] : true,
            [utils.asGridCoord(0,2)] : true,
            [utils.asGridCoord(0,3)] : true,
            [utils.asGridCoord(0,4)] : true,
            [utils.asGridCoord(0,5)] : true,
            [utils.asGridCoord(0,6)] : true,
            [utils.asGridCoord(0,7)] : true,
            [utils.asGridCoord(0,8)] : true,
            [utils.asGridCoord(0,9)] : true,
            [utils.asGridCoord(0,10)] : true,
            [utils.asGridCoord(0,11)] : true,
            [utils.asGridCoord(0,12)] : true,
            [utils.asGridCoord(0,13)] : true,
            [utils.asGridCoord(0,14)] : true,
            [utils.asGridCoord(0,15)] : true,
            [utils.asGridCoord(1,16)] : true,
            [utils.asGridCoord(2,16)] : true,
            [utils.asGridCoord(3,16)] : true,
            [utils.asGridCoord(4,16)] : true,
            [utils.asGridCoord(5,16)] : true,
            [utils.asGridCoord(6,16)] : true,
            [utils.asGridCoord(7,16)] : true,
            [utils.asGridCoord(8,16)] : true,
            [utils.asGridCoord(9,16)] : true,
            [utils.asGridCoord(10,16)] : true,
            [utils.asGridCoord(11,16)] : true,
            [utils.asGridCoord(12,16)] : true,
            [utils.asGridCoord(13,16)] : true,
            [utils.asGridCoord(14,16)] : true,
            [utils.asGridCoord(15,16)] : true,
            [utils.asGridCoord(16,16)] : true,
            [utils.asGridCoord(1,0)] : true,
            [utils.asGridCoord(2,0)] : true,
            [utils.asGridCoord(3,0)] : true,
            [utils.asGridCoord(4,0)] : true,
            [utils.asGridCoord(5,0)] : true,
            [utils.asGridCoord(6,0)] : true,
            [utils.asGridCoord(7,0)] : true,
            [utils.asGridCoord(8,0)] : true,
            [utils.asGridCoord(9,0)] : true,
            [utils.asGridCoord(10,0)] : true,
            [utils.asGridCoord(11,0)] : true,
            [utils.asGridCoord(12,0)] : true,
            [utils.asGridCoord(13,0)] : true,
            [utils.asGridCoord(14,0)] : true,
            [utils.asGridCoord(15,0)] : true,
            [utils.asGridCoord(16,0)] : true,
            [utils.asGridCoord(17,1)] : true,
            [utils.asGridCoord(17,2)] : true,
            [utils.asGridCoord(17,3)] : true,
            [utils.asGridCoord(17,4)] : true,
            [utils.asGridCoord(17,5)] : true,
            [utils.asGridCoord(17,6)] : true,
            [utils.asGridCoord(17,7)] : true,
            [utils.asGridCoord(17,8)] : true,
            [utils.asGridCoord(17,9)] : true,
            [utils.asGridCoord(17,10)] : true,
            [utils.asGridCoord(17,11)] : true,
            [utils.asGridCoord(17,12)] : true,
            [utils.asGridCoord(17,13)] : true,
            [utils.asGridCoord(17,14)] : true,
            [utils.asGridCoord(17,15)] : true,
            [utils.asGridCoord(10,1)] : true,
            [utils.asGridCoord(10,2)] : true,
            [utils.asGridCoord(10,3)] : true,
            [utils.asGridCoord(11,3)] : true,
            [utils.asGridCoord(12,3)] : true,
            [utils.asGridCoord(13,3)] : true,
            [utils.asGridCoord(14,3)] : true,
            [utils.asGridCoord(15,4)] : true,
            [utils.asGridCoord(16,4)] : true,
            [utils.asGridCoord(15,15)] : true,
            [utils.asGridCoord(16,15)] : true,
            [utils.asGridCoord(4,11)] : true,
            [utils.asGridCoord(5,11)] : true,
            [utils.asGridCoord(4,12)] : true,
            [utils.asGridCoord(5,12)] : true,
        },
        cutsceneSpaces: {
            [utils.asGridCoord(6,4)]: [
                {
                    events: [
                        {who: "hero", type: "walk", direction: "down"},
                        {who: "hero", type: "stand", direction: "up"},
                        {who: "npc1", type: "walk", direction: "left"},
                        {type: "textMessage", text: "WAIT !...", faceHero: "npc1"},
                        {type: "textMessage", text: "You need to register before reading"},
                        {who: "npc1", type: "walk", direction: "right"},
                    ]
                }
            ]
        }
    }
}