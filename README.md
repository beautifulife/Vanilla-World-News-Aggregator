# Vanilla-World-News-Aggregator

News api로 부터 세계 뉴스를 검색할 수 있는 어플리케이션을 만드는 과제

![vanilla-world-news-aggregator](code-news.gif)


## Setup

Install dependencies

```sh
$ yarn install (or npm install)
```

## Development

```sh
$ yarn start (or npm start)
# visit http://localhost:3000
```

- CommandLog.js 에 News API추가 필요


## Features

- 사용자가 terminal에 검색어 입력
- 사용자가 검색을 원하는 기간을 설정 가능(ex. 2018년 2월 1일 - 2018년 2월 5일 뉴스 검색)
- 검색을 원하는 소스를 선택 가능 (다중 선택 가능, 최대 20개)
  - 검색 소스는 [News API Source](https://newsapi.org/docs/endpoints/sources)를 이용
  - 검색 결과는 [News API Everything](https://newsapi.org/docs/endpoints/everything)을 이용
- 검색 결과가 로딩 중인 상태에서는 로더 호출
- 검색결과 인기순 최신순 정렬 가능
- 무한스크롤 구현
- 리스트, 카드 형식 View
- "리스트" 형식 컨텐츠
  - 검색 소스 이름
  - 뉴스 작성자
  - 뉴스 제목
  - 뉴스 작성일
- "카드" 형식 컨텐츠
  - 뉴스 이미지
  - 뉴스 작성자
  - 뉴스 제목
- 각 검색 결과를 클릭할 경우, Modal을 이용하여 상세 제공
  - 검색 소스 이름
  - 뉴스 작성자
  - 뉴스 제목
  - 뉴스 작성일
  - 뉴스 설명
  - 뉴스 내용
  - 뉴스 이미지
  - 뉴스 링크
