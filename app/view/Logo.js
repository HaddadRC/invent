/****************************************
 *
 *
 *
 ****************************************/
Ext.define('GestImmob.view.Logo',
    {
        extend: 'Ext.panel.Panel',
        alias: 'widget.logo',
        itemId: 'idlogo',
        layout: 'fit',
        help: 'Fenetre_Principale',
        items: {
            xtype: 'image',
            src: 'resources/images/logo.png',
            padding: 10
        }
    },
    null);