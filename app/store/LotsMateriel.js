/****************************************
 *
 *
 *
 ****************************************/

Ext.define('GestImmob.store.LotsMateriel',
    {
        extend: 'Ext.data.Store',
        model: 'GestImmob.model.LotMateriel',
        autoLoad: false,
        autoSync: false,

        proxy: {
            type: 'ajax',
            api: {
                read: 'php/LotMateriel_lect.php'

            },
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'lotsMateriel',
                successProperty: 'success'
            }
        }
    },
    null
);
