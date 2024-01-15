var Imported = Imported || {};
Imported.FSP_ActionBattleSystem = true;

var FlynnSP = FlynnSP || {};
FlynnSP.GDF = FlynnSP.GDF || {};
FlynnSP.GlobalDamageFormulas = FlynnSP.GlobalDamageFormulas || {};
FlynnSP.GlobalDamageFormulas.version = 1.00;

/*:
* @target MZ
* @plugindesc [v1.0] Adds global damage formulas to be used by any skill.
*
* @author FlynnSP
*
* @help
*
* ============================================================================
* Introduction
* ============================================================================
*
* This plugin allows to use global functions as damage formulas, allowing to
* stay consistent with damage formulas and edit them easily.
*
* ============================================================================
* Terms of Use
* ============================================================================
*
* This plugin is free for game developers to use in both free and commercial
* game projects as long as credit is given to FlynnSP.
* Edited, forked or redistributed versions of this plugins are fine as long as
* FlynnSP is retained in the credits of any copies, the copies must remain
* free, open-source, and must also retain an unmodified version of these
* licensing terms.
*
* ============================================================================
* Requirements
* ============================================================================
*
* This plugin is made for RPG Maker MZ. This will not work in other iterations
* of RPG Maker.
*
* ============================================================================
* How to Use
* ============================================================================
*
* Fill in the Global Formulas plugin parameters with your various damage
* formulas. You need to give them a name, and a formula. You can use the
* following variables in the formula:
* - a: The user. Like the default formulas, you can get their data (a.atk,
* a.mat, etc)
* - b: The target. Like the default formulas, you can get their data (a.def,
* a.mdf, etc)
* - params: An array of additional parameters you can get. Use params[x] to
* access the x-th additional parameter.
*
* In your skill/items formulas, you can insert the following:
* ----------------------------------------------------------------------------
*   a.useGlobalFormula('name', b)
* ----------------------------------------------------------------------------
* You just need to replace 'name' by the actual name of your formula.
*
* If you want to add additional parameters, you can do it with the following:
* ----------------------------------------------------------------------------
*   a.useGlobalFormula('name', b, param1, param2, etc)
* ----------------------------------------------------------------------------
* 'param1' will be params[0] in your global formula, 'param2' will be
* params[1], and 'etc' will be params[2]. You can add as many as you want.
*
*
* @param GlobalFormulas
* @text Global Formulas
* @type struct<GlobalFormula>[]
* @desc Damage formulas used to compute skill damage.
* @default ["{\"Name\":\"phy\",\"Formula\":\"\\\"(a.atk * 2 - b.def) * params[0]\\\"\"}","{\"Name\":\"mag\",\"Formula\":\"\\\"(a.mat * 2 - b.mdf) * params[0]\\\"\"}"]
*
*
*/
/*~struct~GlobalFormula:
*
* @param Name
* @text Name
* @desc The name of the formula.
* @default new
*
* @param Formula
* @text Formula
* @type note
* @desc Damage formula to use. a: user; b: target; params[x]: additional parameter.
* @default "(a.atk * 2 - b.def) * params[0]"
*
*/

(function($$)
{

    const pluginParameters = PluginManager.parameters("FSP_GlobalDamageFormulas");
    $$.params = {};
    $$.params.globalFormulas = {}
    JSON.parse(pluginParameters["GlobalFormulas"]).map(e => JSON.parse(e)).forEach(e => $$.params.globalFormulas[e.Name] = JSON.parse(e.Formula));

    Game_Battler.prototype.useGlobalFormula = function(name, b, ...params) {
        
        let a = this;
        return eval($$.params.globalFormulas[name]);
    };
})(FlynnSP.GDF);