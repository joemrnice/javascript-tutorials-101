import input from '@inquirer/input';

const favourite = await input({ message: 'What is your favourite number?' });
console.log(favourite);
console.log(typeof favourite);
