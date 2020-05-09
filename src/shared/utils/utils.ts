export const classes = (...classes: (string | [string, boolean])[]) => {
    const classesArray: string[] = [];
    for (const itemClass of [...classes]) {
        if (Array.isArray(itemClass)) {
            const [className, isCan] = itemClass;
            if (isCan) {
                classesArray.push(className);
            }
        } else {
            classesArray.push(itemClass);
        }
    }

    return classesArray.join(" ");
};