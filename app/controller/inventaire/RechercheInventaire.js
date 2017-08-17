/****************************************
 *
 *
 *
 ****************************************/

Ext.define('GestImmob.controller.inventaire.RechercheInventaire',
    {
        extend: 'Ext.app.Controller',
        views: [
            'inventaire.RechercheInventaire',
            'inventaire.ficheInventaire'
        ],
        stores: [
            //'Inventaires',
            'CodesMateriel',
            'SectionsAnalytiques'
        ],
        refs: [
            {
                ref: 'panneauRechercheInventaire',
                selector: '#idRechercheInventaire'
            },
            {
                ref: 'btnPrev',
                selector: '#idRechercheInventaire button[action="precedant"]'
            },
            {
                ref: 'btnNext',
                selector: '#idRechercheInventaire button[action="suivant"]'
            },
            {
                ref: 'btnOk',
                selector: '#idRechercheInventaire button[action="ok"]'
            },
            {
                ref: 'frmRechercheInventaire',
                selector: '#idRechercheInventaire rechercheInventaireChamps form'
            },
            {
                ref: 'tabRechercheInventaire',
                selector: '#idRechercheInventaire rechercheInventaireResultat grid'
            }
        ],

        init: function () {
            this.control({
                '#idRechercheInventaire button[action="suivant"]': {
                    click: this.ecranSuivant
                },
                '#idRechercheInventaire button[action="precedant"]': {
                    click: this.ecranPrecedant
                },
                '#idRechercheInventaire button[action="ok"]': {
                    click: this.fermePanneau
                },
                '#idRechercheInventaire button[action="print"]': {
                    click: this.imprRechInv
                },
                '#idRechercheInventaire button[action="txt"]': {
                    click: this.imprRechInvTXT
                },
                '#idRechercheInventaire button[action="modif"]': {
                    click: this.ouvreFicheInventaire
                },
                '#idRechercheInventaire button[action="export"]': {
                    click: this.exportRechInv
                }
            });
        },

        ecranSuivant: function () {
            var controller = this,
                frmRechercheInventaire = this.getFrmRechercheInventaire(),
                values = frmRechercheInventaire.getValues(),
                storeInv = Ext.create('GestImmob.store.Inventaires'),
                waitWin, task;

            storeInv.sorters.clear();
            storeInv.groupers.clear();

            if (frmRechercheInventaire.isValid()) {
                waitWin = Ext.Msg.waitProgress(2);
                //on differe la tache pour afficher la progress
                task = new Ext.util.DelayedTask(function () {
                    controller.getPanneauRechercheInventaire().getLayout().setActiveItem(1);
                    controller.getBtnNext().hide();
                    controller.getBtnOk().show();
                    controller.getBtnPrev().setDisabled(false);

                    //on charge le store
                    controller.getTabRechercheInventaire().reconfigure(storeInv);
                    storeInv.load({
                        scope: controller,
                        params: {
                            op: 'Rech',
                            valeurs: Ext.JSON.encode(values)
                        },
                        callback: function (records, op, success) {
                            if (success) {
                                waitWin.close();
                            }
                            else
                                statError("Erreur Lecture (Inventaires)");
                        }
                    });
                });
                task.delay(400);
            }
            else
                Ext.Msg.error("Erreur", "Veuillez vérifié votre saisie");
        },
        ecranPrecedant: function () {
            this.getPanneauRechercheInventaire().getLayout().setActiveItem(0);
            this.getBtnNext().show();
            this.getBtnOk().hide();
            this.getBtnPrev().setDisabled(true);
        },
        ouvreFicheInventaire: function () {
            var record = this.getTabRechercheInventaire().getSelectionModel().getSelection();

            if (record.length != 1)
                Ext.Msg.error('Erreur', 'Veuillez selectionner <b>UNE SEULE</b> ligne');
            else Ext.widget('ficheInventaire', {
                numeroLigne: record[0].get('numero_ligne'),
                src: this
            });
        },
        fermePanneau: function (btn) {
            if (this.getPanneauRechercheInventaire().getSrc() == 'menu') {
                btn.up('rechercheInventairePanel').close();
                renderInMain();
            }
        },
        imprRechInv: function (dest) {
            var storeInv = this.getTabRechercheInventaire().getStore(),
                values = this.getFrmRechercheInventaire().getValues(),
                param = "";
            //Destination
            if(dest=="txt") param += "&d=t&";

            //tri
            if (typeof storeInv.sorters.items[0] !== 'undefined')
                param += "&s=1&" +
                storeInv.sorters.items[0]['property'] + "=" + storeInv.sorters.items[0]['direction'];

            //filtres
            param += "&valeurs=" + Ext.JSON.encode(values);

            window.open('php/print/RechInventaire.php?' + param, '_blank', 'location=no, menubar=no, status=no').document.title = "Impression";
        },
        exportRechInv: function () {
            var corresp = [
                {
                    prop: 'code_presence',
                    corrsp: []
                }
            ];
            corresp[0]['corrsp'][0] = 'Actif';
            corresp[0]['corrsp'][1] = 'Reformé';
            corresp[0]['corrsp'][2] = 'Vendu';
            corresp[0]['corrsp'][3] = 'Perdu';
            corresp[0]['corrsp'][5] = 'Entrée';

            exportToCsv(this.getTabRechercheInventaire(), corresp);
        },
        imprRechInvTXT: function () {
            this.imprRechInv("txt");
        }
    },

    null);
