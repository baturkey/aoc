/* 11171160 */
let input = `Sprinkles: capacity 5, durability -1, flavor 0, texture 0, calories 5
PeanutButter: capacity -1, durability 3, flavor 0, texture 0, calories 1
Frosting: capacity 0, durability -1, flavor 4, texture 0, calories 6
Sugar: capacity -1, durability 0, flavor 0, texture 2, calories 8`;

//input = `Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
//Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3`;

function process(ingredients, line) {
    const [name, rawProperties] = line.split(': ');
    ingredients[name] = rawProperties.split(', ').reduce((properties, line) => {
        const [name, value] = line.split(' ');
        properties[name] = value;
        return properties;
    }, {});
    return ingredients;
}

function gen(buckets, max) {
    if (buckets == 1) {
        return [[max]];
    }

    return Array(max + 1)
        .fill(0)
        .map((_, idx) => idx)
        .reduce((output, i) => {
                 gen(buckets - 1, max - i)
                .forEach(z => output.push(z.concat(i)));
            return output;
        }, []);
}

function calculate(amounts) {
    let totals = {};
    amounts.forEach((amount, i) => {
        const ingredient = ingredients[ingredientNames[i]];
        Object.keys(ingredient).forEach(prop => 
            totals[prop] = (i ? totals[prop] : 0) + ingredient[prop] * amount
        );
    });
    return ['capacity', 'durability', 'flavor', 'texture'].map(prop => totals[prop]).reduce((a, b) => (a < 0 ? 0 : a) * (b < 0 ? 0 : b)) * (totals['calories'] == 500);
}

const ingredients = input.split('\n').reduce(process, {});
const ingredientNames = Object.keys(ingredients);
console.log(gen(ingredientNames.length, 100).map(calculate).reduce((a, b) => Math.max(a, b)));
