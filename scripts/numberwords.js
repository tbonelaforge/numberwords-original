define([
    'underscore',
    'testcases'
],
function(
    _,
    TestCases
) {

    var smallNumbers = [
        'zero',
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'nine',
        'ten',
        'eleven',
        'twelve',
        'thirteen',
        'fourteen',
        'fifteen',
        'sixteen',
        'seventeen',
        'eighteen',
        'nineteen'
    ];

    var tens = [
        '', // 0 tens
        '', // 1 tens
        'twenty',  // 2 tens
        'thirty',  // 3 tens
        'forty',   // 4 tens
        'fifty',   // 5 tens
        'sixty',   // 6 tens
        'seventy', // 7 tens
        'eighty',  // 8 tens
        'ninety'   // 9 tens
    ];

    var powers = [
        '', // 10^0
        '', // 10^1
        'hundred', // 10^2
        'thousand', // 10^3
    ];
    

    var writeOutNumber = function(mantissa, exponent) {
        var remainder          = 0,
            remainderString    = '',
            exponentString     = (exponent) ? ' ' + powers[exponent] : '',
            significantNumber  = 0;

        if (exponent && mantissa == 0) {
            return '';
        }
        if (mantissa < 20) {
            return smallNumbers[mantissa] + exponentString;
        }
        if (mantissa < 100) {
            remainder = mantissa % 10;
            significantNumber = (mantissa - remainder) / 10;
            remainderString = (remainder) ? '-' + writeOutNumber(remainder, 0) : '';
            return tens[significantNumber] + remainderString + exponentString;
        }
        if (mantissa < 1000) {
            remainder = mantissa % 100;
            significantNumber = (mantissa - remainder) / 100;
            remainderString = (remainder) ? ' ' + writeOutNumber(remainder, 0) : '';
            return writeOutNumber(significantNumber, 2)  + remainderString + exponentString;
        }
        if (mantissa < 1000000) {
            remainder = mantissa % 1000;
            significantNumber = (mantissa - remainder) / 1000;
            remainderString = (remainder) ? ' ' + writeOutNumber(remainder, 0) : '';
            return writeOutNumber(significantNumber, 3) + remainderString + exponentString;
        }
    };


    // Testing code:
    var firstFail = -1;

    for (i = 0; i < TestCases.length; i++) {
        if (writeOutNumber(i) != TestCases[i]) {
            console.log("Got : \n", writeOutNumber(i));
            console.log("\n expected: \n", TestCases[i]);
            firstFail = i;
            break;
        }
    }
    if (firstFail >= 0) {
        alert("Got the wrong string for " + firstFail + "!");
    } else {
        alert("Passed all tests.");
    }




});