import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import vm from 'node:vm';
const context=vm.createContext({Intl});
vm.runInContext(fs.readFileSync('public/growth.js','utf8'),context);
const estimate=(type, fields)=>context.estimate(type,new Map(Object.entries(fields)));
test('5 L 1:4 concentrate makes 25 L, 100 x 250 ml servings before waste',()=>{
 const result=estimate('yield',{volume:5,ratio:4,price:200,cup:250,waste:0,sell:15});
 assert.match(result,/Prepared yield: 25.00 L/);assert.match(result,/Full servings: 100/);
});
test('waste and invalid portions are handled',()=>{
 assert.match(estimate('yield',{volume:5,ratio:4,price:200,cup:250,waste:10,sell:15}),/Full servings: 90/);
 assert.throws(()=>estimate('yield',{volume:5,ratio:4,price:200,cup:0,waste:0,sell:15}));
});
test('payback handles positive and non-positive contribution',()=>{
 assert.match(estimate('roi',{investment:1000,servings:40,sell:15,variable:5,fixed:100}),/4 operating days/);
 assert.match(estimate('roi',{investment:1000,servings:0,sell:15,variable:5,fixed:100}),/Not reached/);
});
test('rental subtotal separates refundable deposit',()=>{
 const result=estimate('rental',{machine:'slush',duration:'weekend',region:'pretoria',extra:1,attendant:'no',guests:100,cup:250});
 assert.match(result,/Rental subtotal:.*1[\s,]695/);assert.match(result,/Total including deposit:.*2[\s,]695/);assert.match(result,/25.0 L/);
});
test('wholesale discount and sugar portions',()=>{
 assert.match(estimate('wholesale',{quantity:10,unit:100,discount:10,delivery:100}),/Estimated total:.*1[\s,]000/);
 assert.match(estimate('sugar',{weight:1500,portion:25,price:80,waste:0}),/Estimated full portions: 60/);
});
