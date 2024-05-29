class Raquette {
    constructor() {
        this.height = 10;
        this.width = 80;

        this.y = ZoneDeJeu.height - this.height;
        this.reset()
    }

    reset() {
        this.x = (ZoneDeJeu.width - this.width) / 2
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height)
        ctx.fillStyle = "#32a8a4";
        ctx.fill();
        ctx.closePath();
    }

    bouge() {
        //guillaume fait la souris et pour demain le groupe fait le tactile

        document.addEventListener('mousemove', evt => {
            let relativeX = evt.clientX - ZoneDeJeu.offsetLeft;
            let min = Math.floor(this.width / 2);
            let max = ZoneDeJeu.width - min

            if (relativeX > min && relativeX < max) {
                this.x = relativeX - min;
            }
        }, false);

    }

    verifSiTouched(obj_all, machine) {
        const radius = obj_all['balleHere'][0].radius;
        const yBalle = obj_all['balleHere'][0].y + radius;
        const xBalle = obj_all['balleHere'][0].x;

        if (yBalle == this.y && xBalle + radius > this.x && xBalle - radius < this.x + this.width) {
            obj_all['balleHere'][0].rebondit('y')
        }


    }
}

var progRaquette = SC.par(
    SC.actionOn(balleHere, SC.my('verifSiTouched'), undefined, SC.forever),
    SC.action(SC.my('bouge')),
    SC.generate(drawMe, SC.my('me'), SC.forever)
)

var cubeRaquette = DC.cube(new Raquette(), progRaquette)