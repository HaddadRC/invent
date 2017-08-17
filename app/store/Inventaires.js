/****************************************
 *
 *
 *
 ****************************************/

Ext.define('GestImmob.store.Inventaires',
    {
        extend: 'Ext.data.Store',
        model: 'GestImmob.model.Inventaire',
        autoLoad: false,
        autoSync: false,

        proxy: {
            type: 'ajax',
            api: {
                read: 'php/Inventaire_lect.php',
                update: 'php/Inventaire_maj.php'
            },
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'inventaires',
                successProperty: 'success'
            },
            writer: {
                type: 'json',
                writeAllFields: false,
                allowSingle: false,
                encode: true,
                root: 'inventaires'
            }
        },
        groupField: 'poste'
    },
    null
);
