/****************************************
 *
 *
 *
 ****************************************/

Ext.define('GestImmob.controller.inventaire.FicheInventaire',
    {
        extend: 'Ext.app.Controller',
        views: [
            'inventaire.ficheInventaire'
        ],
        stores: [
            'Inventaires',
            'CodesMateriel',
            'LotsMateriel',
            'ComptesGeneraux',
            'SectionsAnalytiques'

        ],
        refs: [
            {
                ref: 'fenFicheInventaire',
                selector: 'ficheInventaire'
            },
            {
                ref: 'frmFicheInventaire',
                selector: 'ficheInventaire form'
            },
            {
                ref: 'tabLot',
                selector: 'ficheInventaire form tabpanel'
            }
        ],

        init: function () {
            this.control({
                'ficheInventaire': {
                    afterrender: this.chargeInfoLgnInv,
                    'close': this.nettoyageController
                },
                'ficheInventaire button[action="ok"]': {
                    click: this.enregInv
                }
            });
        },
        nettoyageController: function () {
            nettoyageFiltres(this);
        },
        chargeInfoLgnInv: function () {
            var NumLigne = this.getFenFicheInventaire().getNumeroLigne(),
                frmInventaire = this.getFrmFicheInventaire().getForm(),
                tabLot = this.getTabLot().child('#gridLotMateriel'),
                storeLot = this.getLotsMaterielStore();

            if (NumLigne != null) {
                this.getInventairesStore().load({
                    scope: this,
                    params: {
                        op: 'ParNumLgn',
                        numero_ligne: NumLigne
                    },
                    callback: function (records, op, success) {
                        if (success) {
                            var recInv = records[0];
                            //si pas actif -> on cache le btn ok
                            if (recInv.get('code_presence') != '0')
                                this.getFenFicheInventaire().down('button[action="ok"]').setDisabled(true);
                            //on prepare les stores des combos avant l'affectation
                            this.getCodesMaterielStore().load({
                                scope: this,
                                params: {
                                    code_materiel: recInv.get('code_materiel')
                                },
                                callback: function (records, op, success) {
                                    if (success) {
                                        frmInventaire.loadRecord(recInv);
                                    }
                                    else
                                        statError("Erreur Lecture (Comptes Généreaux)");
                                }
                            });
                            //Lot
                            if (recInv.get('lot')) {
                                storeLot.load({
                                    scope: this,
                                    params: {
                                        op: 'parNumLgn',
                                        numero_ligne: recInv.get('numero_ligne')
                                    },
                                    callback: function (records, op, success) {
                                        if (success) {
                                            tabLot.tab.show();
                                            records.forEach(function (elt) {
                                                elt.set('total', elt.get('prix_unitaire_lot_materiel') * elt.get('qte_lot_materiel'))
                                            });
                                        }
                                        else
                                            statError("Erreur Lecture (Lot Materiel)");
                                    }
                                });
                            }
                        }
                        else
                            statError("Erreur Lecture (Inventaire)");
                    }
                });
            }
            else {
                Ext.Msg.error("Erreur", "Pas de n° de ligne fournie");
            }
            miseEnFormeChampsSelonProfil('ficheInventaire');
        },
        verifInv: function (callback) {
            var values = this.getFrmFicheInventaire().getValues(false, false, true, true),
                errMsg = "", warnMsg = "";

            var verifNums = function () { //unicité num app & num serie
                var storeInv_temp = Ext.create('GestImmob.store.Inventaires'),
                    nums_appareil = 'null', nums_serie = 'null', nums_lgn;

                nums_lgn = values['numero_ligne'];
                if (values['num_appareil'] != 'ATAPP' && nullSiVide(values['num_appareil']) != null)
                    nums_appareil = values['num_appareil'];
                if (values['num_serie'] != 'ATAPP' && nullSiVide(values['num_serie']) != null) {
                    nums_serie = values['num_serie'];
                }

                storeInv_temp.load({
                    params: {
                        op: 'verif_unic_nums_appareil',
                        nums_appareil: nums_appareil,
                        nums_lgn: nums_lgn
                    },
                    callback: function (records) {
                        if (storeInv_temp.getCount() > 0) {
                            warnMsg = Ext.String.format('{0}&nbsp;&nbsp;* le N°Appareil {1} existe déjà pour l\'appareil "{2}(N°Lgn:{3})"<br />', warnMsg, records[0].get('num_appareil'), records[0].get('design_appareil'), records[0].get('numero_ligne'));
                        }
                        //on verifie les num série
                        storeInv_temp.load({
                            params: {
                                op: 'verif_unic_nums_serie',
                                nums_serie: nums_serie,
                                nums_lgn: nums_lgn
                            },
                            callback: function (records) {
                                if (storeInv_temp.getCount() > 0) {
                                    warnMsg = Ext.String.format('{0}&nbsp;&nbsp;* le N°Série {1} existe déjà pour l\'appareil "{2}(N°Lgn:{3})"<br />', warnMsg, records[0].get('num_serie'), records[0].get('design_appareil'), records[0].get('numero_ligne'));
                                }
                                //compte rendu
                                if (errMsg != "") {
                                    errMsg = "Les erreurs suivantes ont été rencontrées :" + errMsg;
                                    Ext.Msg.error("Erreur", errMsg);
                                }
                                else if (warnMsg != "")
                                    Ext.Msg.confirm("Avertissement",
                                        "Veuillez vérifier les informations suivantes:<br/>" + warnMsg + "Voulez-vous continuer?",
                                        function (btn) {
                                            if (btn == 'yes')callback();
                                        }
                                    );

                                else
                                    callback();
                            }
                        });
                    }
                });
            };

            if (values['design_appareil'] == "")
                errMsg += "<br/> * Désignation Vide";
            if (values['num_appareil'] == "")
                errMsg += "<br/> * N° Appareil Vide";
            if (values['code_materiel'] == "")
                errMsg += "<br/> * Code Matériel Vide";
            if (values['gpe_appareil'].toString() == "")
                errMsg += "<br/> * Groupe App Vide";
            if (values['code_appareil'].toString() == "")
                errMsg += "<br/> * Code App Vide";
            if (values['rang_appareil'].toString() == "")
                errMsg += "<br/> * Rang App Vide";

            verifNums();
        },
        enregInv: function () {
            var storeInv = this.getInventairesStore(),
                storeLot = this.getLotsMaterielStore(),
                FenFicheInv = this.getFenFicheInventaire(),
                FrmFicheInv = this.getFrmFicheInventaire();

            var enregLot = function () {
                    if (storeLot.getUpdatedRecords().length != 0)
                        storeLot.sync({
                            success: function () {
                                FenFicheInv.close();
                            },
                            failure: function () {
                                statError("Erreur d'enregistrement (Lot)");
                            }
                        });
                    else {
                        FenFicheInv.close();
                    }
                };

            this.verifInv(function () {
                FrmFicheInv.updateRecord();
                if (storeInv.getUpdatedRecords().length != 0)
                    storeInv.sync({
                        success: function () {
                            enregLot();
                        },
                        failure: function () {
                            statError("Erreur d'enregistrement (Inventaire)");
                        }
                    });
                else {
                    enregLot();
                }
            });

        }

    },

    null);

