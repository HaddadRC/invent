/****************************************
 *
 *
 *
 ****************************************/

/**** ecran 1: Champs de recherche ****/
Ext.define('RechercheInventaireChamps',
    {
        extend: 'Ext.container.Container',
        alias: 'widget.rechercheInventaireChamps',
        itemId: 'ecranRechercheInventaireChamps',
        layout: {
            type: 'vbox',
            align: 'center',
            padding: 5
        },
        border: false,
        autoScroll: true,
        items: [
            {
                xtype: 'titreFenetre',
                html: 'Recherche Inventaire'
            },
            {
                xtype: 'form',
                margin: '20',
                layout: {
                    type: 'table',
                    columns: 4,
                    tdAttrs: {
                        //style:{}
                        valign: 'top'
                    }
                },
                border: false,
                defaults: {
                    xtype: 'textfield',
                    margin: '5',
                    listeners: {
                        render: function (cmp) {
                            if (typeof cmp.tip !== 'undefined')
                                Ext.create('Ext.tip.ToolTip',
                                    {
                                        target: cmp.getEl(),
                                        html: cmp.tip
                                    }
                                );
                        }
                    }
                },
                items: [
                    {
                        xtype: 'numberfield',
                        name: 'numero_ligne',
                        fieldLabel: 'N° Ligne',
                        allowDecimals: false,
                        minValue: 0,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        size: 15,
                        colspan: 4,
                        tip: 'Recherche Exacte'
                    },
                    {
                        xtype: 'combobox',
                        name: 'code_siege',
                        fieldLabel: 'Siège',
                        width: 200,
                        maxLength: 2,
                        enforceMaxLength: true,
                        maskRe: /\d/,
                        invalidText: 'Le siège doit contenir 2 chiffres',
                        store: 'SectionsAnalytiques',
                        valueField: 'code_siege',
                        minChars: 0,
                        queryMode: 'remote',
                        displayField: 'code_siege',
                        queryParam: 'combo_siege_affect',
                        triggerAction: 'all',
                        matchFieldWidth: false,
                        typeAhead: true,
                        //affichage des elements de la liste
                        tpl: Ext.create('Ext.XTemplate',
                            '<tpl for=".">',
                            '<div class="x-boundlist-item"><span style="font-weight: bold">{code_siege}:</span> {libelle_siege}</div>',
                            '</tpl>'
                        ),
                        size: 3,
                        tip: 'Recherche Exacte'
                    },
                    {
                        xtype: 'combobox',
                        name: 'code_compte_analytique',
                        fieldLabel: 'Compte Analytique',
                        labelWidth: 120,
                        maskRe: /\d/,
                        regex: /^\d{5}$/,
                        regexText: 'Le Section Analytique doit contenir 5 chiffres',
                        store: 'SectionsAnalytiques',
                        valueField: 'code_compte_analytique',
                        minChars: 1,
                        queryMode: 'remote',
                        displayField: 'code_compte_analytique',
                        queryParam: 'combo_compte_affect',
                        triggerAction: 'all',
                        matchFieldWidth: false,
                        typeAhead: true,
                        //affichage des elements de la liste
                        tpl: Ext.create('Ext.XTemplate',
                            '<tpl for=".">',
                            '<div class="x-boundlist-item"><span style="font-weight: bold">{code_compte_analytique}:</span> {libelle_compte_analytique}</div>',
                            '</tpl>'
                        ),
                        size: 5,
                        colspan: 3,
                        tip: 'Recherche Exacte'
                    },
                    {
                        xtype: 'combobox',
                        name: 'code_compte_general',
                        fieldLabel: 'Compte General',
                        maskRe: /\d/,
                        regex: /^22\d{3}$/,
                        regexText: 'Le compte général doit contenir 5 chiffres et commencer par 22',
                        maxLength: 5,
                        enforceMaxLength: true,
                        store: 'ComptesGeneraux',
                        valueField: 'code_compte_general',
                        minChars: 1,
                        queryMode: 'remote',
                        displayField: 'code_compte_general',
                        queryParam: 'code_compte_general',
                        triggerAction: 'query',
                        matchFieldWidth: false,
                        typeAhead: true,
                        //affichage des elements de la liste
                        tpl: Ext.create('Ext.XTemplate',
                            '<tpl for=".">',
                            '<div class="x-boundlist-item"><span style="font-weight: bold">{code_compte_general}:</span> {design_compte_general}</div>',
                            '</tpl>'
                        ),
                        tip: 'Recherche Exacte'
                    },
                    {
                        xtype: 'combobox',
                        name: 'code_materiel',
                        fieldLabel: 'Code Matériel',
                        labelWidth: 120,
                        maskRe: /\d/,
                        maxLength: 5,
                        enforceMaxLength: true,
                        store: 'CodesMateriel',
                        valueField: 'code_materiel',
                        minChars: 1,
                        queryMode: 'remote',
                        displayField: 'code_materiel',
                        queryParam: 'code_materiel',
                        triggerAction: 'query',
                        matchFieldWidth: false,
                        typeAhead: false,
                        //affichage des elements de la liste
                        tpl: Ext.create('Ext.XTemplate',
                            '<tpl for=".">',
                            '<div class="x-boundlist-item"><span style="font-weight: bold">{code_materiel}:</span> {libelle_code_materiel}</div>',
                            '</tpl>'
                        ),
                        colspan: 3,
                        tip: 'Recherche Partielle'
                    },
                    {
                        xtype: 'numberfield',
                        name: 'gpe_appareil',
                        fieldLabel: 'Grp App',
                        labelWidth: 50,
                        allowDecimals: false,
                        maxLength: 2,
                        enforceMaxLength: true,
                        minValue: 0,
                        width: 100,
                        tip: 'Recherche Exacte'
                    },
                    {
                        xtype: 'numberfield',
                        name: 'code_appareil',
                        fieldLabel: 'App',
                        labelWidth: 30,
                        allowDecimals: false,
                        maxLength: 2,
                        enforceMaxLength: true,
                        minValue: 0,
                        width: 80,
                        tip: 'Recherche Exacte'
                    },
                    {
                        xtype: 'numberfield',
                        name: 'rang_appareil',
                        fieldLabel: 'Rang',
                        labelWidth: 30,
                        allowDecimals: false,
                        maxLength: 1,
                        enforceMaxLength: true,
                        minValue: 0,
                        width: 80,
                        colspan: 2,
                        tip: 'Recherche Exacte'
                    },
                    {
                        xtype: 'textfield',
                        name: 'design_appareil',
                        fieldLabel: 'Désignation',
                        maxLength: 60,
                        enforceMaxLength: true,
                        width: 535,
                        colspan: 4,
                        tip: 'Recherche Partielle'
                    },
                    {
                        xtype: 'textfield',
                        name: 'num_appareil',
                        fieldLabel: 'N°Appareil',
                        size: 11,
                        tip: 'Recherche Exacte',
                        listeners: {change: champEnUpper}
                    },
                    {
                        xtype: 'textfield',
                        name: 'num_serie',
                        fieldLabel: 'N°Série',
                        size: 11,
                        colspan: 3,
                        tip: 'Recherche Partielle'
                    },
                    {
                        name: 'date_mise_serv',
                        fieldLabel: 'Date Mise Serv',
                        xtype: 'datefield',
                        format: 'm-Y',
                        altFormats: 'm/Y|mY',
                        submitFormat: 'Y-m-01',
                        hideTrigger: true
                    },
                    {
                        xtype: 'combobox',
                        name: 'DMESop',
                        forceSelection: true,
                        editable: false,
                        queryMode: 'local',
                        store: new Ext.data.ArrayStore({
                            fields: ['op', 'val'],
                            data: [
                                ['<', '<'],
                                ['≤', '<='],
                                ['=', '='],
                                ['≥', '>='],
                                ['>', '>']
                            ]
                        }),
                        valueField: 'val',
                        displayField: 'op',
                        triggerAction: 'all',
                        value: '=',
                        width: 40
                    },
                    {
                        name: 'annee_acqui',
                        fieldLabel: 'Année Acqui',
                        xtype: 'numberfield',
                        format: '0',
                        allowDecimals: false,
                        minValue: 1900,
                        maxValue: 2999,
                        maxLength: 4,
                        enforceMaxLength: true
                    },
                    {
                        xtype: 'combobox',
                        name: 'AAop',
                        forceSelection: true,
                        editable: false,
                        queryMode: 'local',
                        store: new Ext.data.ArrayStore({
                            fields: ['op', 'val'],
                            data: [
                                ['<', '<'],
                                ['≤', '<='],
                                ['=', '='],
                                ['≥', '>='],
                                ['>', '>']
                            ]
                        }),
                        valueField: 'val',
                        displayField: 'op',
                        triggerAction: 'all',
                        value: '=',
                        width: 40
                    },
                    {
                        name: 'date_mvt',
                        fieldLabel: 'Date Mvt',
                        xtype: 'datefield',
                        format: 'm-Y',
                        altFormats: 'm/Y|mY',
                        submitFormat: 'Y-m-01',
                        hideTrigger: true
                    },
                    {
                        xtype: 'combobox',
                        name: 'DMVTop',
                        forceSelection: true,
                        editable: false,
                        queryMode: 'local',
                        store: new Ext.data.ArrayStore({
                            fields: ['op', 'val'],
                            data: [
                                ['<', '<'],
                                ['≤', '<='],
                                ['=', '='],
                                ['≥', '>='],
                                ['>', '>']
                            ]
                        }),
                        valueField: 'val',
                        displayField: 'op',
                        triggerAction: 'all',
                        value: '=',
                        width: 40,
                        colspan: 3
                    },
                    {
                        xtype: 'checkboxgroup',
                        fieldLabel: 'Code Présence',
                        columns: 1,
                        vertical: true,
                        items: [
                            {boxLabel: 'Actif', name: 'code_presence', inputValue: '0', checked: true},
                            {boxLabel: 'Reformé', name: 'code_presence', inputValue: '1'},
                            {boxLabel: 'Vendu', name: 'code_presence', inputValue: '2'},
                            {boxLabel: 'Perdu', name: 'code_presence', inputValue: '3'},
                            {boxLabel: 'Entrée Nouvelle', name: 'code_presence', inputValue: '5'}
                        ],
                        listeners: {
                            change: function (e, newValue) { //si aucune case n'est cochée -> on coche la première
                                if (typeof newValue['code_presence'] === 'undefined')
                                    e.setValue({code_presence: '0'});
                            }
                        }
                    },
                    {
                        xtype: 'checkboxgroup',
                        fieldLabel: 'Ammortissement',
                        columns: 1,
                        vertical: true,
                        items: [
                            {
                                boxLabel: 'Non Totalement Ammorti',
                                name: 'ammortissement',
                                inputValue: '0',
                                checked: true
                            },
                            {boxLabel: 'Totalement Ammorti', name: 'ammortissement', inputValue: '1', checked: true}
                        ],
                        listeners: {
                            change: function (e, newValue) { //si aucune case n'est cochée -> on coche la première
                                if (typeof newValue['ammortissement'] === 'undefined')
                                    e.setValue({ammortissement: '0'});
                            }
                        }
                    },
                    {
                        xtype: 'checkboxgroup',
                        fieldLabel: 'Existence',
                        columns: 1,
                        vertical: true,
                        items: [
                            {
                                boxLabel: 'Non',
                                name: 'existant',
                                inputValue: '0',
                                checked: true
                            },
                            {
                                boxLabel: 'Oui',
                                name: 'existant',
                                inputValue: '1',
                                checked: true
                            }
                        ],
                        listeners: {
                            change: function (e, newValue) { //si aucune case n'est cochée -> on coche la première
                                if (typeof newValue['existant'] === 'undefined')
                                    e.setValue({existant: '0'});
                            }
                        },
                        colspan: 2
                    },
                    {
                        xtype: 'textfield',
                        name: 'num_cmd',
                        fieldLabel: 'N° Commande',
                        maxLength: 6,
                        enforceMaxLength: true,
                        size: 7,
                        tip: 'Recherche Exacte'
                    },
                    {
                        xtype: 'textfield',
                        name: 'num_bord',
                        fieldLabel: 'N° Bodereau',
                        maxLength: 7,
                        enforceMaxLength: true,
                        size: 8,
                        tip: 'Recherche Partielle'
                    },
                    {
                        xtype: 'checkboxgroup',
                        fieldLabel: 'Code Entrée',
                        columns: 1,
                        vertical: true,
                        items: [
                            {boxLabel: '08', name: 'code_entree', inputValue: '08', checked: true},
                            {boxLabel: '09', name: 'code_entree', inputValue: '09', checked: true}
                        ],
                        listeners: {
                            change: function (e, newValue) { //si aucune case n'est cochée -> on coche la première
                                if (typeof newValue['code_entree'] === 'undefined')
                                    e.setValue({code_entree: '08'});
                            }
                        },
                        colspan: 2
                    }
                ]
            }
        ]
    },
    null);

/**** ecran 2: Résultat Rechereche ****/
Ext.define('RechercheInventaireResultat',
    {
        extend: 'Ext.container.Container',
        alias: 'widget.rechercheInventaireResultat',
        itemId: 'ecranSelectionProjet9323',
        layout: {
            type: 'vbox',
            align: 'stretch',
            padding: 5
        },
        border: false,
        autoScroll: true,
        items: [
            {
                xtype: 'titreFenetre',
                html: 'Recherche Inventaire'
            },
            {
                xtype: 'grid',
                itemId: 'grilleRechercheInventaireResultat',
                stateful: true,
                border: false,
                flex: 1,
                minHeight: 90,
                margin: '20 0 0 10',
                features: [
                    {
                        ftype: 'summary',
                        dock: 'bottom'
                    }
                ],
                plugins: [
                    {
                        ptype: 'bufferedrenderer',
                        trailingBufferZone: 20,
                        leadingBufferZone: 50
                    }
                ],
                selType: 'checkboxmodel',
                selModel: {
                    mode: 'MULTI',
                    //checkOnly: true,
                    injectCheckbox: 1,
                    header: false
                },
                store: null,
                columns: [
                    {xtype: 'rownumberer', resizable: true},
                    {
                        text: 'N°Ligne',
                        dataIndex: 'numero_ligne',
                        xtype: 'numbercolumn',
                        format: '0',
                        width: 60,
                        summaryType: 'count'
                    },
                    {
                        text: 'Siège', dataIndex: 'code_siege', width: 50,
                        hideable: true
                    },
                    {
                        text: 'Compte Analytique', dataIndex: 'code_compte_analytique', width: 90,
                        hideable: true
                    },
                    {
                        text: 'Compte General',
                        dataIndex: 'code_compte_general',
                        xtype: 'numbercolumn',
                        format: '0',
                        width: 60,
                        hideable: true
                    },
                    {
                        text: 'Code Matériel',
                        dataIndex: 'code_materiel',
                        xtype: 'numbercolumn',
                        format: '0',
                        width: 60,
                        hideable: true
                    },
                    //{
                    //    text: 'Grp App',
                    //    dataIndex: 'gpe_appareil',
                    //    xtype: 'numbercolumn',
                    //    format: '0',
                    //    width: 40
                    //},
                    //{
                    //    text: 'App',
                    //    dataIndex: 'code_appareil',
                    //    xtype: 'numbercolumn',
                    //    format: '0',
                    //    width: 40
                    //},
                    //{
                    //    text: 'Rang',
                    //    dataIndex: 'rang_appareil',
                    //    xtype: 'numbercolumn',
                    //    format: '0',
                    //    width: 42
                    //},
                    {
                        text: 'Désignation', dataIndex: 'design_appareil', flex: 1, minWidth: 150,
                        editor: {
                            xtype: 'textfield',
                            allowBlank: false,
                            maxLength: 60,
                            enforceMaxLength: true
                        },
                        hideable: true
                    },
                    {
                        text: 'Description',
                        dataIndex: 'compl_design_appareil',
                        sortable: false,
                        flex: 1,
                        minWidth: 150,
                        hideable: true
                    },
                    {
                        text: 'Date Mise Serv',
                        dataIndex: 'date_mise_serv',
                        xtype: 'datecolumn',
                        format: 'm-Y',
                        submitFormat: 'Y-m-01',
                        width: 75,
                        hideable: true
                    },
                    {
                        text: 'Année Acqui',
                        dataIndex: 'annee_acqui',
                        xtype: 'numbercolumn',
                        format: '0',
                        hideable: true
                    },
                    {
                        text: 'Date MVt',
                        dataIndex: 'date_mvt',
                        xtype: 'datecolumn',
                        format: 'm-Y',
                        submitFormat: 'Y-m-01',
                        width: 75,
                        hideable: true
                    },
                    {
                        text: 'C.Présence',
                        dataIndex: 'code_presence',
                        renderer: function (value) {
                            switch (value) {
                                case 0:
                                    return ('Actif');
                                case 1:
                                    return ('Reformé');
                                case 2:
                                    return ('Vendu');
                                case 3:
                                    return ('Perdu');
                                case 5:
                                    return ('Entrée');
                                default :
                                    return ('INCONNU')
                            }
                        },
                        hideable: true
                    },
                    {
                        text: 'N° Appareil', dataIndex: 'num_appareil', width: 60, hideable: true
                    },
                    {
                        text: 'N° Série', dataIndex: 'num_serie', width: 60, hideable: true
                    },
                    {
                        text: 'Valeur Acq.',
                        dataIndex: 'val_acqui',
                        xtype: 'numbercolumn',
                        format: '0,000',
                        width: 90,
                        summaryType: 'sum',
                        hideable: true
                    },
                    {
                        text: 'Cumul Amm.',
                        dataIndex: 'cumul_ammor',
                        xtype: 'numbercolumn',
                        format: '0,000',
                        width: 90,
                        summaryType: 'sum',
                        hideable: true
                    },
                    //{
                    //    text: 'lot', dataIndex: 'lot', xtype: 'checkcolumn', resizable: false, width: 30,
                    //    listeners: {
                    //        beforecheckchange: function () {
                    //            return false;
                    //        }
                    //    }
                    //},
                    {
                        text: 'N° Commande', dataIndex: 'num_cmd', width: 75, hideable: true
                    },
                    {
                        text: 'Existant',
                        dataIndex: 'existant',
                        width: 60,
                        renderer: function (value) {
                            return value ? 'Oui' : 'Non';
                        },
                        hideable: true
                    }
                ],
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        height: 25,
                        items: [
                            {
                                iconCls: 'icon-edit',
                                text: 'Consulter',
                                action: 'modif'
                            },
                            '->',
                            {
                                text: 'TXT',
                                iconCls: 'print-icon-16',
                                action: 'txt'
                            },
                            {
                                text: 'Imprimer',
                                iconCls: 'print-icon-16',
                                action: 'print'/*,
                             handler: function () {
                             //exportToCsv(this.up('grid'));
                             }*/
                            },
                            {
                                text: 'Export',
                                iconCls: 'icon-excel',
                                action: 'export'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    null);

/**** panneau fenetre principale ****/
Ext.define('RechercheInventairePanel',
    {
        extend: 'Ext.panel.Panel',
        alias: 'widget.rechercheInventairePanel',
        itemId: 'idRechercheInventaire',
        title: 'Recherche Inventaire',
        iconCls: 'icon-search',
        config: {
            src: null
        },
        layout: 'card',
        flex: 1,
        deferredRender: true,
        defaults: {border: false},
        items: [
            {xtype: 'rechercheInventaireChamps'},
            {xtype: 'rechercheInventaireResultat'}
        ],
        buttons: [
            {
                iconCls: 'icon-prev',
                text: 'Précédant',
                action: 'precedant',
                disabled: true
            },
            {
                iconCls: 'icon-next',
                iconAlign: 'right',
                text: 'Suivant',
                action: 'suivant'
            },
            {
                iconCls: 'icon-accept', //à implémenter ds chaque controlleur selon besoin
                text: 'Ok',
                action: 'ok',
                hidden: true
            },
            {
                iconCls: 'icon-cancel',
                text: 'Annuler',
                action: 'close',
                onClick: function () {
                    if (typeof this.up('window') !== 'undefined') this.up('window').close();
                    else {
                        this.up('panel').close();
                        renderInMain();
                    }
                }
            }
        ]
    },
    null);

/**** fenetre principale ****/
Ext.define('GestImmob.view.inventaire.RechercheInventaire',
    {
        extend: 'Ext.window.Window',
        alias: 'widget.rechercheInventaireWin',
        title: 'Recherche Inventaire',
        iconCls: 'icon-search',
        autoShow: true,
        modal: true,
        resizable: true,
        maximizable: true,
        maximized: true,
        height: 600,
        width: 900,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        help: 'RechercheInventaire',
        config: {
            src: ''
        },
        items: [
            {xtype: 'rechercheInventairePanel'}
        ],
        listeners: {
            beforerender: function (cmp) {
                var panneauRechercheInventaire = cmp.down('#idRechercheInventaire');

                //en mode fen on cache le titre et la bordure
                panneauRechercheInventaire.header = false;
                panneauRechercheInventaire.border = false;
            }
        }

    },
    null);

