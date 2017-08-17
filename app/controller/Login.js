/****************************************
 *
 *
 *
 ****************************************/


Ext.define('GestImmob.controller.Login',
    {
        extend: 'Ext.app.Controller',
        views: [
            'Login'
        ],
        refs: [
            {
                ref: 'windowLogin',
                selector: 'loginWindow'
            },
            {
                ref: 'frmLogin',
                selector: 'loginWindow form'
            }
        ],

        init: function () {

            this.control({
                'loginWindow button[action=login]': {
                    click: this.submitLogin
                },
                'loginWindow form textfield': {
                    specialkey: this.submitByEnter
                }
            });
        },

        submitLogin: function () {
            var win = this.getWindowLogin(),
                form = win.down('form');

            form.getForm().submit({
                success: function (form, action) {
                    uInfo.setProfil(action.result['profil']);
                    uInfo.setUsr(win.down('textfield[name=login]').value);
                    miseEnFormeChampsSelonProfil('#regionMenu');
                    win.close();
                },
                failure: function (form, action) {
                    switch (action.failureType) {
                        case Ext.form.action.Action.CLIENT_INVALID:
                            Ext.Msg.error('Echec', 'Veuillez remplir les champs');
                            break;
                        case Ext.form.action.Action.CONNECT_FAILURE:
                            Ext.Msg.error('Echec', 'Ajax communication failed');
                            break;
                        case Ext.form.action.Action.SERVER_INVALID:
                            Ext.Msg.error('Echec', action.result.msg);
                            break;
                        default :
                            Ext.Msg.error('Echec', action.result.msg);
                    }
                }
            });
        },
        submitByEnter: function (field, e) {
            if (e.getKey() == e.ENTER) {
                if (field.next() == null)
                    this.submitLogin();
            }
        }
    },
    null);