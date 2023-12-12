### [알엠소프트] coding test - upnote clone site

## Getting Started

### Installation

```bash
$ git@github.com:W0N-H0/upnote-clone.git
$ cd upnote-clone
```

### Installing Dependencies and Run

```bash
$ npm istall
$ npm run dev
```

## 개발환경

- 언어 : `TypeScript`, `React`
- 프레임워크: `Next.js 14`
- 라이브러리: `lexical`, `react-icons`, `zustand`
- 스타일: `tailwindCSS`

## Deploy

- vercel : [배포 링크](https://upnote-clone-lilac.vercel.app)

## Feature List

- [x] 최소 가로 길이는 '1400px' 이고, 최대 가로 길이는 '1920px' 입니다.

- [x] 최초의 화면에서 NOTEBOOKS는 하나도 없는 상태이어야 합니다.

- [x] 백엔드를 구현하지 않습니다. 모두 프론트 단에서만 처리될수 있어야 합니다. (그러므로 데이터는 LocalStorage에 저장하여 구현합니다.)

- [x] NOTEBOOKS의 목록을 확인 할 수 있어야합니다.

- [x] NOTEBOOKS를 추가하거나 삭제 할 수 있어야 합니다.

- [x] NOTEBOOKS에 메모를 추가하거나 삭제 할 수 있어야 합니다.

- [x] NOTEBOOKS 안에 NOTEBOOKS를 추가 할 수 없습니다.

- [x] NOTEBOOKS를 선택하여 해당 NOTEBOOKS에 있는 메모 목록을 확인 할 수 있어야 합니다.

- [x] 메모 목록에서 메모를 선택하여 메모 내용을 확인하고 수정 할 수 있어야 합니다.

- [x] 텍스트 편집기는 ‘lexical text editor’를 이용하여 구현되어야 합니다.

- [x] 텍스트 편집 영역의 위, 아래 버튼은 구현하지 않습니다.

- [x] 텍스트 입력 후 즉시 혹은 일정 시간 후에 입력 사항이 저장 되어야 합니다.

- [x] 메모 목록에서 메모 내용의 첫번째 줄이 메모의 제목으로 표시 되어야 합니다.

- [x] 메모의 제목이 메모 목록의 가로 길이를 넘어가는 경우, 말줄임표(...) 처리되어야 합니다.

## Advanced Feature List

- [x] NOTES 목록 페이지 구현 (NOTEBOOKS에 속하지 않는 NOTE CRUD가능)
- [x] NOTES 데이터와 NOTEBOOKS 데이터를 연동하여 CRUD 구현
- notes와 notebooks Local Storage 데이터 예시
  ```json
  "notes": [{"id":2,"title":"일반 노트","body":" 어떤 노트북에도 속하지 않는 노트입니다. ","content":"{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"일반 노트\",\"type\":\"text\",\"version\":1},{\"type\":\"linebreak\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"어떤 노트북에도 속하지 않는 노트입니다.\",\"type\":\"text\",\"version\":1},{\"type\":\"linebreak\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}","createdAt":"2023-12-12T17:21:02.718Z","notebook":1},{"id":1,"title":"1번 노트북","body":" 1번 노트북의 노트입니다. ","content":"{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"1번 노트북\",\"type\":\"text\",\"version\":1},{\"type\":\"linebreak\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"1번 노트북의 노트입니다.\",\"type\":\"text\",\"version\":1},{\"type\":\"linebreak\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}","createdAt":"2023-12-12T17:20:48.189Z","notebook":1}]
  ```
  ```json
  "notebooks": [{"id":1,"name":"1번 노트북","imageIndex":0,"notes":[{"id":1,"title":"1번 노트북","body":" 1번 노트북의 노트입니다. ","content":"{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"1번 노트북\",\"type\":\"text\",\"version\":1},{\"type\":\"linebreak\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"1번 노트북의 노트입니다.\",\"type\":\"text\",\"version\":1},{\"type\":\"linebreak\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}","createdAt":"2023-12-12T17:20:48.189Z","notebook":1}]}]
  ```
