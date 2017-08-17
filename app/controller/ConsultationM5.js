/****************************************
 *
 *
 *
 ****************************************/

Ext.define('GestImmob.controller.ConsultationM5',
    {
        extend: 'Ext.app.Controller',
        views: [
            'inventaire.ConsultationM5'
        ],
        stores: [
            'Lignes93',
            'Inventaires'
        ],
        refs: [
            {
                ref: 'fenAssistant',
                selector: '#idRechercheM5'
            },
            {
                ref: 'btnPrev',
                selector: 'consultationM5 button[action="precedant"]'
            },
            {
                ref: 'frmParNumBord',
                selector: 'consultationM5 rechercheM5 form#frmParNumBord'
            },
            {
                ref: 'frmParNumCmd',
                selector: 'consultationM5 rechercheM5 form#frmParNumCmd'
            },
            {
                ref: 'frmParL93',
                selector: 'consultationM5 rechercheM5 form#frmParL93'
            },
            {
                ref: 'tabFenBordParCmd',
                selector: 'fenBordParCmd grid#grilleBordParCmd'
            }
        ],

        init: function () {

            this.control({
                //****** fenetre principale
                'consultationM5 button[action=precedant]': {
                    click: this.ecranPrecedant
                },
                'consultationM5 button[action=close]': {
                    click: this.fermeFenetre
                },
                //****** Ecran 1 : Recherche M5
                'consultationM5 rechercheM5 form#frmParNumBord button[action=suivant]': {
                    click: this.rechercheM5ParNumBord
                },
                'consultationM5 rechercheM5 form#frmParNumCmd button[action=suivant]': {
                    click: this.rechercheM5ParNumCmd
                },
                'consultationM5 rechercheM5 form#frmParL93 button[action=suivant]': {
                    click: this.rechercheM5ParL93
                },
                //****** Ecran 2 : Resultats
                'consultationM5 #grilleBordereauEntreesNouvelles button[action=imprimer]': {
                    click: this.imprimerM5
                },
                //****** Fen Liste Bord
                'fenBordParCmd button[action=consulter]': {
                    click: this.rechercheM5ParNumCmd2
                }
            });
        },

        /**** Fenetre Assistant ****/
        ecranPrecedant: function (button) {
            var ecrans = this.getFenAssistant().getLayout();

            ecrans.prev();
            if (!ecrans.getPrev()) button.setDisabled(true);
        },
        fermeFenetre: function () {
            this.getFenAssistant().close();
            renderInMain();
        },

        /**** Recherche M5 ****/
        rechercheM5ParNumBord: function () {
            this.rechercheDonnees(this.getFrmParNumBord().getForm().getValues()['num_bord']);
        },
        rechercheM5ParNumCmd: function () {
            var values = this.getFrmParNumCmd().getForm().getValues(),
                waitWin;

            waitWin = Ext.Msg.waitProgress(2);
            this.getLignes93Store().load({
                scope: this,
                params: {
                    op: 'parCmdM5',
                    num_cmd: values['num_cmd']
                },
                callback: function (records, op, success) {
                    if (success) {
                        if (records.length == 0)
                            Ext.Msg.error('Liste Vide', 'Commande non trouvée');
                        else {
                            waitWin.close();
                            if (records.length == 1)  //un seul: on ouvre directement les resultats
                                this.rechercheDonnees(records[0].get('num_bord'));
                            else //on affiche la liste
                                Ext.widget('fenBordParCmd');
                        }
                    }
                    else
                        statError("Erreur Lecture (Etat 93)");
                }
            });
        },
        rechercheM5ParL93: function () {
            var values = this.getFrmParL93().getForm().getValues();

            this.getLignes93Store().load({
                scope: this,
                params: {
                    op: 'V08',
                    mois_comptable: values['mois_comptable'],
                    code_origine: values['code_origine'],
                    groupe: values['groupe'],
                    ecriture: values['ecriture'],
                    code_siege: values['code_siege'],
                    code_compte_analytique: values['code_compte_analytique'],
                    code_budget: values['code_budget']
                },
                callback: function (records, op, success) {
                    if (success) {
                        if (records.length == 0)
                            Ext.Msg.error('Liste Vide', 'Aucune ligne 93 trouvée');
                        else
                            this.rechercheDonnees(records[0].get('num_bord'));
                    }
                    else
                        statError("Erreur Lecture (Etat 93)");
                }
            });
        },
        rechercheDonnees: function (numBord) {
            var storeInv = this.getInventairesStore(),
                ecrans = this.getFenAssistant().getLayout(),
                waitWin;
            waitWin = Ext.Msg.waitProgress(2);
            storeInv.load({
                params: {
                    op: 'parNBord',
                    num_bord: numBord
                },
                scope: this,
                callback: function (records, op, success) {
                    if (success) {
                        if (records.length == 0)
                            Ext.Msg.error('Liste Vide', 'Aucun enregistrement trouvé');
                        else {
                            //num bord
                            Ext.ComponentQuery.query('#infoNumBordereau')[0].getEl().setHTML('N° Bordereau : ' + numBord);
                            ecrans.next();
                            this.getBtnPrev().setDisabled(false);
                        }
                        statClear(true);
                        waitWin.close();
                    }
                    else {
                        statError("Erreur Lecture (Inventaire)");
                    }
                }
            });
        },

        /**** Resultats M5 ****/
        imprimerM5: function () {
            var numBord = this.getInventairesStore().getAt(0).get('num_bord');

            window.open('php/print/imprM5.php?num_bord=' + numBord, '_blank', 'location=no, menubar=no, status=no').document.title = "Impression";
        },

        /**** Fen Liste Bordx ****/
        rechercheM5ParNumCmd2: function (btn) {
            var selectedRec = this.getTabFenBordParCmd().getSelectionModel().getSelection()[0];

            if (typeof selectedRec !== 'undefined') {
                this.rechercheDonnees(selectedRec.get('num_bord'));
            }
            else
                Ext.Msg.error("Pas de sélection", "Veuillez choisir une ligne");
            btn.up('window').close();

        }
    },
    null);