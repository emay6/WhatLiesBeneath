/*:
 * @plugindesc Gives each character a custom attack for their default attack 
 * @author Zachary Kronenwetter
 *
 * @help
 */
 
// currently hardcoded
(function() {
    Game_BattlerBase.prototype.attackSkillId = function() {
            if (this.isActor()) {
                if (BattleManager.actor()) {
                let currClass = BattleManager.actor().currentClass();

                if (currClass == $dataClasses[0]) 1;         
                else if (currClass == $dataClasses[1]) return $dataSkills[1].id;
                else if (currClass == $dataClasses[2]) return $dataSkills[2].id;
                else if (currClass == $dataClasses[3]) return $dataSkills[3].id;
                else if (currClass == $dataClasses[4]) return $dataSkills[4].id;
                else if (currClass == $dataClasses[5]) return $dataSkills[5].id;
                else if (currClass == $dataClasses[6]) return $dataSkills[6].id;
                else if (currClass == $dataClasses[7]) return $dataSkills[7].id;
                else if (currClass == $dataClasses[8]) return $dataSkills[8].id;
                else if (currClass == $dataClasses[9]) return $dataSkills[9].id;
                else return 1;
            }
        }
    }
   
  })()