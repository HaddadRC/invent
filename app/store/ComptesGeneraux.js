/****************************************
 *
 *
 *
 ****************************************/

Ext.define('GestImmob.store.ComptesGeneraux',
    {
        extend: 'Ext.data.Store',
        model: 'GestImmob.model.CompteGeneral',
        autoLoad: false,
        autoSync: true,
        pageSize: 30,
        proxy: {
            type: 'ajax',
            api: {
                read: 'php/CompteGeneral_lect.php'
            },
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'comptes',
                successProperty: 'success'
            }
        }
    },
    null
);
