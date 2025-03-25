"use strict";
function deepCopy(source, visited = new WeakMap()) {
    // Handle primitives and null/undefined
    if (source === null || typeof source !== 'object') {
        console.log("Является примитивом");
        return source;
    }
    // Копирование вложенных объектов
    if (visited.has(source)) {
        console.log("Вложенный объект скопирован");
        return visited.get(source);
    }
    // Копирование даты
    if (source instanceof Date) {
        const copy = new Date(source.getTime());
        visited.set(source, copy);
        console.log("Дата скопирована");
        return copy;
    }
    // Копирование регулярных выражений
    if (source instanceof RegExp) {
        const copy = new RegExp(source.source, source.flags);
        visited.set(source, copy);
        console.log("Регулярное выражение скопировано");
        return copy;
    }
    // Копирование пар ключ-значение
    if (source instanceof Map) {
        const copy = new Map();
        visited.set(source, copy);
        source.forEach((value, key) => {
            copy.set(deepCopy(key, visited), deepCopy(value, visited));
        });
        console.log("Пара ключ значение скопирована");
        return copy;
    }
    // Копирование наборов данных
    if (source instanceof Set) {
        const copy = new Set();
        visited.set(source, copy);
        source.forEach(value => {
            copy.add(deepCopy(value, visited));
        });
        console.log("Набор значений (SET) Скопирован");
        return copy;
    }
    // Копирование массивов
    if (source instanceof ArrayBuffer) {
        const copy = source.slice(0);
        visited.set(source, copy);
        console.log("Массив Скопирован");
        return copy;
    }
    // Копирование (Бинарных) массивов
    if (ArrayBuffer.isView(source)) {
        const bufferCopy = deepCopy(source.buffer, visited);
        const TypedArrayConstructor = source.constructor;
        const length = source.length;
        const copy = new TypedArrayConstructor(bufferCopy, source.byteOffset, length);
        visited.set(source, copy);
        console.log("Бинарный массив Скопирован");
        return copy;
    }
    // Копирование ссылки на функцию, тк их нельзя скопировать полностью
    if (typeof source === 'function') {
        console.log("Ссылка на функцию устанволена");
        return source;
    }
    // Сохранение прототипа объекта
    const proto = Object.getPrototypeOf(source);
    const copy = Object.create(proto);
    console.log("Создан прототип для копии");
    // Предотвращение бесконечной реккурсии копирования
    visited.set(source, copy);
    console.log("Сохранение WeakMap перед реккурсивным копированием");
    // Копирование примитивных строковых свойств ["Prop"]
    const symbolKeys = Object.getOwnPropertySymbols(source);
    for (const symKey of symbolKeys) {
        copy[symKey] = deepCopy(source[symKey], visited);
        console.log("Скопированы символьные свойства");
    }
    // Копирование примитивных свойств .a
    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            copy[key] = deepCopy(source[key], visited);
            console.log("Скопированы примитивные свойства");
        }
    }
    console.log("Копия возвращена");
    // let sdsd = new copy() as T;
    return copy;
}
const original = {
    a: 1,
    b: { c: 2 },
    d: new Date(),
    e: ["1", "2", "3"],
    f: /test/g,
    g: new Map([['key', 'value']]),
    h: new Set([1, 2, 3]),
    i: function () { console.log('Hello'); },
    // Циклическая ссылка
    self: {}
};
original.self = original;
const copied = deepCopy(original);
console.log(original); // Глубокая копия
console.log(copied); // Глубокая копия
console.log(copied.self === copied); // true (циклическая ссылка сохранена)
original.b.c = 3;
original.e = ["7", "5", "3", "5"];
original.g.set("sdsd", "asdasd");
console.log(original); // Глубокая копия
console.log(copied); // Глубокая копия
