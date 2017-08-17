var uInfo = (function () {
    var prf = '',
        user = '';

    function showPrivate() {
        //console.log(prf);
    }

    return {
        getProfil: function () {
            return (prf);
        },
        getUsr: function () {
            return (user);
        },
        setProfil: function (prfVal) {
            prf = prfVal;
        },
        setUsr: function (usrVal) {
            user = usrVal;
        }
    }

})();

/** Dessine une vue dans la zone 'main'
 * @param {String} [aliasView="logo"] alias(widget) de la vue à dessiner,
 * @param {object} [cfg=null] cofig de la vue,
 * si non spécifié affiche le logo
 */
function renderInMain(aliasView, cfg) {
    var reg = Ext.getCmp('regionMain'),
        vue, fen;

    reg.removeAll(true);

    if (typeof aliasView === 'undefined') vue = 'logo';
    else
        vue = aliasView;

    if (typeof cfg === 'undefined') cfg = null;

    fen = Ext.widget(vue, cfg);
    reg.add(fen);
    reg.doComponentLayout();
}

/** transforme le contenu field en MAJ
 * la fonction est principalement appelée depuis la description du champ
 * @param {Object} field Champ concerné
 * @param {String} value valeur de field
 */
function champEnUpper(field, value) {
    if (value != null)
        field.setValue(Ext.util.Format.uppercase(value));
}

/** mise en forme des champs selon profil
 * @param {String} racine vue mère des champs à mettre en forme
 */
function miseEnFormeChampsSelonProfil(racine) {

    if (uInfo.getProfil() == 'super') return; //il voit tout ;)

    var champs = Ext.ComponentQuery.query(racine + ' [prf]');
    champs.forEach(function (champ) {
        var typeChamp = champ.getXType();
        if (champ['prf'].indexOf(uInfo.getProfil()) == -1) {
            if (typeChamp == 'textfield' || typeChamp == 'combobox') {
                champ.setReadOnly(true);
                champ.setFieldStyle('background-color: #d3d3d3; background-image: none;');
            }
            else if (typeChamp == 'button' || typeChamp == 'splitbutton' || typeChamp == 'panel') {
                champ.hide();
            }
        }
    });
}


/** Retourne null si value est vide (ou blanc(s)) sinon la chaine elle même
 * @param {String} value valeur du champ
 * @return {null/String}
 */
function nullSiVide(value) {
    var Expr = new RegExp(" ", "g");
    if (value == null)
        return null;
    if (value.replace(Expr, "") == "") // fixme: pb si value est un entier
        return null;
    return value;
}

/** Enlèver tous les filtres sur les stores du controller
 * @param {Object} controller valeur du champ
 */
function nettoyageFiltres(controller) {
    controller.stores.forEach(function (store) {
        controller.getStore(store).clearFilter(true);
    });
}

/** Exporte la table grid vers un fichier csv (Export.csv)
 * @param {Object} grid la grille à exporter
 * @param {Array} [correspTab] s'il y a des données à convertir (0=>non; 1=>oui)
 *  on les met sous la forme:
 *  [
 *  {
 *    prop: 'nom_donnée',
 *    corrsp: []
 *    }
 * ]
 * Exemple :coresp[0]['corrsp'][1] = 'non vidée';
 * coresp[0]['corrsp'][2] = 'en cours de traitement';
 * coresp[0]['corrsp'][3] = 'vidée non validée';
 */
function exportToCsv(grid, correspTab) {
    var csvContent = '',
    /*
     Does this browser support the download attribute
     in HTML 5, if so create a comma seperated value
     file from the selected records / if not create
     an old school HTML table that comes up in a
     popup window allowing the users to copy and paste
     the rows.
     */
        noCsvSupport = (!('download' in document.createElement('a'))),
        sdelimiter = noCsvSupport ? "<td>" : "",
        edelimiter = noCsvSupport ? "</td>" : ";",
        snewLine = noCsvSupport ? "<tr>" : "",
        enewLine = noCsvSupport ? "</tr>" : "\r\n",
        printableValue = '',
        tabCols = [],
        correspKeys = [];

    if (typeof correspTab !== 'undefined') {
        correspTab.forEach(function (elt) { //on met les prop ds un tab pour faciliter la recherche
            correspKeys.push(elt['prop']);
        });
    }
    csvContent += snewLine;

    /* Nom des colonnes */
    grid.columns.forEach(function (col) {
        if (!col.hidden && col.xtype != "rownumberer") {
            csvContent += sdelimiter + col.text + edelimiter;
            tabCols.push(col.dataIndex);
        }
    });
    csvContent += enewLine;

    /* Les données */
    grid.getStore().each(function (record) {
        csvContent += snewLine;

        tabCols.forEach(function (elt) { //on met seulement les données affichér ds la table
            var pos = correspKeys.indexOf(elt);
            //on fait la conversion si on trouve le nom de la donnée ds le tab correspKeys
            if (typeof record.get(elt) === 'boolean') {
                if (record.get(elt)) printableValue = 'Oui';
                else printableValue = 'Non';
            }
            else if (pos > -1) {
                printableValue = correspTab[pos]['corrsp'][record.get(elt)];
                printableValue = ((noCsvSupport) && printableValue == '') ? '&nbsp;' : printableValue;
            }
            else {
                printableValue = ((noCsvSupport) && (record.get(elt) == '')) ? '&nbsp;' : record.get(elt);
                if (printableValue == null)
                    if (noCsvSupport) printableValue = '&nbsp;';
                    else printableValue = '';
                if (typeof record.get(elt) == 'object' && record.get(elt) instanceof Date)
                    printableValue = Ext.Date.format(record.get(elt), 'm-Y');
            }
            if (printableValue[0] == '"') printableValue = printableValue.substring(1);
            printableValue = String(printableValue).replace(/;/g, " ");
            printableValue = String(printableValue).replace(/(\r\n|\n|\r)/gm, " ");
            csvContent += sdelimiter + printableValue + edelimiter;
        });
        csvContent += enewLine;
    });

    if (noCsvSupport) {
        /*
         The values below get printed into a blank window for
         the luddites.
         */
        var newWin = open('windowName', "_blank");
        newWin.document.write('<table border=1 cellspacing="0">' + csvContent + '</table>');
    }
    else {
        /*
         This is the code that produces the CSV file and downloads it
         to the users computer
         */
        var link = document.createElement("a");
        link.setAttribute("href", "data:text/csv;charset=UTF-8," + '\ufeff' + encodeURIComponent(csvContent)); //'\ufeff' le caractère BOM
        link.setAttribute("download", "Export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

}
