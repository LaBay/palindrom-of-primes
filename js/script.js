"use strict"



var lim = 99999; // предел значений (самое большое пятизначное число)

var primes = [2, 3]; // массив простых чисел

var pali_primes = { // объект, в который запишется искомый падиндром (pali) и два множителя (a, b) 
	a: 0,
	b: 0,
	pali: 0
};

//ПОИСК ПРОСТЫХ ЧИСЕЛ

function getPrimesArr(){

for (var i = 5; i < lim; i = i + 2) { // итерирует все нечетные числа начиная с 5, четные числа пропускаем
	isPrime(i, primes);
	
}

function isPrime(i, arr) { // функция для определения простоты числа
	for(var k = 1; k < arr.length;  ){
		if((i % arr[k]) != 0) k++;
		else{
			return;
		}
	}
	 arr.push(i); //простое число добавляем в массив

}

for (var i = 0; i < primes.length; i++){ // убирает из массива непятизначные простые числа
		if( primes[i] > (lim/10)) {
			primes.splice(0, i)
			break
		}
}

primes = primes.reverse();// переворачивает массив

console.log("массив пятизначных простых чисел", primes);// выводит в консоль найденный массив простых чисел
}

//ПОИСК ПРОИЗВЕДЕНИЯ-ПАЛИНДРОМА

function isPali(a, b, compos){//функция для определения палиндромности    
	
	compos = a * b;

	if(compos > pali_primes.pali){ // отсекается произведения, если оно меньше уже найденного 

		if(compos.toString() == compos.toString().split('').reverse().join('')) {//переворачивает произведение и сравнивает как 2 строки
		//если это палиндром - значения записываются в объект pali_primes
			pali_primes.a = a;
			pali_primes.b = b;
			pali_primes.pali = compos;
			console.log("найденные значения ", pali_primes);
		}
	}
}

function pali(arr) {//тупой перебор массива

	for (var i = arr.length - 1; i >= 0; i--) {
		for(var k = arr.length - 1; k >= 0; k--){
			isPali(arr[i],arr[k]);
		}
	}
}
//pali(primes)

function start(){
	console.time('test'); // засекается время начала выполнения кода
	getPrimesArr();
	pali(primes);
	console.timeEnd('test'); // выводит время выполнения кода
}