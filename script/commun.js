'use strict'

var drawMe = SC.evt('dessine moi');
var retireVie = SC.evt('retire une vie');

// a titre d'exemple les deux fonctions servent à importer les scripts en JS 6

function ajouteFinBody(elt) {
    document.body.appendChild(elt)
}

function includeScript(ps_url) {
    const lElt_script = document.createElement('script');
    lElt_script.src = ps_url;
    ajouteFinBody(lElt_script);
}

// ses deux fonctions servent à importer les includes des scripts qui evite de les inclures dans le HTML