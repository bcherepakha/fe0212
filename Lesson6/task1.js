function getName(minLengthOfName, defaultName) {
    const myName = prompt('Enter your name', defaultName);
    const myNameWithOutSpaces = myName && myName.trim();

    if (myName === null || myNameWithOutSpaces.length <= minLengthOfName) {
        return getName(minLengthOfName, myNameWithOutSpaces || '');
    }

    return myNameWithOutSpaces;
}

/** && (And, *)
 * return "last true" or "first false"
 * true && true     => true
 * true && false    => false
 * false && true    => false
 * false && false   => false
 */

/** || (Or, +)
 * return "last false" or "first true"
 * true || true     => true
 * true || false    => true
 * false || true    => true
 * false || false   => false
 */


//  (true && false) || true => false || true => true
//  true || (false && true) => true || false => true
//  5 || (0 && 2) || '' || (1 && null) => 5 || 0 || '' || null => 5

console.log( getName(3) );
