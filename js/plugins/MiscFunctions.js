/*:
 * @plugindesc Miscellaneous functions for use in scripts
 * @author Applebees
 *
 * @help
 */

let savedParams = {};

function inSavedParams(name, id) {
    return name in savedParams && id in savedParams[name];
}

(function() {
    // gets param from given id
    Game_Battler.prototype.getParamFromId = function(paramId) { 
        switch (paramId) {
            case 0:
                return this.mhp;
            case 1:
                return this.mmp;
            case 2:
                return this.atk;
            case 3:
                return this.def;
            case 4:
                return this.mat;
            case 5:
                return this.mdf;
            case 6:
                return this.agi;
            case 7:
                return this.luk;
            default:
                return 0;
        }
    }

    // resets given param after any changes
    Game_Battler.prototype.resetParam = function(paramId) {
        if (paramId < 0 || paramId > 7) {
            return;
        }

        
        this.addParam(paramId, -this.getParamFromId(paramId));

        if (inSavedParams(this.name(), paramId)) {
            this.addParam(paramId, savedParams[this.name()][paramId]);
            delete savedParams[this.name()][paramId];
        } else {
            // back up, do not want typically
            this.addParam(paramId, this.paramBase(paramId));
        }
    }

    // saves param for when resetting
    Game_Battler.prototype.saveParam = function(paramId) {
        if (inSavedParams(this.name(), paramId)) {
            return;
        }

        savedParams[this.name()] = {};
        savedParams[this.name()][paramId] = this.getParamFromId(paramId);
    }

    Game_Battler.prototype.getSavedParam = function(paramId) {
        if (inSavedParams(this.name(), paramId)) {
            return savedParams[this.name()][paramId];
        } else {
            return -1;
        }
    }

    // increases param and save original amount
    Game_Battler.prototype.increaseParam = function(paramId, amt) {
        this.saveParam(paramId);
        this.addParam(paramId, this.getSavedParam(paramId) * amt);
    }

    // for use with yanfly 
    Game_Battler.prototype.increaseStateCounter = function(stateId, amt, max) {
        try {
            if (this.getStateCounter(stateId) == max) {
                return;
            } 
            this.addStateCounter(stateId, amt);
        } catch (e) {
            console.log(e);
        }
    }
   
})()