class GameObject {
    constructor(config) {
        this.id = null;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        this.width = config.width || 16;
        this.height = config.height || 16;
        this.sizewidth = config.sizewidth || 16;
        this.sizeheight = config.sizeheight || 16;
        this.xofset = config.xofset || 0;
        this.yofset = config.yofset || 0;

        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "./assets/walk and idle.png",
            shadow: config.shadow || "./assets/empty.png",
            animations: config.animations || {
                "idle-down": [[0,0]],
                "idle-right": [[0,2]],
                "idle-up": [[0,1]],
                "idle-left": [[0,3]],
                "walk-down": [[1,0],[2,0],[3,0],[0,0]],
                "walk-right": [[1,2],[2,2],[3,2],[0,2]],
                "walk-up": [[1,1],[2,1],[3,1],[0,1]],
                "walk-left": [[1,3],[2,3],[3,3],[0,3]]
            }
        });

        this.behaviorLoop = config.behaviorLoop || [];
        this.behaviorLoopIndex = 0;

        this.talking = config.talking || [];

    }

    mount(map) {
        this.isMounted = true;
        map.addWall(this.x, this.y);

        //if we have a behavior, kick off after a short delay
        setTimeout(() => {
            this.doBehaviorEvent(map);
        }, 10);
    }

    update() {
        
    }

    async doBehaviorEvent(map){

        //dont do anything if there is a more important cutscene
        //or I don't have config to do anything anyway.
        if (map.isCutscenePlaying || this.behaviorLoop.length === 0 || this.isStanding) {
            return;
        }

        //setting up our event with relevant info
        let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
        eventConfig.who = this.id;

        //create an event instance out of our next event config
        const eventHandler = new OverworldEvent({map, event: eventConfig});
        await eventHandler.init();

        //setting the next event to fire
        this.behaviorLoopIndex += 1;
        if(this.behaviorLoopIndex === this.behaviorLoop.length) {
            this.behaviorLoopIndex = 0;
        }

        //do it again!
        this.doBehaviorEvent(map);
    }
}