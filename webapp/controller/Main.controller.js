sap.ui.define([
    "./BaseController",
    "sap/m/StandardListItem",
    "sap/m/ObjectListItem",
    "sap/m/ListType",
    "sap/ui/core/message/ControlMessageProcessor",
    "sap/ui/core/MessageType",
    "sap/ui/core/message/Message"
], function (
    BaseController,
    StandardListItem,
    ObjectListItem,
    ListType,
    ControlMessageProcessor,
    MessageType,
    Message
) {
    "use strict";

    return BaseController.extend("z.bnd.controller.Main", {

        onInit : function () {
            this.getRouter().getRoute("main").attachMatched(this._onRouteMatch, this);
        
            var oView = this.getView();
            this._messageManager = sap.ui.getCore().getMessageManager();
            this._messageManager.registerObject(oView, true);

            this._controlMsgProcessor = new ControlMessageProcessor();
            this._messageManager.registerMessageProcessor(this._controlMsgProcessor);
        },

        /**
         * handle route match event
         * @param {sap.ui.base.Event} oEvent 
         */
        _onRouteMatch: function(oEvent){

        },


        factoryListItem: function(sId, oCtx){
            var bBoolean = oCtx.getProperty("Boolean");
            var oListItem = null;

            if(bBoolean){
                oListItem = new ObjectListItem(sId, {
                    selected: "{Boolean}",
                    title: "{String}",
                    intro: "{Guid}",
                    markFavorite: "{Boolean}",
                    type: ListType.Active,
                    press: this.onItemPress.bind(this)
                });
            }else{
                oListItem = new StandardListItem(sId, {
                    icon: "sap-icon://flag",
                    selected: "{Boolean}",
                    title: "{String}",
                    description: "{Guid}",
                    info: "{Int16}",
                    type: ListType.Active,
                    press: this.onItemPress.bind(this)
                });
            }

            return oListItem;
        },

        onItemPress: function(oEvent){
            var oContextBindingForm = this.byId("contextBindingForm");
            var oListItem = oEvent.getSource();
            var oCtx = oListItem.getBindingContext();

            oContextBindingForm.setBindingContext(oCtx);
        },

        validateFieldGroupPanel: function(oEvent){
            
            oEvent.bCancelBubble = true;
        },

        validateFieldGroupVBox: function(oEvent){
            var oView = this.getView();
            var sPayPalId = oView.createId("payPal");

            this._messageManager.addMessages(
                new Message({
                    message: "my message about something",
                    type: MessageType.Error,
                    target: sPayPalId + "/value",
                    processor: this._controlMsgProcessor
                })
            );

            oEvent.bCancelBubble = true;
        },


        onCheckButtonPress: function(){

        }
    });

});