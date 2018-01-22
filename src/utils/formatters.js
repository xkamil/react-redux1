export const formatCamelCased = (camelCased) => {
    let output = '';

    for (let i = 0; i < camelCased.length; i++) {
        if (camelCased.charAt(i).toUpperCase() === camelCased.charAt(i)) {
            output += ' ' + camelCased.charAt(i).toLowerCase();
        } else {
            output += camelCased.charAt(i)
        }
    }

    return output.charAt(0).toUpperCase() + output.slice(1);
};

export const formatUnderscored = (underscored) => {
    underscored = underscored.replace(/_/, ' ');

    return underscored.charAt(0).toUpperCase() + underscored.slice(1);
};
