/* ТЕОРЕТИЧЕСКОЕ ОБОСНОВАНИЕ

* I
* Очевидно, что наибольший палиндром от произведения двух пятизначных чисел будет 
* начинаться с цифры 9 и, следовательно, заканчиваться цифрой 9.
* Значит, необходимо использовать только те простые числа, которые начинаются и 
* заканчиваются делителями 9 (т.е. 1, 3, 9).

* II
* Очевидно, что перемножение пятизначных цифр занимает значительное время
* и производительность компьютера. Т.е. для экономии необходимо
* перемножать 1 с 9, а 3 с 3.
* Поэтому формируется 9 массивов для перемножение чисел вида:
* 	1..1 с 9..9
* 	1..3 с 9..3
* 	1..9 с 9..1
* 	3..1 с 3..9
* 	3..3 с 3..3
* 	3..9 с 3..1
* 	9..1 с 1..9
* 	9..3 с 1..3
* 	9..9 с 1..1

*/

"use strict"

function get(){

	var arrayOfAllPrimes = [2, 3];

	var arrayOf1_1 = [];
	var arrayOf1_3 = [];
	var arrayOf1_9 = [];
	var arrayOf9_1 = [];
	var arrayOf9_3 = [];
	var arrayOf9_9 = [];
	var arrayOf3_1 = [];
	var arrayOf3_3 = [];
	var arrayOf3_9 = [];

	var lowerLimit = 10000;
	var upperLimit = 99999;

	var numbers ={
		prime1: null,
		prime2: null,
		palindrome: null
	}

	console.time('Скорость выполнения'); 

	//ВЫЧИСЛЕНИЕ МАССИВОВ ПРОСТЫХ ПЯТИЗНАЧНЫХ ЧИСЕЛ

	function getPrimes() {

		for(var i = 5; i < upperLimit; i = i + 2 ){// итерирует все нечетные числа начиная с 5, четные числа пропускаем
			isPrime(i, arrayOfAllPrimes);
		}

		function isPrime(i, arr) { // функция для определения простоты числа
			for(var k = 1; k < arr.length;  ){
				if((i % arr[k]) != 0) k++;
				else{
					return;
				}
			}

			arr.push(i); //простое число добавляем в массив

			if(i > lowerLimit){//здесь отбираются числа для каждого из девяти массивов 
				
				let firstChar = i.toString()[0];
				let lastChar = i.toString()[4];
						
				if(firstChar == "1"){

					if(lastChar == "1") arrayOf1_1.push(i);
					if(lastChar == "3") arrayOf1_3.push(i);
					if(lastChar == "9") arrayOf1_9.push(i);
				}

				if(firstChar == "3"){

					if(lastChar == "1") arrayOf3_1.push(i);
					if(lastChar == "3") arrayOf3_3.push(i);
					if(lastChar == "9") arrayOf3_9.push(i);
				}

				if(firstChar == "9"){

					if(lastChar == "1") arrayOf9_1.push(i);
					if(lastChar == "3") arrayOf9_3.push(i);
					if(lastChar == "9") arrayOf9_9.push(i);
				}
			}
		}
	}

	getPrimes();


	//НАХОЖДЕНИЕ ПАЛИНДРОМА 

	function isPalinrome(a, b, compos){//функция для определения палиндромности    
		
		compos = a * b;

		if(compos > numbers.palindrome){ // отсекается произведение, если оно меньше уже найденного 

			if(compos.toString() == compos.toString().split('').reverse().join('')){
			//переворачивает произведение и сравнивает как 2 строки
			//если это палиндром - значения записываются в numbers.palindrome
				numbers.prime1 = a;
				numbers.prime2 = b;
				numbers.palindrome = compos;
			}
		}
	}

	function proceed(arr1, arr2){

		for (var i = arr1.length - 1; i >= 0; i--) {
			for(var k = arr2.length - 1; k >= 0; k--){
				isPalinrome(arr1[i],arr2[k]);
			}
		}
	}

	proceed(arrayOf1_1, arrayOf9_9);
	proceed(arrayOf1_3, arrayOf9_3);
	proceed(arrayOf1_9, arrayOf9_1);
//	proceed(arrayOf3_1, arrayOf3_9);
	proceed(arrayOf3_3, arrayOf3_3);
	proceed(arrayOf3_9, arrayOf3_1);
	proceed(arrayOf9_1, arrayOf1_9);
	proceed(arrayOf9_3, arrayOf1_3);
	proceed(arrayOf9_9, arrayOf1_1);
	
	console.timeEnd('Скорость выполнения');
	document.getElementById('result').innerHTML = "Произведение-палиндром = " 
		+ numbers.palindrome + " с множителями из простых чисел " 
		+ numbers.prime1 + " и " + numbers.prime2 + ". <br>" + "Время поиска отображено в консоли";	
	
	return [numbers.palindrome, numbers.prime1, numbers.prime2];
}
