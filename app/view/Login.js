Ext.define('GestImmob.view.Login',
    {
        extend: 'Ext.window.Window',
        alias: 'widget.loginWindow',

        title: 'Login',
        iconCls: 'icon-user',
        height: 250,
        width: 350,
        autoShow: true,
        resizable: false,
        modal: true,
        closable: false,
        layout: {
            type: 'table',
            columns: 2
        },
        defaults: {
            border: false
        },
        help: 'Fenetre_Login',
        items: [
            {
                colspan: 2,
                xtype: 'container',
                html: 'Login',
                cls: 'titre-fenetre'
            },

            {
                xtype: 'image',
                src: "/immob/resources/images/login-logo.png",
                height: 160,
                width: 70
            },
            {
                xtype: 'form',
                url: 'php/verifUser.php',
                height: 160,
                width: 285,
                layout: {
                    type: 'vbox',
                    pack: 'center'
                },
                items: [
                    {
                        xtype: 'textfield',
                        name: 'login',
                        fieldLabel: 'Matricule',
                        allowBlank: false,
                        maxLength: 6,
                        minLength: 5,
                        enforceMaxLength: true,
                        regex: /^\d{5,6}$/,
                        maskRe: /\d/
                    },
                    {
                        xtype: 'textfield',
                        name: 'pass',
                        fieldLabel: 'Mot de Passe',
                        fieldStyle: 'text-transform:capitalize',
                        inputType: 'password',
                        listeners: {change: champEnUpper},
                        allowBlank: false
                    }
                ]
            }
        ],
        buttons: [
            {
                iconCls: 'icon-accept',
                text: 'Ok',
                action: 'login'
            }
        ]
    }, null);