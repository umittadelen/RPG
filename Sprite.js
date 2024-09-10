class Sprite{
    constructor(config){

        //Set up the image
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        }

        //Shadow
        this.shadow = new Image();
        this.useShadow = true;
        if (this.useShadow){
            this.shadow.src = config.shadow;
        }
        this.shadow.onload = () => {
            this.isShadowLoaded = true;
        }

        //Configure Animation & Initial State
        this.animations = config.animations;
        this.currentAnimation = config.currentAnimation || "idle-down";
        this.currentAnimationFrame = 0;

        this.animationFrameLimit = config.animationFrameLimit || 16;
        this.animationFrameProgress = this.animationFrameLimit;


        //Reference the game object
        this.gameObject = config.gameObject;
    }

    get frame() {
        return this.animations[this.currentAnimation][this.currentAnimationFrame]
    }

    setAnimation(key) {
        if (this.currentAnimation !== key) {
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;
        }
    }

    updateAnimationProgress() {
        //Downtick frame progress
        if (this.animationFrameProgress > 0) {
            this.animationFrameProgress -= 1;
            return;
        }

        //Reset the counter
        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame += 1;

        if (this.frame === undefined) {
            this.currentAnimationFrame = 0
        }


    }

    draw(ctx, cameraPerson) {
        const x = this.gameObject.x + utils.withGrid(8) - cameraPerson.x;
        const y = this.gameObject.y - 16 + utils.withGrid(8) - cameraPerson.y;
        const width = this.gameObject.width;
        const height = this.gameObject.height;

        this.isShadowLoaded && ctx.drawImage(this.shadow, x, y)

        const [frameX, frameY] = this.frame;

        this.isLoaded && ctx.drawImage(this.image,
            frameX*width,frameY*height,          // left|top cut
            width,height, // width|height of cut
            x,y,
            16,16, // width|height of image
        )

        this.updateAnimationProgress();
    }
    
}