"use strict";
const OpenBracket = ["[", "{", "("];
const CloseBracket = ["]", "}", ")"];
const AllowedSymbols = ["[", "{", "(", "]", "}", ")"];
const BracketMap = new Map();
BracketMap.set("[", "]");
BracketMap.set("{", "}");
BracketMap.set("(", ")");
// if ((StringToCheck.indexOf("{") != -1) && (StringToCheck.indexOf("{") != -1) && (StringToCheck.indexOf("{") != -1)) {
//     return false;
// }
function BracketCheck(StringToCheck) {
    if (typeof StringToCheck === 'string') {
        console.log(`Введено ${StringToCheck}`);
        let CheckStack = new Array();
        for (let i = 0; i < StringToCheck.length; i++) {
            let c;
            c = StringToCheck[i];
            //console.log(c);
            if (AllowedSymbols.includes(c)) { //Проверка на разрешенный символ
                for (let openbrak of OpenBracket) {
                    if (c === openbrak) {
                        let temp = BracketMap.get(openbrak);
                        if (typeof temp === 'string') {
                            console.log(`Добавляем в стек символ ${temp}`);
                            console.log(`Длинна стека равна ${CheckStack.push(temp)}`);
                            console.log(`Значения в стеке ${CheckStack}`);
                        }
                    }
                }
                if (CheckStack[CheckStack.length - 1] === c) {
                    let d = CheckStack.pop();
                    if (typeof d === 'string') {
                        console.log(`Убираем из стека символ ${d}`);
                    }
                }
            }
            else {
                console.log("Символ не является видом скобки");
                return false;
            }
        }
        if (CheckStack.length === 0) {
            console.log("Стек пуст, строка прошла проверку");
            return true;
        }
        else {
            console.log("Стек не пуст, строка не прошла проверку");
            return false;
        }
    }
    console.log("Строка пуста");
    return false;
}
let BracketString;
BracketString = prompt("Напишите строку только из скобок любого вида, результат в консоли F12");
BracketCheck(BracketString);
console.log("Для повторной проверки перезагрузите страницу");
