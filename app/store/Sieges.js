/****************************************
 *
 *
 *
 ****************************************/

Ext.define('GestImmob.store.Sieges',
    {
        extend: 'Ext.data.Store',
        model: 'GestImmob.model.Siege',
        autoLoad: false,
        autoSync: false,

        proxy: {
            type: 'ajax',
            api: {
                read: 'php/Siege_lect.php'
            },
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'sieges',
                successProperty: 'success'
            }
        }
    },
    null
);

