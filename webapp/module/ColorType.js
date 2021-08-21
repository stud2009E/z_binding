sap.ui.define([
	"sap/ui/model/SimpleType",
	"sap/ui/model/ValidateException"
], function(
	SimpleType,
	ValidateException
) {
	"use strict";
	
	return SimpleType.extend("z.bnd.module.ColorType", {

		_colors: ["red", "green", "blue", "black", "none"],

		formatValue: function(sValue){
			return sValue ? sValue + "!!!" : "none!!!";
		},


		parseValue: function(sValue){
			return sValue.replace("!!!", "");
		},

		validateValue: function(sValue){
			if(!this._colors.includes(sValue)){
				throw new ValidateException("Select color from " + this._colors.join(",") + "!");
			}
		}

	});

},true);