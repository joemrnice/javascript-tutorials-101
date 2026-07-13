import input from '@inquirer/input';

const favourite = await input({ message: 'What is your favourite number?' });
console.log(favourite);
console.log(typeof favourite);

if (favourite === 23) { // 22 === 23 -> FALSE
    console.log('Cool! 23 is an amzaing number!')
  } else if (favourite === 7) {
    console.log('7 is also a cool number')
  } else if (favourite === 9) {
    console.log('9 is also a cool number')
  } else {
    console.log('Number is not 23 or 7 or 9')
  }

  if (favourite !== 23) console.log('Why not 23?');