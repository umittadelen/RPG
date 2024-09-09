class GameObject {
    constructor(config) {
        this.id = null;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        this.width = config.width || 16;
        this.height = config.height || 16;

        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "./assets/walk and idle.png",
            shadow: config.shadow || "./assets/empty.png",
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