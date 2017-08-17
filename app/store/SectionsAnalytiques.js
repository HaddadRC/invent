/****************************************
 *
 *
 *
 ****************************************/

Ext.define('GestImmob.store.SectionsAnalytiques',
    {
        extend: 'Ext.data.Store',
        model: 'GestImmob.model.SectionAnalytique',
        autoLoad: false,
        autoSync: false,

        proxy: {
            type: 'ajax',
            api: {
                read: 'php/SectionsAnalytiques_lect.php'/*,
                 update: 'php/majPlanComptable.php'*/
            },
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                root: 'sections',
                successProperty: 'success'
            },
            writer: {
                type: 'json',
                writeAllFields: false,
                allowSingle: false,
                encode: true,
                root: 'sections'
            }
        }
    },
    null
);

