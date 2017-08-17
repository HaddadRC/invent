/****************************************
 *
 *
 *
 ****************************************/

Ext.define('GestImmob.model.LotMateriel',
    {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id_lot_materiel', type: 'int', useNull: true, defaultValue: null},
            {name: 'numero_ligne', type: 'int'},
            {name: 'libelle_lot_materiel', type: 'string'},
            {name: 'qte_lot_materiel', type: 'int', defaultValue: 1},
            {name: 'prix_unitaire_lot_materiel', type: 'int'}
        ]
    },
    null);