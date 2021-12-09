var tipuesearch = {"pages": [{
    "title": "API RD difference",
    "text": "est 一致预期数据 wind API中的一致预期数据 和 RD中AShareEarningEst的数据格式 并不相符 需要有代码做转换， 并且转换后数据并不完全等价 API 一致预期数据需要使用 wset 进行下载 参数列表 参数名称 参数值 startdate 20xx-xx-xx endtdate 20xx-xx-xx windcode xxxxxx.SH(SZ) organization 全部 输出字段 | 中文名称 | 英文名称 | | – | – | | 预测日期 | date | | 研究机构 | organization | | 研究员 | researcher | | 评级 | rating | | 目标价 | target_price | | 每股收益a0 | epsa0 | | 每股收益e1 | epse1 | | 每股收益e2 | epse2 | | 每股收益e3 | epse3 | | 营业总收入a0 | incomea0 | | 营业总收入e1 | incomee1 | | 营业总收入e2 | incomee2 | | 营业总收入e3 | incomee3 | | 净利润a0 | netprofita0 | | 净利润e1 | netprofite1 | | 净利润e2 | netprofite2 | | 净利润e3 | netprofite3 | | 市盈率a0 | pea0 | | 市盈率e1 | pee1 | | 市盈率e2 | pee2 | | 市盈率e3 | pee3 | | 净资产收益率a0 | roea0 | | 净资产收益率e1 | roee1 | | 净资产收益率e2 | roee2 | | 净资产收益率e3 | roee3 | | 最新年报年度 | _year | Sample code: err, df = wind.wset('stockwest',f\"startdate={start:%Y-%m-%d};enddate= {end:%Y-%m-%d};windcode={stock};orgname=全部;\\ field=date,organization,researcher,epse1,epse2,epse3,netprofite1,netprofite2,netprofite3\", usedfdt=True) RD 匹配字段名 字段名 对应API 字段 EST_DT date RESEARCH_INST_NAME organization ANALYST_NAME researcher REPORTING_PERIOD *e[123] 多出字段 | 字段名 | 字段名介绍 | | – | – | | EST_MAIN_BUS_INCE | 预测主营业务收入 | ….. 转换规则 在WIND API中的 epse[123] 数据 在RD中由\"eps\"部分和report_period列共同构建。 即 假设是2020年的数据， 在API中 一行 三列的数据epse1, epse2 ,epse3 会由 RD 中三行两列数据 数据 report_period: 2020 +1, 2020 +2 , 2020 +3 以及 eps ： val1, val2, val3 代替。 转换代码 Sample def reshape_wsetest(raw_df): ''' 将wset 获取到的dataframe 转换成 RD 中 ashareearningest的格式 ''' df = raw_df.copy() df['eps'] = df[['epse1','epse2','epse3']].values.tolist() df['netprofit'] = df[['netprofite1','netprofite2','netprofite3']].values.tolist() df['report_period'] = df.date.apply(lambda d:pd.date_range(start=d,freq='Y',periods=3).to_list()) df = df.drop(['epse1','epse2','epse3','netprofite1','netprofite2','netprofite3'], axis=1) list_of_cols_to_expand = ['eps','netprofit','report_period'] outputdf_expandedcols=pd.DataFrame({ col:df.apply(lambda x: pd.Series(x[col]),axis=1).stack(dropna=False).reset_index(level=1, drop=True) for col in list_of_cols_to_expand }) outputdf = df[['date','organization','researcher']].join(outputdf_expandedcols,how=\"right\") return outputdf",
    "tags": "wind",
    "url": "/finance_api/wind/2021-12-09-est_API_RD_convert.html"
  },{
    "title": "Akshare instruction",
    "text": "怎么使用akshare 安装相关库 akshare 的安装过程相对简单很多 pip install akshare 在官方文库搜索相关的文档和函数 以 基金持仓为例： import akshare as ak fund_portfolio_hold_em_df = ak.fund_portfolio_hold_em(code=\"000001\", year=\"2020\") 数据比对 基金持仓数据比对   Wind Akshare 调用方法 w.wset() ak.fund_portfolio_hold_em() 对应字段 + 占股票投资市值百分比+ 持股占流通股比   一致性 数据基本一致，有小数点差异  ",
    "tags": "Instruction",
    "url": "/finance_api/instruction/2021-12-07-how-akshare.html"
  },{
    "title": "Wind Instruction",
    "text": "如何使用wind API 修复插件 点击wind终端 左上角”我的” –&gt; “插件修复” –&gt; “修复python接口” 调用wind.start() from WindPy import w as wind wd = wind.start() assert 0 == wd.ErrorCode,\\ f\"WindQuantAPI login error {wd.ErrorCode}: {wd.iloc[0][0]}\" 调用wind相关函数 根据Wind CG(code generator) 生成相关函数的format，再自定义parse相关参数。 eg: 假设需要获取某个基金(000001.OF)的日收益率数据， WIND CG中的代码示例则如下: w.wsd(\"000001.OF\", \"NAV_adj_return1\", \"2021-11-07\", \"2021-12-06\", \"\") 那么实际的python 代码为 w.wsd(\"000001.OF\", \"NAV_adj_return1\", \"2021-11-07\", \"2021-12-06\", \"\", usedfdt=True) 其中，usedfdt 参数用于 确保返回是一个pd.Dataframe 且 空的时间字段会作为pd.NaT返回，而不是dt.datetime(1899,12,31) Wind 接口解读     wind 的数据接口主要限制在三个维度: Days Indicators WindCodes 在单次的query中，在以上三个维度至少需要一个维度为 1(1天，1个变量或一个股票)。",
    "tags": "Instruction",
    "url": "/finance_api/instruction/2021-12-07-how-wind.html"
  },{
    "title": "",
    "text": "404 Page not found :( The requested page could not be found.",
    "tags": "",
    "url": "/finance_api/404.html"
  }]};
