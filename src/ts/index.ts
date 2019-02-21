function Names(name:string): string{
  return name
}
console.log(Names('about'))
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[7](); // 6
class Parent {
  static sea() {
    console.log('11111111111111111')
  }
}
Parent.sea()