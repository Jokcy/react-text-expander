/**
 *
 * @param str
 * @param position for sting 'abc': `a1b2c3`
 * @param dividers
 * @returns
 */

export function getWordBefore(
    str: string,
    position: number,
    dividers: string[] = []
): {
    divider: string;
    word: string;
    dividerIndex: number;
} | null {
    if (dividers.length === 0) {
        return null;
    }

    const targeStr = str.substring(0, position);

    const dividerReg = new RegExp([...dividers, " "].join("|"), "g");

    const wordArr = targeStr.split(dividerReg);

    const char = targeStr[position - wordArr[wordArr.length - 1].length - 1];

    if (dividers.includes(char)) {
        return {
            divider: char,
            dividerIndex: position - wordArr[wordArr.length - 1].length,
            word: wordArr[wordArr.length - 1],
        };
    } else {
        return null;
    }
}
