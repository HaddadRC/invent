/****************************************
 *
 *
 *
 ****************************************/

Ext.define('GestImmob.view.inventaire.ficheInventaire',
    {
        extend: 'Ext.window.Window',
        alias: 'widget.ficheInventaire',

        itemId: 'fenFicheInventaire',
        title: 'Fiche Inventaire',
        iconCls: 'icon-edit',
        layout: {
            type: 'vbox',
            align: 'stretch',
            padding: 5
        },
        autoShow: true,
        modal: true,
        resizable: true,
        maximizable: true,
        height: 600,
        width: 900,
        bodyStyle: 'background:#FFFFFF;',
        config: {
            numeroLigne: null
        },
        items: [
            {
                xtype: 'container',
                html: 'Fiche Inventaire',
                cls: 'titre-fenetre'
            },
            {
                xtype: 'form',
                border: false,
                layout: {
                    type: 'vbox',
                    align: 'stretch',
                    padding: 5
                },
                flex: 1,
                items: [
                    {
                        xtype: 'container',
                        border: 1,
                        style: {borderColor: '#99BCE8', borderStyle: 'solid', borderWidth: '1px'},
                        margin: '10 5 5 5',
                        layout: {
                            type: 'vbox',
                            align: 'left',
                            padding: 5
                        },
                        items: [
                            {
                                name: 'numero_ligne',
                                xtype: 'textfield',
                                fieldLabel: 'N° Ligne',
                                submitValue: false,
                                readOnly: true,
                                fieldStyle: 'background-color: #ddd; background-image: none;'
                            },
                            {
                                name: 'design_appareil',
                                xtype: 'textfield',
                                fieldLabel: 'Désignation',
                                width: '80%',
                                allowBlank: false
                            }
                        ]
                    },
                    {
                        xtype: 'tabpanel',
                        flex: 1,
                        defaults: {
                            padding: 10,
                            layout: {
                                type: 'table',
                                columns: 3
                            }
                        },
                        items: [
                            {
                                title: 'Affectation',
                                xtype: 'container',
                                layout: {
                                    type: 'table',
                                    columns: 2
                                },
                                defaults: {
                                    padding: 10,
                                    labelWidth: 70,
                                    size: 5
                                },
                                items: [
                                    {
                                        name: 'code_siege',
                                        xtype: 'textfield',
                                        fieldLabel: 'Siège',
                                        submitValue: false,
                                        readOnly: true,
                                        fieldStyle: 'background-color: #ddd; background-image: none;',
                                        size: 2
                                    },
                                    {
                                        name: 'code_compte_analytique',
                                        xtype: 'textfield',
                                        fieldLabel: 'Section',
                                        submitValue: false,
                                        readOnly: true,
                                        fieldStyle: 'background-color: #ddd; background-image: none;',
                                        size: 5
                                    },
                                    {
                                        name: 'num_appareil',
                                        xtype: 'textfield',
                                        fieldLabel: 'N°Appareil',
                                        size: 11,
                                        listeners: {change: champEnUpper},
                                        allowBlank: false
                                    },
                                    {
                                        name: 'num_serie',
                                        xtype: 'textfield',
                                        fieldLabel: 'N°Série',
                                        size: 11
                                    },
                                    {
                                        name: 'desc_lieu_affectation',
                                        xtype: 'textareafield',
                                        fieldLabel: 'Description Affectation',
                                        width: 500,
                                        colspan: 2
                                    },
                                    /*{
                                     name: 'existant',
                                     xtype: 'textfield',
                                     fieldLabel: 'Existant',
                                     submitValue: false,
                                     readOnly: true,
                                     fieldStyle: 'background-color: #ddd; background-image: none;',
                                     size: 5
                                     },*/
                                    {
                                        name: 'existant',
                                        xtype: 'combobox',
                                        fieldLabel: 'Existant',
                                        submitValue: false,
                                        store: Ext.create('Ext.data.Store', {
                                            fields: ['aff', 'val'],
                                            data: [
                                                {aff: "Non", val: false},
                                                {aff: "Oui", val: true}
                                            ]
                                        }),
                                        valueField: 'val',
                                        displayField: 'aff',
                                        triggerAction: 'all',
                                        queryMode: 'local',
                                        forceSelection: true,
                                        editable: false,
                                        readOnly: true,
                                        fieldStyle: 'background-color: #ddd; background-image: none;',
                                        hideTrigger: true,
                                        size: 5
                                    }
                                ]
                            },
                            {
                                title: 'Informations Techniques',
                                xtype: 'container',
                                defaults: {
                                    padding: 10,
                                    labelWidth: 95,
                                    size: 5
                                },
                                items: [
                                    {
                                        name: 'code_compte_general',
                                        xtype: 'textfield',
                                        fieldLabel: 'Compte Général',
                                        submitValue: false,
                                        readOnly: true,
                                        fieldStyle: 'background-color: #ddd; background-image: none;'
                                    },
                                    {
                                        xtype: 'combobox',
                                        name: 'code_materiel',
                                        fieldLabel: 'Code Matériel',
                                        maskRe: /\d/,
                                        regex: /^\d{5}$/,
                                        regexText: 'Le code matériel doit contenir 5 chiffres',
                                        allowBlank: false,
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
                                        forceSelection: true,
                                        typeAhead: true,
                                        //affichage des elements de la liste
                                        tpl: Ext.create('Ext.XTemplate',
                                            '<tpl for=".">',
                                            '<div class="x-boundlist-item"><span style="font-weight: bold">{code_materiel}:</span> {libelle_code_materiel}</div>',
                                            '</tpl>'
                                        ),
                                        size: 8,
                                        prf: ['tech', 'techcompta', 'admtech'],
                                        colspan: 2
                                    },
                                    {
                                        name: 'gpe_appareil',
                                        xtype: 'numberfield',
                                        fieldLabel: 'Groupe Appareil',
                                        allowDecimals: false,
                                        allowBlank: false,
                                        maxLength: 2,
                                        enforceMaxLength: true,
                                        minValue: 0,
                                        size: 3
                                    },
                                    {
                                        name: 'code_appareil',
                                        xtype: 'numberfield',
                                        fieldLabel: 'Code Appareil',
                                        allowDecimals: false,
                                        allowBlank: false,
                                        maxLength: 2,
                                        enforceMaxLength: true,
                                        minValue: 0,
                                        size: 3
                                    },
                                    {
                                        name: 'rang_appareil',
                                        xtype: 'numberfield',
                                        fieldLabel: 'Rang Appareil',
                                        allowDecimals: false,
                                        allowBlank: false,
                                        maxLength: 2,
                                        enforceMaxLength: true,
                                        minValue: 0,
                                        readOnly: true,
                                        size: 3
                                    },
                                    {
                                        name: 'compl_design_appareil',
                                        xtype: 'textareafield',
                                        fieldLabel: 'Complément Désignation',
                                        width: 500,
                                        colspan: 2
                                    }
                                ]
                            },
                            {
                                title: 'Acquisition & Etat',
                                xtype: 'container',
                                defaults: {
                                    padding: 10,
                                    labelWidth: 90,
                                    size: 5
                                },
                                items: [
                                    {
                                        xtype: 'numberfield',
                                        name: 'val_acqui',
                                        fieldLabel: 'Valeur Acqui.',
                                        size: 12,
                                        submitValue: false,
                                        readOnly: true,
                                        fieldStyle: 'background-color: #ddd; background-image: none;'
                                    },
                                    {
                                        xtype: 'numberfield',
                                        name: 'cumul_ammor',
                                        fieldLabel: 'Cumul Ammor.',
                                        size: 12,
                                        submitValue: false,
                                        readOnly: true,
                                        fieldStyle: 'background-color: #ddd; background-image: none;',
                                        colspan: 2
                                    },
                                    {
                                        name: 'annee_acqui',
                                        fieldLabel: 'Année Acqui',
                                        xtype: 'numberfield',
                                        submitValue: false,
                                        readOnly: true,
                                        fieldStyle: 'background-color: #ddd; background-image: none;'
                                    },
                                    {
                                        name: 'date_mise_serv',
                                        fieldLabel: 'Date Mise Serv',
                                        xtype: 'datefield',
                                        format: 'm-Y',
                                        size: 12,
                                        submitValue: false,
                                        readOnly: true,
                                        fieldStyle: 'background-color: #ddd; background-image: none;'
                                    },
                                    {
                                        name: 'num_cmd',
                                        fieldLabel: 'N° Commande',
                                        xtype: 'textfield',
                                        submitValue: false,
                                        //readOnly: true,
                                        //fieldStyle: 'background-color: #ddd; background-image: none;',
                                        size: 7
                                    },
                                    {
                                        name: 'num_bord',
                                        fieldLabel: 'N° Bordereau',
                                        xtype: 'numberfield',
                                        submitValue: false,
                                        readOnly: true,
                                        fieldStyle: 'background-color: #ddd; background-image: none;',
                                        size: 7
                                    },
                                    {
                                        name: 'poste',
                                        fieldLabel: 'N° Poste',
                                        xtype: 'numberfield',
                                        submitValue: false,
                                        readOnly: true,
                                        fieldStyle: 'background-color: #ddd; background-image: none;'
                                    },
                                    {
                                        name: 'code_entree',
                                        fieldLabel: 'Code Entrée',
                                        xtype: 'textfield',
                                        submitValue: false,
                                        readOnly: true,
                                        fieldStyle: 'background-color: #ddd; background-image: none;'
                                    },
                                    {
                                        name: 'creer_le',
                                        fieldLabel: 'Créer le',
                                        xtype: 'datefield',
                                        format: 'd-m-Y H:i:s',
                                        size: 18,
                                        submitValue: false,
                                        readOnly: true,
                                        fieldStyle: 'background-color: #ddd; background-image: none;'
                                    },
                                    {
                                        name: 'creer_par',
                                        fieldLabel: 'Créer par',
                                        xtype: 'textfield',
                                        submitValue: false,
                                        readOnly: true,
                                        fieldStyle: 'background-color: #ddd; background-image: none;',
                                        size: 7,
                                        colspan: 2
                                    },
                                    {
                                        name: 'code_presence',
                                        fieldLabel: 'Code Présence',
                                        xtype: 'textfield',
                                        submitValue: false,
                                        readOnly: true,
                                        fieldStyle: 'background-color: #ddd; background-image: none;',
                                        size: 3
                                    },
                                    {
                                        name: 'date_mvt',
                                        fieldLabel: 'Date Mvt',
                                        xtype: 'datefield',
                                        format: 'm-Y',
                                        submitValue: false,
                                        readOnly: true,
                                        size: 12,
                                        fieldStyle: 'background-color: #ddd; background-image: none;',
                                        colspan: 2
                                    },
                                    {
                                        name: 'numero_ligne_mere',
                                        fieldLabel: 'Ligne Mère',
                                        xtype: 'textfield',
                                        submitValue: false,
                                        readOnly: true,
                                        fieldStyle: 'background-color: #ddd; background-image: none;',
                                        size: 8,
                                        colspan: 2
                                    }
                                ]
                            },
                            {
                                title: 'Lot',
                                xtype: 'grid',
                                itemId: 'gridLotMateriel',
                                stateful: true,
                                border: false,
                                hidden: true,
                                selType: 'rowmodel',
                                plugins: [Ext.create('Ext.grid.plugin.CellEditing')],
                                store: 'LotsMateriel',
                                features: [
                                    {
                                        id: 'summLotMateriel',
                                        ftype: 'summary',
                                        dock: 'bottom'
                                    }
                                ],
                                columns: [
                                    /*{
                                     text: 'Composant', dataIndex: 'poste', width: 100, resizable: false, sortable: false,
                                     summaryType: 'count',
                                     summaryRenderer: function (value) {
                                     return Ext.String.format('{0} Composant{1}', value, value != 1 ? 's' : '');
                                     }
                                     },*/
                                    {
                                        text: 'Libellé',
                                        dataIndex: 'libelle_lot_materiel',
                                        flex: 3,
                                        editor: {
                                            xtype: 'textfield',
                                            allowBlank: false,
                                            maxLength: 60,
                                            enforceMaxLength: true
                                        },
                                        summaryType: 'count',
                                        summaryRenderer: function (value) {
                                            return Ext.String.format('{0} Composant{1}', value, value != 1 ? 's' : '');
                                        }
                                    },
                                    {
                                        text: 'Qté',
                                        dataIndex: 'qte_lot_materiel',
                                        xtype: 'numbercolumn',
                                        format: '0',
                                        width: 50
                                    },
                                    {
                                        text: 'Prix Unitaire',
                                        dataIndex: 'prix_unitaire_lot_materiel',
                                        xtype: 'numbercolumn',
                                        format: '0,000',
                                        flex: 1
                                    },
                                    {
                                        text: 'Total en DT',
                                        dataIndex: 'total',
                                        xtype: 'numbercolumn',
                                        format: '0,000',
                                        flex: 1,
                                        summaryType: 'sum'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        buttonAlign: 'left',
        buttons: [
            '->',
            {
                text: 'Ok',
                iconCls: 'icon-accept',
                action: 'ok',
                prf: ['tech', 'techcompta']
            },
            {
                text: 'Annuler',
                iconCls: 'icon-cancel',
                action: 'annuler',
                scope: this,
                onClick: function () {
                    this.up('window').close();
                }
            }
        ]
    },
    null);
