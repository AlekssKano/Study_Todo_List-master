export const updateArray = <T>(arr:T[],value:T):T[] => {
    // code
if(arr.find((item:T)=>item === value)) {
    return arr;
}
else{
    arr.push(value);
    return arr
}

}

// Строки
const stringArray = ["apple", "banana", "cherry"]
console.log(updateArray(stringArray, "banana")) // ['apple', 'banana', 'cherry']
console.log(updateArray(stringArray, "strawberry")) // ['apple', 'banana', 'cherry', 'strawberry']

// Числа
const numberArray = [1, 2, 3]
console.log(updateArray(numberArray, 2)) // [1, 2, 3]
console.log(updateArray(numberArray, 4)) // [1, 2, 3, 4]
console.log(1)

// export const numbers =[1,2,3,4,5]
// const idEven =(num:number)=>num%2===0
// export const filteredArr=(arr:number[], func:(item:number)=>boolean):number[]=>{
//     return arr.filter(func)
// }
// console.log(filteredArr(numbers,idEven))
//
// function filteredGenerArr<T>(arr:T[],func:(item:T)=>boolean):T[]{
//     return arr.filter(func)
//
// }
//
// function mapArray(arr:number[],transform:(val:number)=>string):string[]{
//
//     return arr.map(transform)
// }