/****************************************
 *
 *
 *
 ****************************************/

/**** ecran 1: RechercheM5 ****/
Ext.define('RechercheM5',
    {
        extend: 'Ext.container.Container',
        alias: 'widget.rechercheM5',
        itemId: 'ecranRechercheM5',
        layout: 'auto',
        border: true,
        autoScroll: true,
        items: [
            {
                xtype: 'titreFenetre',
                html: 'Recheche M5'
            },
            {
                xtype: 'form',
                itemId: 'frmParNumBord',
                border: true,
                title: 'Par N° Bordereau',
                margin: '20 10 0 10',
                layout: {
                    type: 'vbox',
                    align: 'center',
                    padding: 5
                },
                items: [
                    {
                        xtype: 'textfield',
                        name: 'num_bord',
                        fieldLabel: 'N° Bordereau',
                        margin: '5',
                        allowBlank: false,
                        maxLength: 7,
                        minLength: 7,
                        enforceMaxLength: true,
                        regex: /^\d{7}$/,
                        maskRe: /\d/

                    }
                ],
                buttons: [
                    {
                        iconCls: 'icon-next',
                        iconAlign: 'right',
                        text: 'Suivant',
                        action: 'suivant',
                        formBind: true
                    }
                ]
            },
            {
                xtype: 'form',
                itemId: 'frmParNumCmd',
                border: true,
                title: 'Par N° Commande',
                margin: '20 10 0 10',
                layout: {
                    type: 'vbox',
                    align: 'center',
                    padding: 5
                },
                items: [
                    {
                        xtype: 'textfield',
                        name: 'num_cmd',
                        fieldLabel: 'N° Commande',
                        margin: '5',
                        allowBlank: false,
                        maxLength: 6,
                        minLength: 6,
                        enforceMaxLength: true,
                        regex: /^\d{6}$/,
                        maskRe: /\d/

                    }
                ],
                buttons: [
                    {
                        iconCls: 'icon-next',
                        iconAlign: 'right',
                        text: 'Suivant',
                        action: 'suivant',
                        formBind: true
                    }
                ]
            },
            {
                xtype: 'form',
                itemId: 'frmParL93',
                border: true,
                title: 'Par Ligne 93',
                margin: '20 10 0 10',
                defaults: {
                    margin: '5',
                    labelAlign: 'top',
                    xtype: 'textfield',
                    width: 40,
                    allowBlank: false,
                    maxLength: 2,
                    minLength: 2,
                    enforceMaxLength: true,
                    regex: /^\d{2}$/,
                    maskRe: /\d/
                },
                layout: {
                    type: 'table',
                    columns: 5,
                    tableAttrs: {
                        align: 'center',
                        valign: 'middle'
                    },
                    trAttrs: {
                        valign: 'bottom'
                    }
                },
                items: [
                    {
                        name: 'mois_comptable',
                        fieldLabel: 'Mois'

                    },
                    {
                        name: 'code_origine',
                        fieldLabel: 'Origine'
                    },
                    {
                        name: 'groupe',
                        fieldLabel: 'Groupe'
                    },
                    {
                        name: 'ecriture',
                        fieldLabel: 'Ecriture',
                        width: 60,
                        maxLength: 4,
                        minLength: 4,
                        regex: /^\d{4}$/
                    },
                    {
                        name: 'code_siege',
                        fieldLabel: 'Siège'
                    },
                    {
                        colspan: 3,
                        name: 'code_compte_analytique',
                        fieldLabel: 'C.Analytique',
                        width: 90,
                        maxLength: 5,
                        minLength: 5,
                        regex: /^\d{5}$/
                    },
                    {
                        colspan: 2,
                        name: 'code_budget',
                        fieldLabel: 'C.Budget',
                        width: 90,
                        maxLength: 6,
                        minLength: 6,
                        regex: /^\d{6}$/
                    }
                ],
                buttons: [
                    {
                        iconCls: 'icon-next',
                        iconAlign: 'right',
                        text: 'Suivant',
                        action: 'suivant',
                        formBind: true
                    }
                ]
            }
        ]
    },
    null);

/**** ecran 2: M5 ****/
Ext.define('ConsultM5',
    {
        extend: 'Ext.container.Container',
        alias: 'widget.consultM5',
        itemId: 'ecranConsultM5',
        layout: {
            type: 'vbox',
            align: 'stretch',
            padding: 5
        },
        border: false,
        items: [
            {
                xtype: 'titreFenetre',
                html: 'Bordereau Entrées Nouvelles (M5)'
            },
            {
                xtype: 'titreFenetre',
                itemId: 'infoNumBordereau',
                html: 'N° Bordereau :'
            },
            {
                xtype: 'grid',
                itemId: 'grilleBordereauEntreesNouvelles',
                stateful: true,
                border: false,
                margin: '20 0 0 10',
                flex: 1,
                store: 'Inventaires',
                features: [
                    {
                        id: 'summBordereauEntreesNouvelles',
                        ftype: 'summary',
                        dock: 'bottom'
                    },
                    {
                        id: 'groupBordereauEntreesNouvelles',
                        ftype: 'grouping',
                        showSummaryRow: true
                    }
                ],
                columns: [
                    {xtype: 'rownumberer', width: 30},
                    {
                        text: 'N°Ligne',
                        dataIndex: 'numero_ligne',
                        xtype: 'numbercolumn',
                        format: '0',
                        sortable: false,
                        width: 60
                    },
                    {
                        text: 'Compte General',
                        dataIndex: 'code_compte_general',
                        xtype: 'numbercolumn',
                        format: '0',
                        sortable: false,
                        width: 60
                    },
                    {
                        text: 'Code Matériel',
                        dataIndex: 'code_materiel',
                        xtype: 'numbercolumn',
                        format: '0',
                        sortable: false,
                        width: 60
                    },
                    {
                        text: 'Grp App',
                        dataIndex: 'gpe_appareil',
                        xtype: 'numbercolumn',
                        format: '0',
                        sortable: false,
                        width: 40
                    },
                    {
                        text: 'App',
                        dataIndex: 'code_appareil',
                        xtype: 'numbercolumn',
                        format: '0',
                        sortable: false,
                        width: 40
                    },
                    {
                        text: 'Rang',
                        dataIndex: 'rang_appareil',
                        xtype: 'numbercolumn',
                        format: '0',
                        sortable: false,
                        width: 42
                    },
                    {text: 'Désignation', dataIndex: 'design_appareil', sortable: false, flex: 1, minWidth: 150},
                    {text: 'Description', dataIndex: 'compl_design_appareil', sortable: false, flex: 1, minWidth: 150},
                    {
                        text: 'Date Mise Serv',
                        dataIndex: 'date_mise_serv',
                        xtype: 'datecolumn',
                        format: 'm-Y',
                        submitFormat: 'Y-m-01',
                        sortable: false,
                        width: 75
                    },
                    {
                        text: 'Année Acqui',
                        dataIndex: 'annee_acqui',
                        xtype: 'numbercolumn',
                        format: '0',
                        sortable: false,
                        width: 55
                    },
                    {text: 'Siège', dataIndex: 'code_siege', sortable: false, width: 50},
                    {text: 'Compte Analytique', dataIndex: 'code_compte_analytique', sortable: false, width: 90},
                    {text: 'N° Appareil', dataIndex: 'num_appareil', sortable: false, width: 60},
                    {text: 'N° Série', dataIndex: 'num_serie', sortable: false, width: 60},
                    {
                        text: 'Valeur',
                        dataIndex: 'val_acqui',
                        xtype: 'numbercolumn',
                        format: '0,000',
                        sortable: false,
                        width: 90,
                        summaryType: 'sum'
                    },
                    {
                        text: 'lot',
                        dataIndex: 'lot',
                        xtype: 'checkcolumn',
                        sortable: false,
                        resizable: false,
                        width: 30,
                        processEvent: function () {
                            return false;
                        }
                    }
                ],
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        items: [
                            '->',
                            {
                                iconCls: 'print-icon-16',
                                text: 'Imprimer',
                                action: 'imprimer'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    null);

Ext.define('FenBordParCmd',
    {
        extend: 'Ext.window.Window',
        alias: 'widget.fenBordParCmd',

        itemId: 'idFenBordParCmd',
        title: 'Liste des Bordereaux',
        iconCls: 'icon-list',
        layout: {
            type: 'vbox',
            align: 'stretch',
            padding: 5
        },
        autoShow: true,
        modal: true,
        resizable: true,
        width: 400,
        height: 400,
        bodyStyle: 'background:#FFFFFF;',
        items: [
            {
                xtype: 'container',
                html: 'Liste des Bordereaux',
                cls: 'titre-fenetre'
            },
            {
                xtype: 'grid',
                itemId: 'grilleBordParCmd',
                stateful: true,
                border: true,
                margin: '20 0 0 0',
                flex: 1,
                features: [
                    {
                        id: 'summBordParCmd',
                        ftype: 'summary',
                        dock: 'bottom'
                    }
                ],
                selType: 'checkboxmodel',
                selModel: {
                    mode: 'SINGLE',
                    allowDeselect: true,
                    showHeaderCheckbox: false
                },
                store: 'Lignes93',
                columns: [
                    {
                        text: 'N°Bordereau',
                        dataIndex: 'num_bord',
                        flex: 1
                    },
                    {
                        text: 'total',
                        dataIndex: 'total_93',
                        xtype: 'numbercolumn',
                        format: '0,000',
                        sortable: false,
                        flex: 1,
                        summaryType: 'sum'
                    }
                ],
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        items: [
                            '->',
                            {
                                iconCls: 'icon-accept',
                                text: 'Consuler',
                                action: 'consulter'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    null);

/**** fenetre assistant ****/
Ext.define('GestImmob.view.inventaire.ConsultationM5',
    {
        extend: 'Ext.panel.Panel',
        alias: 'widget.consultationM5',
        itemId: 'idRechercheM5',
        title: 'Consultation M5',
        iconCls: 'icon-export',
        layout: 'card',
        deferredRender: true,
        defaults: {border: false},
        items: [
            {xtype: 'rechercheM5'},
            {xtype: 'consultM5'}
        ],
        buttons: [
            {
                iconCls: 'icon-prev',
                text: 'Précédant',
                action: 'precedant',
                disabled: true
            },
            {
                iconCls: 'icon-cancel',
                text: 'Annuler',
                action: 'close'
            }
        ]
    },
    null);