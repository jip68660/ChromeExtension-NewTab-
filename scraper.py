import urllib2
import bs4
import json

url = "http://kookbang.dema.mil.kr/newsWeb/main.do"
html = urllib2.urlopen(url)

bsObj = bs4.BeautifulSoup(html, 'html.parser')

mostViewed = bsObj.find('ul', attrs={"class": "most_view_list"})
lists = mostViewed.findAll('li')
num=1
linkData = {}
titleData = {}
for li in lists:
    linkData[num] = li.find('a')['href']
    titleData[num] = li.find('a').text
    num+=1
json_linkData = json.dumps(linkData)
json_titleData = json.dumps(titleData)

print(json_linkData)
print(json_titleData)

# http://kookbang.dema.mil.kr/newsWeb/20181231/3/BBSMSTR_000000010023/view.do
# vs.
# /newsWeb/view.do;JSESSIONID_kookbnagWEB=220TjuE5RyczNRlvNlMzBNjX-fv3sdf-Qqxzr9ZuFRFuVVcuwD-u!-1988712841?ntt_writ_date=20181231
# &parent_no=3&bbs_id=BBSMSTR_000000010023
# 
# need to take writ_date, parent_no, and bbs_id