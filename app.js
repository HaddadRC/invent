Ext.application({
    name: 'GestImmob',
    appFolder: 'app',
    controllers: [
        'Login',
        'ConsultationM5',
        'inventaire.FicheInventaire',
        'inventaire.RechercheInventaire'
    ],
    views: ['Logo'],
    stores: [
    ],

    //Donnees (chargees ds 'autoLoad' du store Donnees)
    annee_comptable: '',
    mois_comptable: '',


    launch: function () {

        //pour désactiver qq touches
        Ext.EventManager.addListener(Ext.getBody(), 'keydown', function (e) {
            var target = e.getTarget().type,
                key = e.getKey();

            //pour désactiver le "backspace" ;)
            if (typeof target === 'undefined' && key == e.BACKSPACE) {
                e.preventDefault();
            }
            if (key == e.F1) {
                var racine = Ext.ComponentQuery.query('container[id=regionMain] [help!=undefined]');

                if (racine.length != 0) {
                    var page = "webHelp/scr/" + racine[0]['help'] + ".htm";
                    window.open(page);
                }
                else
                    window.open('webHelp/index.htm');
                e.preventDefault();
            }
        });

        //test navigateur
//        if (navigator.appName == "Microsoft Internet Explorer") {
//            Ext.Msg.show({
//                title: 'Attention',
//                msg: 'Vous uilisez <span style="font-weight: bold">"Microsoft Internet Explorer"</span> comme navigateur!<br>' +
//                    'Veuillez noter ce navigateur est <span style="font-weight: bold">incompatible</span> avec l\'application.<br>' +
//                    'Veuillez utiliser l\'un des navigateurs suivants:<br>' +
//                    '<div style="text-align: center">Firefox <span style="font-weight: bold;text-decoration: underline">(ROCOMMANDÉ)</span>, Chrome, Opera</div><br>' +
//                    'Ces navigateurs sont telechargeables via le lien ci-dessous:<br>' +
//                    '<div style="text-align: center"><a href="http://10.71.0.24/applications/">Applications</a></div>',
//                buttons: Ext.Msg.OK,
//                icon: 'warning-icon'
//            });
//        }

        //on enlève le splash
        Ext.get('loading-mask').remove();
        Ext.get('loading').remove();

        //Dessin
        Ext.widget('loginWindow');
        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [
                {
                    region: 'north',
                    id: 'regionEntete',
                    margins: '2',
                    height: 50,
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        align: 'stretch',
                        pack: 'center'
                    },
                    /*style: {
                     background: '#ffffff',
                     'background-image': 'url("resources/images/form_background.jpg")',
                     backgroundSize: '10% 85%',
                     backgroundRepeat: 'no-repeat',
                     backgroundPosition: 'top left'
                     },*/
                    items: [
                        {
                            xtype: 'container',
                            //html: '<h1 style="text-align: center;color: #191970;font-size: 24px">Gestion des Immobilisations</h1>' + '<div style="text-align: right">Profil:' + uInfo.getProfil() + '</div>'
                            html: '<div style="text-align: center;text-decoration: underline;font-weight: bolder;color: #191970;font-size: 24px">Gestion des Immobilisations</div>'
                        },
                        {
                            xtype: 'container',
                            itemId: 'infoMoisCompt',
                            margins: '0 5 2 5',
                            html: '<div style="text-align: right;text-decoration: underline;font-weight: bolder;color: #000000;font-size: 12px">Mois Comptable :</div>'
                        }
                    ]
                },
                {
                    title: 'Menu',
                    id: 'regionMenu',
                    region: 'west',
                    margins: '0 5 5 5',
                    collapsible: true,
                    titleCollapse: true,
                    resizable: {handles: 'e'},
                    width: 160,
                    layout: 'accordion',
                    defaults: {
                        xtype: 'panel',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        }
                    },
                    items: [
                        {
                            title: "Gestion de l'inventaire",
                            cls: 'titre-accordion-menu',
                            defaults: {
                                scale: 'medium',
                                height: 32
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    name: 'Recherche',
                                    text: 'Recherche',
                                    handler: function () {
                                        renderInMain('rechercheInventairePanel',{src:'menu'});
                                    }
                                },
                                {
                                    xtype: 'button',
                                    name: 'consultationM5',
                                    text: 'Consultation M5',
                                    handler: function () {
                                        renderInMain('consultationM5');
                                    }
                                }
                            ]
                        },
                        {
                            title: 'Divers',
                            cls: 'titre-accordion-menu',
                            defaults: {
                                scale: 'medium',
                                height: 32
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    name: 'Pl',
                                    text: 'Plan Comptable'
                                },
                                {
                                    xtype: 'button',
                                    name: 'btnMenuCodeMateriel',
                                    text: 'Codes Matériel',
                                    iconCls: 'icon-label-yellow-22',
                                    handler: function () {
                                        console.log('a faire');
                                    }
                                },
                                {
                                    xtype: 'button',
                                    name: 'btnMenuHelp',
                                    text: 'Aide',
                                    iconCls: 'help-icon-22'
                                }
                            ]
                        }
                    ]
                },
                {
                    region: 'center',
                    id: 'regionMain',
                    xtype: 'container',
                    layout: 'fit',
                    margins: '0 5 5 0',
                    items: {xtype: 'logo'}
                },
                {
                    region: 'south',
                    id: 'regionStatus',
                    xtype: 'panel',
                    frame: true,
                    border: false,
                    margins: '0 1 0 1',
                    padding: '1',
                    height: 25,
                    bbar: {xtype: 'barreEtat'}
                }
            ]
        });
    }
});
