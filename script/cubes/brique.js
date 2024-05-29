class Brique {
    constructor(col, ligne, force) {
        this.width = 75;
        this.height = 20;
        this.margin = 10;

        this.offsetTop = 30;
        this.offsetLeft = 30;

        this.force = force;
        this.color = this.colorise();

        this.x = col * (this.width + this.margin) + this.offsetLeft;
        this.y = ligne * (this.height + this.margin) + this.offsetTop;

        this.killMe = SC.evt('kill');

    }

    colorise() {
        let color = ["#0095dd", "#00ffff"];
        return color[this.force];
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height)
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    verifSiTouched(obj_all, machine) {
        const radius = obj_all['balleHere'][0].radius;
        const xBalle = obj_all['balleHere'][0].x;
        const yBalle = obj_all['balleHere'][0].y;
        const dxBalle = obj_all['balleHere'][0].dx;
        const dyBalle = obj_all['balleHere'][0].dy;

        if (xBalle >= this.x && xBalle <= this.x + this.width) {
            if (
                // la balle touche dessus la brique
                yBalle - radius <= this.y + this.height
                && yBalle - radius >= this.y + this.height - Math.abs(dyBalle)
                // la balle touche le dessous de la brique
                || yBalle + radius >= this.y
                && yBalle + radius <= this.y + Math.abs(dyBalle)
            ) {
                obj_all['balleHere'][0].rebondit('y');
                this.iAmTouched(machine)
            }
        }

        if (yBalle >= this.y && yBalle <= this.y + this.height) {
            if (
                //la balle touche le coté droit de la brique
                xBalle - radius <= this.x + this.width
                && xBalle - radius >= this.x + this.width - Math.abs(dxBalle)
                // la balle touche le coté gauche de la brique
                || xBalle + radius >= this.x
                && xBalle + radius <= this.x + Math.abs(dxBalle)
            ) {
                obj_all['balleHere'][0].rebondit('x')
                this.iAmTouched(machine)
            }
        }

    }

    iAmTouched(machine) {
        if (this.force == 0) {
            machine.generateEvent(this.killMe)
        } else {
            this.force -= 1;
            this.color = this.colorise();
        }

        machine.generateEvent("addPoint")
    }
}

let briqueHere = SC.evt('je suis une brique et encore en vie');
let addPoint = SC.evt('ajoute une point');
let progBrique = SC.par(
    SC.generate(briqueHere, SC.my('me'), SC.forever),
    SC.actionOn(balleHere, SC.my('verifSiTouched'), undefined, SC.forever),
    SC.generate(drawMe, SC.my('me'), SC.forever)
)

let tab2D_cubeBrique = [];
let nbLignes = 5;
let nbColonnes = 9;

for (let colonne = 0; colonne < nbColonnes; colonne++) {
    tab2D_cubeBrique[colonne] = [];
    for (let ligne = 0; ligne < nbLignes; ligne++) {
        let power = 0;
        if (colonne % 2 == 0) {
            power = 1
        }
        // let power = colonne %2 == 0 ? 1 : 0;
        tab2D_cubeBrique[colonne][ligne] = SC.cube(
            new Brique(colonne, ligne, power),
            SC.kimm(SC.my('killMe'), progBrique)
        )
    }
}