sap.ui.define([
    "sap/ui/core/UIComponent"
], function (
    UIComponent
) {
	"use strict";

	return UIComponent.extend("z.bnd.Component", {

		metadata : {
			manifest : "json"
		},

		init : function () {

			UIComponent.prototype.init.apply(this, arguments);

			var oModel = this.getModel();
			var oRouter = this.getRouter();
			var oRootView = this.getRootControl();
			function fnBusy() {
                oRootView.setBusy(false);
            };
			function fnError(){
				oRouter.getTargets().display("notFound");
				fnBusy();
			};

			oRootView.setBusy(true);
            Promise.all([
                oModel.metadataLoaded(),
                oModel.annotationsLoaded()
            ]).then(function(){
				oRouter.initialize();
				fnBusy();
			});

            oModel.attachMetadataFailed(fnError);
            oModel.attachAnnotationsFailed(fnError);
		}

	});
});