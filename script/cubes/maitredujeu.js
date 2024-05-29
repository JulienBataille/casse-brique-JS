class MaitreDuJeu {
    constructor() {
        this.me = this;
        this.reset();
    }

    reset() {
        this.life = 3;
        this.score = 0;
    }

    draw(ctx) {
        this.drawScore(ctx)
        this.drawLife(ctx)
    }

    drawScore(ctx) {
        ctx.font = '16px arial'
        ctx.fillStyle = "#0095dd"
        ctx.fillText("score : " + this.score, 8, 20)
    }

    drawLife(ctx) {
        ctx.font = '16px arial'
        ctx.fillStyle = "#0095dd"
        ctx.fillText("life : " + this.life, ZoneDeJeu.width - 65, 20)
    }

    addPoint() {
        this.score += 1;
    }

    retireVie() {
        if (this.life == 0) {
            this.afficheFin(obj_all, machine, 'perdu')
        } else {
            this.life -= 1;
        }
    }

    afficheFin(obj_all, machine, message = "bravo") {
        alert(message)
        machine.generateEvent('jeu fini')
        this.reset
    }
}

let jeuFini = SC.evt("fin");
let progMaitreDuJeu = SC.par(
    SC.generate(drawMe, SC.my('me'), SC.forever),
    SC.seq(
        SC.pause(),
        SC.par(
            SC.kill(
                jeuFini,
                SC.actionOn(briqueHere),
                SC.NO_ACTION, SC.my('afficheFin'), 
                SC.forever
            )
        ),
        SC.actionOn(
            addPoint,
            SC.my("addPoint"),
            undefined,
            SC.forever
        ),
        SC.actionOn(
            retireVie,
            SC.my("retireVie"),
            undefined,
            SC.forever
        )
    )
)

let cubeMaitreDuJeu = SC.cube(new MaitreDuJeu(), progMaitreDuJeu)
