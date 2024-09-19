const drums_count = 3;
const drum_symbol_count = 7;
let startSum = 1000;

const getRand = (min, max) => { // min and max included
	return Math.floor(Math.random() * (max - min + 1) + min);
}

const uniqSymbolsCountToKoeffMap = {
	1: 100,
	2: 2,
	3: 0,
};

const bet = 1;
const getWinValueByRollResultAndBet = (rollResult = [], bet = 1) => {
	if(!rollResult?.length) return 0;
	const uniqSymbolsCount = [...new Set(rollResult)].length;
	return Number(bet) * uniqSymbolsCountToKoeffMap[uniqSymbolsCount];
}

while(startSum > 0) {
	const rollRes = Array
		.from(Array(drums_count))
		.map(() => getRand(0, drum_symbol_count - 1));
	const winValue = getWinValueByRollResultAndBet(rollRes, bet)
	startSum = (startSum - bet + winValue);
	console.log(startSum, 'tst.js', 29)
}

