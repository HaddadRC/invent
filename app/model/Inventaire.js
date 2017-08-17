/****************************************
 *
 *
 *
 ****************************************/

Ext.define('GestImmob.model.Inventaire',
    {
        extend: 'Ext.data.Model',
        idProperty: 'numero_ligne',
        fields: [
            {name: 'numero_ligne', type: 'int', defaultValue: null, useNull: true},
            {name: 'code_siege', type: 'string', defaultValue: null, useNull: true},
            {name: 'code_compte_analytique', type: 'string', defaultValue: null, useNull: true},
            {name: 'code_compte_general', type: 'string', defaultValue: null, useNull: true},
            {name: 'code_materiel', type: 'string', useNull: true},
            {name: 'gpe_appareil', type: 'int', defaultValue: 0},
            {name: 'code_appareil', type: 'int', defaultValue: 0},
            {name: 'rang_appareil', type: 'int', defaultValue: 0},
            {name: 'design_appareil'},
            {name: 'compl_design_appareil'},
            {
                name: 'num_appareil', type: 'string', defaultValue: null, useNull: true,
                convert: function (v) {
                    return nullSiVide(v) == null ? null : v
                }
            },
            {
                name: 'num_serie', type: 'string', defaultValue: null, useNull: true,
                convert: function (v) {
                    return nullSiVide(v) == null ? null : v
                }
            },
            {name: 'date_mise_serv', type: 'date', dateFormat: 'Y-m-01'},
            {name: 'annee_acqui', type: 'string', defaultValue: null, useNull: true},
            {name: 'quantite', type: 'int', defaultValue: 1},
            {name: 'val_acqui', type: 'int'},
            {name: 'code_presence', type: 'int', defaultValue: 5},
            {name: 'cumul_ammor', type: 'int', defaultValue: 0},
            {name: 'date_mvt', type: 'date', useNull: true, dateFormat: 'Y-m-d'},
            {name: 'num_bord', type: 'string', useNull: true},
            {name: 'numero_ligne_mere', type: 'int', defaultValue: null, useNull: true},
            {name: 'code_entree', type: 'string'},
            {name: 'matricule_affect', type: 'string', defaultValue: null, useNull: true},
            {name: 'desc_lieu_affectation', type: 'string', defaultValue: null, useNull: true},
            {name: 'id_ligne93', type: 'int', defaultValue: null, useNull: true},
            {name: 'code_projet', type: 'string', defaultValue: null, useNull: true},
            {name: 'commande_atl', type: 'string', useNull: true, defaultValue: null},
            {name: 'lot', type: 'boolean', defaultValue: false},
            {name: 'poste', type: 'int'},
            {name: 'num_cmd', type: 'string', defaultValue: null, useNull: true},
            {name: 'creer_par', type: 'string', useNull: true, defaultValue: null},
            {name: 'id_lignes_projet', type: 'int', defaultValue: null, useNull: true},
            {
                name: 'creer_le',
                type: 'date',
                dateFormat: 'Y-m-d H:i:s',
                useNull: true,
                defaultValue: null,
                persist: false
            },
            /*{name: 'imputable', type: 'bool', defaultValue: false}*/
            //champs pour affichage seulement
            {name: 'val_acqui_devise', type: 'float', persist: false},
            {name: 'existant', type: 'boolean', defaultValue: 1}
        ]
    },
    null);
