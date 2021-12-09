---
title: API RD difference
author: Tao Sun
date: 2021-12-09 14:16:00 +0800
category: wind
layout: post
---

## est 一致预期数据
    
    wind API中的一致预期数据 和 RD中AShareEarningEst的数据格式 并不相符

    需要有代码做转换， 并且转换后数据并不完全等价

### API
    一致预期数据需要使用 wset 进行下载

**参数列表**

| 参数名称 | 参数值 |
| -- | -- |
| startdate | 20xx-xx-xx |
| endtdate | 20xx-xx-xx |
| windcode | xxxxxx.SH(SZ) |
| organization | 全部 |

**输出字段**
| 中文名称 | 英文名称 |
| -- | -- |
| 预测日期 | date |
| 研究机构 | organization |
| <font color=red>研究员</font> | researcher |
| 评级 | rating |
| 目标价 | target_price |
| 每股收益a0 | epsa0 |
| 每股收益e1 | epse1 |
| 每股收益e2 | epse2 |
| 每股收益e3 | epse3 |
| 营业总收入a0 | incomea0 |
| 营业总收入e1 | incomee1 |
| 营业总收入e2 | incomee2 |
| 营业总收入e3 | incomee3 |
| 净利润a0 | netprofita0 |
| 净利润e1 | netprofite1 |
| 净利润e2 | netprofite2 |
| 净利润e3 | netprofite3 |
| 市盈率a0 | pea0 |
| 市盈率e1 | pee1 |
| 市盈率e2 | pee2 |
| 市盈率e3 | pee3 |
| 净资产收益率a0 | roea0 |
| 净资产收益率e1 | roee1 |
| 净资产收益率e2 | roee2 |
| 净资产收益率e3 | roee3 |
| 最新年报年度 | _year |

Sample code:
```python
err, df = wind.wset('stockwest',f"startdate={start:%Y-%m-%d};enddate=       {end:%Y-%m-%d};windcode={stock};orgname=全部;\
field=date,organization,researcher,epse1,epse2,epse3,netprofite1,netprofite2,netprofite3", usedfdt=True)
```

### RD

**匹配字段名**

| 字段名 | 对应API 字段 |
| -- | -- |
| EST_DT | date |
| RESEARCH_INST_NAME | organization |
| <font color=red>ANALYST_NAME</font> | researcher |
| REPORTING_PERIOD | *e[123] |

**多出字段**
| 字段名 | 字段名介绍 |
| -- | -- |
| EST_MAIN_BUS_INCE | 预测主营业务收入 |
.....

#### **转换规则**
    在WIND API中的 epse[123] 数据 在RD中由"eps"部分和report_period列共同构建。

    即 假设是2020年的数据， 在API中 一行 三列的数据epse1, epse2 ,epse3

    会由 RD 中三行两列数据 数据 report_period: 2020 +1, 2020 +2 , 2020 +3 以及 eps ： val1, val2, val3 代替。

## 转换代码
Sample
```python
def reshape_wsetest(raw_df):
    '''
    将wset 获取到的dataframe 转换成 RD 中 ashareearningest的格式
    '''
    df = raw_df.copy()
    df['eps'] = df[['epse1','epse2','epse3']].values.tolist()
    df['netprofit'] = df[['netprofite1','netprofite2','netprofite3']].values.tolist()
    df['report_period'] = df.date.apply(lambda d:pd.date_range(start=d,freq='Y',periods=3).to_list())
    df = df.drop(['epse1','epse2','epse3','netprofite1','netprofite2','netprofite3'], axis=1)
    list_of_cols_to_expand = ['eps','netprofit','report_period']
    outputdf_expandedcols=pd.DataFrame({
        col:df.apply(lambda x: pd.Series(x[col]),axis=1).stack(dropna=False).reset_index(level=1, drop=True) for col in list_of_cols_to_expand
    })
    outputdf = df[['date','organization','researcher']].join(outputdf_expandedcols,how="right")

    return outputdf
```