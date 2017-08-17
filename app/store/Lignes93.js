Ext.define('GestImmob.store.Lignes93',
    {
        extend: 'Ext.data.Store',
        model: 'GestImmob.model.Ligne93',
        autoLoad: false,
        autoSync: false,

        proxy: {
            type: 'ajax',
            api: {
                read: 'php/Ligne93_lect.php'
            },
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'lignes93',
                successProperty: 'success'
            }
        }
    },
    null
);