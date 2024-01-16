/*:
 * @plugindesc Changes certain stat effects
 * @author Caethyril
 * @help Free to use and modify.
 */

/*
(function(alias) {
    Game_Action.prototype.itemCri = function(target) {
      return alias.apply(this, arguments) + (this.subject().agi - target.agi) * 0.1;
    };
})(Game_Action.prototype.itemCri);
*/

(function(alias) {
    Game_Action.prototype.itemEva = function(target) {
        // 1% base chance
        if (target.isEnemy()) {
            // enemy eva scaling
            return alias.apply(this, arguments) + ((1 + Math.min(99, (target.agi) * 0.2)) / 100);
        } else {
            // player eva scaling
            return alias.apply(this, arguments) + ((1 + Math.min(99, (target.agi) * 0.8)) / 100);
        }
    };
})(Game_Action.prototype.itemEva);
