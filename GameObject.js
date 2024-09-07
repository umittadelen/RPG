class GameObject {
    constructor(config) {
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
    }

    mount(map) {
        this.isMounted = true;
        map.addWall(this.x, this.y);
    }

    update() {
        
    }
}