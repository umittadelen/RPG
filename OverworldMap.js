class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
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
        Object.values(this.gameObjects).forEach(o => {

            //TODO: determine if this object should actually mount
            o.mount(this);

        })
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
                x: utils.withGrid(8),
                y: utils.withGrid(3),
                src: "./assets/npc_walk.png",
                width: 16,
                height: 16,
            })
        },
        walls:{
            [utils.asGridCoord(4,3)] : true,
            [utils.asGridCoord(5,3)] : true,
            [utils.asGridCoord(6,3)] : true,
            [utils.asGridCoord(7,3)] : true,
            [utils.asGridCoord(4,11)] : true,
            [utils.asGridCoord(5,11)] : true,
            [utils.asGridCoord(4,12)] : true,
            [utils.asGridCoord(5,12)] : true,
            [utils.asGridCoord(16,16)] : true,
            [utils.asGridCoord(16,15)] : true,
            [utils.asGridCoord(15,15)] : true,
            [utils.asGridCoord(15,16)] : true,
            [utils.asGridCoord(10,2)] : true,
            [utils.asGridCoord(10,3)] : true,
            [utils.asGridCoord(11,3)] : true,
            [utils.asGridCoord(12,3)] : true,
            [utils.asGridCoord(13,3)] : true,
            [utils.asGridCoord(14,3)] : true,
            [utils.asGridCoord(15,3)] : true,
            [utils.asGridCoord(16,4)] : true,
            [utils.asGridCoord(1,1)] : true,
            [utils.asGridCoord(2,1)] : true,
            [utils.asGridCoord(3,1)] : true,
            [utils.asGridCoord(4,1)] : true,
            [utils.asGridCoord(5,1)] : true,
            [utils.asGridCoord(6,1)] : true,
            [utils.asGridCoord(7,1)] : true,
            [utils.asGridCoord(8,1)] : true,
            [utils.asGridCoord(9,1)] : true,
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
            [utils.asGridCoord(0,16)] : true,
            [utils.asGridCoord(1,17)] : true,
            [utils.asGridCoord(2,17)] : true,
            [utils.asGridCoord(3,17)] : true,
            [utils.asGridCoord(4,17)] : true,
            [utils.asGridCoord(5,17)] : true,
            [utils.asGridCoord(6,17)] : true,
            [utils.asGridCoord(7,17)] : true,
            [utils.asGridCoord(8,17)] : true,
            [utils.asGridCoord(9,17)] : true,
            [utils.asGridCoord(10,17)] : true,
            [utils.asGridCoord(11,17)] : true,
            [utils.asGridCoord(12,17)] : true,
            [utils.asGridCoord(13,17)] : true,
            [utils.asGridCoord(14,17)] : true,
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
            })
        }
    },
}