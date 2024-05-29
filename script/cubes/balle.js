class balle {
    constructor() {
        this.radius = 10;
        this.reset();
    }

    reset() {
        this.x = ZoneDeJeu.width / 2;
        this.y = ZoneDeJeu.height - 30
        this.dx = 2;
        this.dy = 2
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#0095dd';
        ctx.fill();
        ctx.closePath();
    }

    bouge() {
        this.x += this.dx;
        this.y += this.dy;
    }

    rebondit(axe) {
        this['d' + axe] = -this['d' + axe]
    }


}

var balleHere = SC.evt('je suis la balle');
var progBalle = SC.par(
    SC.generate(balleHere, SC.my("me"), SC.forever), //signalement de la position
    SC.action(SC.my("bouge"), SC.forever),
    SC.generate(drawMe, SC.my('me'), SC.forever)
);

var cubeBalle = SC.cube(new balle(), progBalle)