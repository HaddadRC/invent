/****************************************
 *
 *
 *
 ***************************************/
Ext.define('BarreEtat',
    {
        extend: 'Ext.ux.StatusBar',
        alias: 'widget.barreEtat',
        id: 'mainStatusbar',

        busyText: 'Chargement en cours ...',

        // defaults to use when the status is cleared:
        defaultText: 'Prêt',
        defaultIconCls: 'x-status-valid',

        // valeurs initiales
        text: 'Prêt',
        iconCls: 'x-status-valid',

        items: [
            {
                xtype: 'progressbar',
                id: 'statProgress',
                text: 'traitement...',
                width: 150,
                height: 18,
                hidden: true
            }
        ]

    },
    null);

/** Affiche msg avec icone d'erreur */
function statError(msg) {
    var sb = Ext.getCmp('mainStatusbar');
    sb.setStatus({
        text: msg,
        iconCls: 'x-status-error'
//        clear: true // auto-clear after a set interval
    });
}
/** Affiche msg avec icone d'avertissement
 * @param {String} msg texte à afficher ds la statBar
 * @param {Boolean} [autoClear]  effacer le msg apres un certain temps*/
function statWarning(msg, autoClear) {
    var sb = Ext.getCmp('mainStatusbar');
    if (autoClear)
        sb.setStatus({
            text: msg,
            iconCls: 'x-status-warning',
            clear: true
        });
    else
        sb.setStatus({
            text: msg,
            iconCls: 'x-status-warning'
        });
}
/** Affiche msg avec icone d'info
 * @param {String} msg texte à afficher ds la statBar*/
function statInfo(msg) {
    var sb = Ext.getCmp('mainStatusbar');
    sb.setStatus({
        text: msg,
        iconCls: 'x-status-info',
        clear: true
    });
}
/** Affiche msg avec icone de chargement
 * @param {String} [msg] texte à afficher ds la progress, "Chargement..." par défaut
 */
function statBusy(msg) {
    var sb = Ext.getCmp('mainStatusbar');
    if (typeof msg === 'undefined') msg = "Chargement...";
    sb.clearStatus();
    sb.showBusy(msg);
}
/** Affiche le msg 'Enregistrement effectué' avec icone d'enreg (avec auto-clear)*/
function statSaved() {
    var sb = Ext.getCmp('mainStatusbar');
    sb.setStatus({
        text: 'Enregistrement effectué',
        iconCls: 'x-status-save',
        clear: true // auto-clear after a set interval
    });
}
/** Efface le contenu de la statBar
 * @param {Boolean} [useDefaults] si vrai on affiche les vals par defaut
 */
function statClear(useDefaults) {
    var sb = Ext.getCmp('mainStatusbar');

    if (useDefaults)
        sb.clearStatus({
            anim: true,
            useDefaults: true
        });
    else
        sb.clearStatus({
            anim: true,
            useDefaults: false
        });
}
/** Affiche et met une val ds la progressBar
 * @param {Number} val valeur de la progress bar(0<=val<=1)
 * @param {Boolean} [pourcentage] si vrai on affiche le pourcentage de l'avencement
 * @param {String} [text] texte à afficher ds la progress
 */
function statProgessSetVal(val, pourcentage, text) {
    var sbProg = Ext.getCmp('statProgress');
    sbProg.show();
    if (pourcentage === true) {
        sbProg.updateProgress(val, Ext.util.Format.round(val * 100, 0) + '%');
    }
    else {
        if (typeof text !== 'undefined')
            sbProg.updateProgress(val, text);
        else
            sbProg.updateProgress(val);
    }
}
/** Cache la progressBar */
function statProgessHide() {
    var sbProg = Ext.getCmp('statProgress');
    sbProg.hide();
}


