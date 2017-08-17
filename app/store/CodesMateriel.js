/****************************************
 *
 *
 *
 ****************************************/

Ext.define('GestImmob.store.CodesMateriel',
    {
        extend: 'Ext.data.Store',
        model: 'GestImmob.model.CodeMateriel',
        autoLoad: false,
        autoSync: true,

        proxy: {
            type: 'ajax',
            api: {
                read: 'php/CodesMateriel_lect.php'
            },
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'codesMateriel',
                successProperty: 'success'
            }/*,
             extraParams :{
             }*/
        }
    },
    null
);

