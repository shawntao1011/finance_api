---
title: Akshare instruction
author: Tao Sun
date: 2021-12-07 13:54:00 +0800
category: Instruction
layout: post
---

## 怎么使用akshare

1. 安装相关库

   akshare 的安装过程相对简单很多

   ```python
   pip install akshare
   ```

2. 在官方文库搜索相关的文档和函数

   以 基金持仓为例：

   ```python
   import akshare as ak
   fund_portfolio_hold_em_df = ak.fund_portfolio_hold_em(code="000001", year="2020")
   ```

   ![image-20211207141706565](..\assets\images\image-20211207141706565.png)

## 数据比对

### 基金持仓数据比对

|          | Wind                                         | Akshare                     |
| -------- | -------------------------------------------- | --------------------------- |
| 调用方法 | w.wset()                                     | ak.fund_portfolio_hold_em() |
| 对应字段 | + 占股票投资市值百分比<br />+ 持股占流通股比 |                             |
| 一致性   | 数据基本一致，有小数点差异                   |                             |



