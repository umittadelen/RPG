class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
    }

    drawLowerImage(ctx) {
        ctx.drawImage(this.lowerImage, 0, 0);
    }

    drawUpperImage(ctx) {
        ctx.drawImage(this.upperImage, 0, 0);
    }
}

window.OverworldMaps = {
    LivingRoom: {
        lowerSrc: "./assets/maps/LivingRoom/Lower.png",
        upperSrc: "./assets/maps/LivingRoom/Upper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(2),
                y: utils.withGrid(2),
                src: "./assets/npc_walk.png",
                width: 16,
                height: 16,
                shadow: "./assets/empty.png"
            }),
            npc1: new Person({
                x: utils.withGrid(8),
                y: utils.withGrid(3),
                src: "./assets/npc_walk.png",
                width: 16,
                height: 16,
            }),
        }
    },
    Kitchen: {
        lowerSrc: "./assets/maps/KitchenLower.png",
        upperSrc: "./assets/maps/KitchenUpper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: 2,
                y: 2,
                width: 16,
                height: 16,
                shadow: "./assets/npc_walk.png"
            }),
            npc1: new GameObject({
                x: 4,
                y: 3,
                src: "./assets/npc_walk.png",
                width: 16,
                height: 16,
            }),
            npc2: new GameObject({
                x: 6,
                y: 3,
                src: "./assets/npc_walk.png",
                width: 16,
                height: 16,
            }),
        }
    },
}