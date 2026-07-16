function greet(userName: string): string {
    return `Hello, ${userName}. Welcome to TypeScript!`;
}

console.log(greet("Joseph"));

// Primitive Types and Variables
// Primitives
let userName: string = "Alice";
let age: number = 30;
let isActive: boolean = true;
let notAssigned: undefined = undefined;
let empty: null = null;
let bigNumber: bigint = 900000376982378n;
let uniqueId: symbol = Symbol("id");

// Type inference and Explicit annotation
let count = 0;
let score: number;
score = 100;

const MAX_RETRIES = 3;

// Special Types: any, unknown, never, void
let danger: any = 42;

let input: unknown = "Hello";
if (typeof input === "string") {
    console.log(input.toUpperCase());
}

function logMessage(message: string): void {
    console.log(message);
}

function throwError(message: string): never {
    throw new Error(message);
}

// Arrays and Tuples
// Arrays
let scores: number[] = [10, 20, 30];
let names: Array<string> = ["Alice", "Bob"];

// readonly arrays
const frozenList: readonly number[] = [1, 2, 3];

// Tuples - fixed length arrays
let httpResponse: [number, string] = [200, "ok"];
const [statusCode, statusText] = httpResponse; // destructing
console.log(`Response successful with status code: ${statusCode}, and status text: ${statusText}`);

// Named tuples
let cordinate: [x: number, y: number] = [10, 20];

// optional and rest elements in tuples
type RgbaColor = [red: number, green: number, blue: number, alpha?: number];
const color: RgbaColor = [255, 0, 0];

// Objects and Type Aliases
// Inline object type annotation
let user: {name: string, age: number} = {name: "Alice", age: 30};

// Extracting a reusable name with 'type'
type User = {
    name: string;
    age: number;
    email?: string; // the '?' marks as an OPTIONAL property
};

const newUser: User = {
    name: "Bob",
    age: 25
}; // 'email' can be ommitted

// Type Assertions
// Type assertions tell the compiler "trust me, I know the real type."
// They perform NO runtime conversion or check - use sparingly and only
// when you have information the compiler cannot infer.
const someValue: unknown = "this is a string";
const strLength: number = (someValue as string).length;
// alternative angle-bracket syntax (avoid in .tsx files - conflicts with jsx)
const strLength2: number = (<string>someValue).length;

// The 'satisfies' operator (TS 4.9+) checks a value against a type
// WITHOUT widening or losing the value's more specific inferred type.
type Palette = Record<string, string | number[]>;

const palette = {
    red: [255, 0, 0],
    green: "#00ff00",
} satisfies Palette;
// 'palette.red' is still known to be 'number[]', not 'string | number[]',
// unlike if we had written ': Palette' as a normal annotation.

// Functions
// Typing Parameters and Return Values
// Always annotate parameters; annotate return types on exported/public
// functions so the contract is explicit and doesn't shift silently.
function add(a: number, b: number): number {
    return a + b;
}

// Arrow function equivalent
const multiply = (a: number, b: number): number => a * b;

// Optional, Default, and Rest Parameters
// Optional parameter (marked with '?') - MUST come after required ones
function buildUrl(host: string, path?: string): string {
    return path ? `${host}/${path}` : host;
}

// Default parameter - used when the caller omits the argument
function createUser(name: string, role: string = "member"): object {
    return { name, role};
}

// Rest parameters - collects any number of extra arguments into an array
function sum(...numbers: number[]): number {
    return numbers.reduce((total, n) => total + n, 0);
}
sum(1, 2, 3, 4); // 10

// Function Overloads
// Overload signatures (no body) describe each supported call shape...
function parseInput(value: string): string[];
function parseInput(value: number): number;
// ...followed by ONE implementation signature that handles every case.
function parseInput(value: string | number): string[] | number {
    if (typeof value === "string") {
        return value.split(",");
    }
    return value * 2;
}

const parsed1 = parseInput("a, b, c"); // typed as string[]
const parsed2 = parseInput(21); // typed as number

// The 'this' Parameter
// TypeScript lets you declare the expected type of 'this' as a fake
// first parameter. It is removed at compile time and only used for checking.
interface Clickable {
    label: string;
}

function handleClick(this: Clickable, event: string): void {
    console.log(`${this.label} received ${event}`);
}

// Function Types as Values
// A variable can hold the TYPE of a function, useful for callbacks.
type MathOperation = (a: number, b: number) => number;

function calculate(a: number, b: number, operation: MathOperation): number {
    return operation(a, b);
}

calculate(5, 3, add);
calculate(5, 3, multiply);