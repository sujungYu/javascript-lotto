const MissionUtils = require('@woowacourse/mission-utils');
class compareLotto {
  #grade;
  #count;

  constructor() {
    this.#count = [0, 0, 0, 0, 0];
    this.#grade = [
      { win: 3, prize: '5,000', isBonus: false, count: 0 },
      { win: 4, prize: '50,000', isBonus: false, count: 0 },
      { win: 5, prize: '1,500,000', isBonus: false, count: 0 },
      { win: 5, prize: '30,000,000', isBonus: true, count: 0 },
      { win: 6, prize: '2,000,000,000', isBonus: false, count: 0 },
    ];
  }

  matchWinning(lottoSet, winning, bonus) {
    lottoSet.forEach((lotto) => {
      let matchWin = lotto.filter((number) => winning.includes(number));
      if (matchWin.length === 5 && lotto.includes(bonus)) this.#count[3] += 1;
      else if (matchWin.length === 3) this.#count[0] += 1;
      else if (matchWin.length === 4) this.#count[1] += 1;
      else if (matchWin.length === 5) this.#count[2] += 1;
      else if (matchWin.length === 6) this.#count[4] += 1;
    });
  }

  matchResult() {
    MissionUtils.Console.print('당첨 통계');
    MissionUtils.Console.print('---');

    this.#grade.forEach((grade, index) => {
      const { win, prize, isBonus } = grade;
      MissionUtils.Console.print(
        `${win}개 일치${isBonus ? ', 보너스 볼 일치' : ''} (${prize}원) - ${this.#count[index]}개`,
      );
      grade['count'] = this.#count[index];
    });
  }

  totalProfit(money) {
    let total = 0;
    this.#grade.forEach((grade) => {
      const { prize, count } = grade;
      total += prize.replace(/\D/g, '') * count;
    });
    const profit = ((total / money) * 100).toFixed(1);
    MissionUtils.Console.print(`총 수익률은 ${profit}%입니다.`);
  }

  play(lottoSet, money, winning, bonus) {
    this.matchWinning(lottoSet, winning, bonus);
    this.matchResult();
    this.totalProfit(money);
  }
}

module.exports = compareLotto;
