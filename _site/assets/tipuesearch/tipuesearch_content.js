var tipuesearch = {"pages": [{
    "title": "How to use qpython",
    "text": "QPython 使用 文档地址: https://qpython.readthedocs.io/en/latest/index.html 使用样例: q端： q [filepath] -p [port] python端： from qpython import qconnection q = qconnection.QConnection(host = [host], port = [port]) try: q.open() temp = q('{[x;y] select wind_code,date,ret from stock_daily where date within (x;y)}', x,y, pandas=True) finally: q.close() or recommended: with qconnection.QConnection(host = [host], port = [port]) as q: temp = q('{[x;y] select wind_code,date,ret from stock_daily where date within (x;y)}', x,y, pandas=True)",
    "tags": "qpython",
    "url": "/python-q/qpython/2021-12-06-how-qpython.html"
  },{
    "title": "Why qpython",
    "text": "为什么使用 qpython 1.更快     相比于使用 pyodbc来实现python对tdb数据的访问，使用qpython更加迅速。 2.支持嵌入q语句     在实际运行中，需要在python端实现调用q脚本等操作，qpython支持q语言嵌入。 3.版本支持完善     q的免费版本为32bit，而实际使用过程中，多使用64位的python，相较于其他python和q交互需要额外配置，qpython直接通过: pip install qpython 4.多支持     实际使用中，会有 q端下载数据后, 在python端计算的场景 python端下载python api数据，在python端计算的场景 python端处理所有数据，在q端计算的场景 为了满足以上需求，qpython提供了 Qconnection方法，以便两端传递数据.",
    "tags": "qpython",
    "url": "/python-q/qpython/2021-12-06-why-qpython.html"
  },{
    "title": "",
    "text": "404 Page not found :( The requested page could not be found.",
    "tags": "",
    "url": "/python-q/404.html"
  }]};
