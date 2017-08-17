/****************************************
 *
 *
 *
 ****************************************/

Ext.define('GestImmob.model.CompteGeneral',
    {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id', type: 'string', mapping: 'code_compte_general'},
            'code_compte_general',
            {name: 'taux_ammortissement', type: 'float'},
            'design_compte_general',
            'nature_depense'
        ]
    },
    null);