// @ts-ignore

import React from 'react';
import { Table, Avatar } from '@douyinfe/semi-ui';
import { IconMore } from '@douyinfe/semi-icons';
import '@douyinfe/semi-ui/dist/css/semi.min.css';
function createData(
  key: string,
  value: any,
) {
  return {key, value};
}
function Markdow({res} ) {
 //alert(JSON.stringify(res))
  const columns = [
    {
      title: '指标',
      dataIndex: 'name',
      width: 400,
      render: (text, record, index) => {
        return (
          <div>
            <Avatar
              size="small"
              shape="square"
              src={record.nameIconSrc}
              style={{ marginRight: 12 }}
            ></Avatar>
            {text}
          </div>
        );
      },
    },
    {
      title: '值',
      dataIndex: 'size',
    }
  ];

  const data=res.report
  const ts=res.stats
  // const {startTime} = data;
  // // const totalProfitsPercentage = (stats.totalProfits / stats.investment) * 100;
  // // const gridProfitsPercentage = (stats.gridProfits / stats.investment) * 100;
  // // const gridAprPercentage = (stats.gridProfits / 5) * 365;
  //
  // const now = Date.now();
  // const durationMilliseconds = now - Date.parse(startTime.toString());
  // const seconds = durationMilliseconds / 1000;
  // @ts-ignore
  const rows = [
    createData("交易数量",data.numTrades),
    createData("买入量",data.buyVolume),
    createData("卖出量",data.sellVolume),
    createData("未实现赢利",data.unrealizedProfit),
    createData("净利润（Net Profit）",data.netProfit),
    createData("毛利润（Gross Profit",data.grossProfit),
    createData("毛亏损（Gross Loss",data.grossLoss),
    createData("最大交易亏损 (Max Drawdown)",data.profit),
    createData("买入和持有收益 (Buy & Hold Return)",data.profit),
    createData("夏普比率 (Sharpe Ratio)",data.profit),
    createData("索提诺比率(Sortino Ratio)",data.profit),
    createData("盈利因子(Profit Factor)",data.profit),
    createData("最大持仓 (Max Contracts Held)",data.profit),
    createData("佣金 (Commission Paid)",data.feeInUSD),
    createData("所有已平仓交易 (Total Closed Trades)",data.profit),
    createData("总持仓 (Total Open Trades)",data.profit),
    createData("获利交易次数 (Number Winning Trades)",ts.numOfLossTrade),
    createData("亏损交易次数 (Number Losing Trades)",ts.numOfProfitTrade),
    createData("胜率 (Percent Profitable)",ts.winningRatio),
    createData("平均交易 (Avg Trade)",data.profit),
    createData("平均盈利交易 (Avg Win Trade)",ts.averageProfitTrade),
    createData("平均亏损交易(Avg Loss Trade)",ts.averageLossTrade),
    createData("平均盈利/平均亏损 (Ratio Avg Win / Avg Loss)",ts.averageProfitTrade),
    createData("最大盈利交易 (Largest Win Trade)",ts.largestProfitTrade),
    createData("最大亏损交易 (Largest Losing Trade)",ts.largestLossTrade),
    createData("全部交易的平均持仓K线根数 (Avg # Bars in Trades)",data.profit),
    createData("盈利交易的平均持仓K线根数 (Avg # Bars in Winning Trades)",data.profit),
    createData("亏损交易的平均持仓K线根数 (Avg # Bars in Losing Trades)",data.profit),
    createData("全部交易的平均持仓K线根数 (Avg # Bars in Trades)",data.profit),

    createData("最大连续赢利 次数  ",ts.maximumConsecutiveWins),
    createData("最大连续亏损 次数",ts.maximumConsecutiveLosses),
    createData("最大连续利润  ",ts.maximumConsecutiveProfit),
    createData("最大连续亏损  ",ts.maximumConsecutiveLoss),

  ];

  const dt=[]
  rows.map((row) => {
    dt.push({
      name:row.key,
      size:row.value
    })
  })

  // const data1 = [
  //   {
  //     key: '1',
  //     name: 'Semi Design 设计稿.fig',
  //     nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png',
  //     size: '2M',
  //     owner: '姜鹏志',
  //     updateTime: '2020-02-02 05:13',
  //     avatarBg: 'grey',
  //   },
  //
  // ];

  const handleRow = (record, index) => {
    // 给偶数行设置斑马纹
    if (index % 2 === 0) {
      return {
        style: {
          background: 'var(--semi-color-fill-0)',
        },
      };
    } else {
      return {};
    }
  };

  return <Table columns={columns} dataSource={dt} onRow={handleRow} pagination={false} />;
}

export default Markdow
