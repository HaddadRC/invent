
//Titre des fenetres
Ext.define('TitreFenetre',
    {
        extend: 'Ext.container.Container',
        alias: 'widget.titreFenetre',
        html: '',
        cls: 'titre-fenetre',
        width: '100%'
    },
    null
);

//Dialogues Messages
Ext.define('Override.Ext.Msg',
    {
        override: 'Ext.window.MessageBox',
        //Message d'erreur
        error: function (titre, message, callback) {
            if (titre == '' || titre === undefined) titre = 'Erreur';
            Ext.Msg.show({
                title: titre,
                msg: message,
                buttons: Ext.Msg.OK,
                icon: 'error-icon',
                toFrontOnShow: true,
                //closable :false,
                fn: callback
            });
        },
        // boite oui-non
        confirm: function (cfg, msg, fn, scope) {
            if (Ext.isString(cfg)) {
                cfg = {
                    title: cfg,
                    icon: this.QUESTION,
                    msg: msg,
                    buttons: this.YESNO,
                    defaultFocus: 2,
                    callback: fn,
                    toFrontOnShow: true,
                    scope: scope,
                    closable: false
                };
            }
            return this.show(cfg);
        },
        waitLoad: function (titre, message, callback) {
            if (titre == '' || titre === undefined) titre = 'Chargement';
            if (message == '' || message === undefined) message = 'Veuillez patienter,Chargement en cours...';
            var cfg = {
                title: titre,
                msg: message,
                icon: 'preload-icon',
                closable: false,
                width: 250,
                closeAction: 'destroy',
                fn: callback
            };
            return this.wait(cfg);
        },
        /** Retourne null si value est vide (ou blanc(s)) sinon la chaine elle même
         * @param {int} type type de trt:
         *  1: Vérification,
         *  2: Chargement,
         *  3: Sauvegarde,
         *  4: Vérification & Enregistrement,
         *  autre: Traitement
         * @param {String} [titre]
         * @param {String} [message]
         * @return {Object} la fenetre elle même
         */
        waitProgress: function (type, titre, message) {
            switch (type) {
                case 1:
                    titre = 'Vérification';
                    break;
                case 2:
                    titre = 'Chargement';
                    break;
                case 3:
                    titre = 'Sauvegarde';
                    break;
                case 4:
                    titre = 'Vérification & Enregistrement';
                    break;
                default :
                    titre = 'Traitement';
                    break;
            }
            message = 'Veuillez patienter,' + titre + ' en cours...';
            return this.wait(message, null, {
                interval: 500,
                text: titre
            });
        }
    },
    null);

Ext.define('Override.data.Proxy',
    {
        override: 'Ext.data.Proxy',
        batchOrder: 'destroy,update,create'
    },
    null);

//ENTREE --> Navigation
Ext.define('Override.Ext.form.field.Text',
    {
        override: 'Ext.form.field.Text',
        initComponent: function () {
            this.callParent();
            this.on('specialkey', this.onEnterTabKey, this);
        },
        onEnterTabKey: function (field, e) {
            if (!e.shiftKey && e.getKey() == e.ENTER) {
                //e.stopEvent();
                if (field.next() != null) {
                    field.fireEvent('blur', field);
                    field.next().focus();
                }
            }
            if (e.shiftKey && e.getKey() == e.ENTER) {
                //e.stopEvent();
                if (field.prev() != null) {
                    field.fireEvent('blur', field);
                    field.prev().focus();
                }
            }
        }
    },
    null);
Ext.define('Override.Ext.form.field.ComboBox',
    {
        override: 'Ext.form.field.ComboBox',
        initComponent: function () {
            this.callParent();
            this.on('specialkey', this.onEnterTabKey, this);
        },
        onEnterTabKey: function (field, e) {
            if (!e.shiftKey && e.getKey() == e.ENTER) {
                //e.stopEvent();
                if (field.next() != null) {
                    field.fireEvent('select', field);
                    field.next().focus();
                }
            }
            if (e.shiftKey && e.getKey() == e.ENTER) {
                //e.stopEvent();
                if (field.prev() != null) {
                    field.fireEvent('select', field);
                    field.prev().focus();
                }
            }
            //haut et bas -> selection
            if (e.getKey() == e.UP || e.getKey() == e.DOWN) {
                var p = field.getPicker();
                p.on({
                    highlightitem: function (view, node) {
                        field.select(p.getRecord(node));
                    }
                });
            }
        },
        afterQuery: function () {
            this.focus();
        }
    },
    null);
Ext.define('Override.Ext.grid.plugin.CellEditing',
    {
        override: 'Ext.grid.plugin.CellEditing',
        onSpecialKey: function (ed, field, e) {
            var grid = this.grid,
                nbCols = grid.columns.length - 1, //start from 0
                nbRows = grid.getStore().getTotalCount() - 1, //start from 0
                currentCol = this.context.colIdx,
                currentRow = this.context.rowIdx;

            //navigation en avant
            if (!e.shiftKey && (e.getKey() === e.ENTER || e.getKey() === e.TAB)) {
                e.stopEvent();

                //Detect next editable cell
                do {
                    if (this.startEdit(currentRow, currentCol + 1)) {
                        field.fireEvent('blur', field);
                        break;
                    }
                    else {
                        currentCol++;
                        if (currentCol >= nbCols) {
                            currentRow++;
                            currentCol = -1;
                        }
                    }
                } while (currentRow <= nbRows);
            }
            //navigation en arrière
            if (e.shiftKey && (e.getKey() === e.ENTER || e.getKey() === e.TAB)) {
                e.stopEvent();

                //Detect previous editable cell
                do {
                    if (this.startEdit(currentRow, currentCol - 1))
                        break;
                    else {
                        currentCol--;
                        if (currentCol < 0) {
                            currentRow--;
                            currentCol = nbCols + 1;
                        }
                    }
                } while (currentRow >= 0);
            }
        }
    },
    null);

//Splitter
Ext.define('MySplitter',
    {
        extend: 'Ext.resizer.Splitter',
        alias: 'widget.mySplitter',
        margin: '5 100 5 100',
        border: 3,
        style: {
            borderColor: '#D1E1F4',
            borderStyle: 'solid'
        },
        maxWidth: '50%'
    },
    null
);
